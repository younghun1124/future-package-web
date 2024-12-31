import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { v4 as uuidv4 } from 'uuid';
import { uploadToGCS } from '@/utils/uploadImage';

export async function POST(request) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const { receiver, sender, futureItems } = await request.json();
    
    const boxUuid = uuidv4();
    
    // 이미지 업로드가 필요한 아이템들을 먼저 처리
    const processedItems = await Promise.all(
      futureItems.map(async (item) => {
        if (item.type === 'FutureHologram' && item.content.imageUrl) {
          // 이미 GCS URL이므로 추가 처리 없이 그대로 반환
          return item;
        }
        
        if (item.type === 'FutureFaceMirror' && item.content.svgImage) {
          const svgBuffer = Buffer.from(item.content.svgImage);
          const imageObject = {
            name: `mirror-${Date.now()}.svg`,
            type: 'image/svg+xml',
            buffer: svgBuffer
          };
          
          const imageUrl = await uploadToGCS(imageObject, 'mirrors');
          return { ...item, content: { ...item.content, imageUrl } };
        }
        
        return item;
      })
    );

    const futureMovieType = processedItems.find(item => item.type === 'FutureMovieTicket')?.content?.type?.id || 1;
    const futureGifticonType = processedItems.find(item => item.type === 'FutureGifticon')?.content?.type?.id || 1;
    const futureInventionType = processedItems.find(item => item.type === 'FutureInvention')?.content?.type?.id || 1;

    const [futureBoxResult] = await sql`
      INSERT INTO future_box (
        uuid, receiver, sender, 
        future_movie_type, future_gifticon_type, future_invention_type
      )
      VALUES (
        ${boxUuid}, ${receiver}, ${sender},
        ${futureMovieType}, ${futureGifticonType}, ${futureInventionType}
      )
      RETURNING id
    `;
    
    const futureBoxId = futureBoxResult.id;
    
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
          await sql`
            INSERT INTO future_hologram (box_id, image_url)
            VALUES (${futureBoxId}, ${item.content.imageUrl})
          `;
          break;
          
        case 'FutureFaceMirror':
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
          'Content-Type': 'application/json',
        },
      }
    );
    
  } catch (error) {
    console.error('Error saving FutureBox:', error);
    return new Response(
      JSON.stringify({ error: 'FutureBox 저장 중 오류가 발생했습니다.' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}