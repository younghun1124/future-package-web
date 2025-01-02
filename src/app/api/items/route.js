// src/app/api/items/route.js
import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { v4 as uuidv4 } from 'uuid';
import { uploadToGCS } from '@/utils/uploadImage';

export async function POST(request) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    // 서울 시간대로 현재 시간 설정
    await sql`SET timezone = 'Asia/Seoul'`;

    const { receiver, sender, futureItems } = await request.json();
    
    // IP, UA 가져오기
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0] : '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || '';

    const boxUuid = uuidv4();

    // 이미지 업로드가 필요한 아이템 처리
    const processedItems = await Promise.all(
      futureItems.map(async (item) => {
        // 홀로그램 (이미 gcs url이면 그대로 둔다고 했으나,
        // 이제는 private 버킷이므로, 어차피 이 로직에선 filePath만 DB에 저장)
        if (item.type === 'FutureHologram' && item.content.imageUrl) {
          // 만약 기존에 외부 이미지가 들어온다면 직접 업로드해야 하지만,
          // 이미 GCS URL이라고 가정하면 filePath를 추출해서 저장하도록 수정
          // (만약 이미 GCS에 있고 private이라면 DB엔 uploads/xxxx 형태로만 저장)
          return item;
        }

        // 미래얼굴
        if (item.type === 'FutureFaceMirror' && item.content.svgImage) {
          const svgBuffer = Buffer.from(item.content.svgImage);
          const imageObject = {
            name: `mirror-${Date.now()}.svg`,
            type: 'image/svg+xml',
            buffer: svgBuffer
          };
          
          const filePath = await uploadToGCS(imageObject, 'mirrors');
          return { ...item, content: { ...item.content, imageUrl: filePath } };
        }
        
        return item;
      })
    );

    // 영화, 기프티콘, 발명품 ID 추출
    const futureMovieType = processedItems.find(i => i.type === 'FutureMovieTicket')?.content?.id || null;
    const futureGifticonType = processedItems.find(i => i.type === 'FutureGifticon')?.content?.id || null;
    const futureInventionType = processedItems.find(i => i.type === 'FutureInvention')?.content?.id || null;

    // future_box 생성
    const [futureBoxResult] = await sql`
      INSERT INTO future_box (
        uuid, receiver, sender, 
        future_movie_type, future_gifticon_type, future_invention_type,
        created_at
      )
      VALUES (
        ${boxUuid}, ${receiver}, ${sender},
        ${futureMovieType}, ${futureGifticonType}, ${futureInventionType},
        CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Seoul'
      )
      RETURNING id
    `;
    const futureBoxId = futureBoxResult.id;
    
    // future_box_logs 기록
    await sql`
      INSERT INTO future_box_logs (
        box_id, ip_address, user_agent
      )
      VALUES (
        ${futureBoxId}, ${ipAddress}, ${userAgent}
      )
    `;

    // 각각의 아이템 DB에 기록
    for (const item of processedItems) {
      switch (item.type) {
        case 'FutureNote':
          await sql`
            INSERT INTO future_note (box_id, message)
            VALUES (${futureBoxId}, ${item.content.text})
          `;
          break;
        case 'FutureLotto':
          await sql`
            INSERT INTO future_lotto (box_id, numbers)
            VALUES (${futureBoxId}, ${item.content.numbers})
          `;
          break;
        case 'FutureHologram':
          // hologram.image_url 자리에 filePath(예: 'uploads/xxx.png')가 들어가야 함
          await sql`
            INSERT INTO future_hologram (box_id, image_url)
            VALUES (${futureBoxId}, ${item.content.imageUrl})
          `;
          break;
        case 'FutureFaceMirror':
          // mirror.image_url 자리에 filePath(예: 'mirrors/xxx.svg')
          await sql`
            INSERT INTO future_face_mirror (box_id, year, image_url)
            VALUES (${futureBoxId}, 2047, ${item.content.imageUrl})
          `;
          break;
      }
    }

    return new Response(
      JSON.stringify({ success: true, uuid: boxUuid }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
  } catch (error) {
    console.error('Error saving FutureBox:', error);
    return new Response(
      JSON.stringify({ error: 'FutureBox 저장 중 오류가 발생했습니다.' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
