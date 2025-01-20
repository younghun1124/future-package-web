// src/app/api/items/route.js
import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { v4 as uuidv4 } from 'uuid';
import { uploadToGCS } from '@/utils/uploadImage';
import { FUTURE_GIFTICON_TYPES } from '@/constants/futureItems';

// 서버 시작 시 FutureGifticon 타입 캐싱
let cachedGifticonTypes = [];

const cacheGifticonTypes = async (sql) => {
  if (cachedGifticonTypes.length === 0) {
    const gifticonTypes = await sql`SELECT * FROM future_gifticon_type`;
    cachedGifticonTypes = gifticonTypes;
  }
  return cachedGifticonTypes;
};

export async function POST(request) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    
    // 시간대 설정
    await sql`SET timezone = 'Asia/Seoul'`;

    const { receiver, sender, futureItems, futureValueMeterIncluded } = await request.json();
    
    // IP, UA 가져오기
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0] : '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || '';

    const boxUuid = uuidv4();

    // FutureGifticon 타입 캐싱
    const gifticonTypes = await cacheGifticonTypes(sql);

    // 이미지 업로드가 필요한 아이템 처리
    const processedItems = await Promise.all(
      futureItems.map(async (item) => {
        if (item.type === 'FutureHologram' && item.content.imageUrl) {
          return item;
        }

        if (item.type === 'FutureFaceMirror' && item.content.svgImage) {
          const svgBuffer = Buffer.from(item.content.svgImage);
          const imageObject = {
            name: `mirror-${Date.now()}.svg`,
            type: 'image/svg+xml',
            buffer: svgBuffer
          };
          
          const { filePath } = await uploadToGCS(imageObject, 'mirrors');
          return { ...item, content: { ...item.content, imageUrl: filePath } };
        }
        
        return item;
      })
    );

    // 영화 티켓을 기프티콘으로 통합
    const futureGifticonType = futureItems.find(i => i.type === 'FutureMovieTicket')?.content?.id || null;

    // FutureTarot과 FuturePerfume 처리
    const futureTarot = futureItems.find(i => i.type === 'FutureTarot')?.content || null;
    const futurePerfume = futureItems.find(i => i.type === 'FuturePerfume')?.content || null;

    // future_box 생성
    const [futureBoxResult] = await sql`
      INSERT INTO future_box (
        uuid, receiver, sender, 
        future_gifticon_type, future_value_meter_included,
        created_at
      )
      VALUES (
        ${boxUuid}, ${receiver}, ${sender},
        ${futureGifticonType}, ${futureValueMeterIncluded},
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
            VALUES (${futureBoxId}, ${item.content.message})
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
            VALUES (${futureBoxId}, ${item.content.year}, ${item.content.imageUrl})
          `;
          break;
        case 'FutureTarot':
          await sql`
            INSERT INTO future_tarot (box_id, indexes, description)
            VALUES (${futureBoxId}, ${item.content.cardIndexes}, ${item.content.description})
          `;
          break;
        case 'FuturePerfume':
          await sql`
            INSERT INTO future_perfume (box_id, name, description, keywords, shape_type, color)
            VALUES (${futureBoxId}, ${item.content.name}, ${item.content.description}, ${item.content.keywords}, ${item.content.shape}, ${item.content.color})
          `;
          break;
        case 'FutureGifticon':
          await sql`
            INSERT INTO future_gifticon (box_id, gifticon_type_id)
            VALUES (${futureBoxId}, ${item.content.id})
          `;
          break;
        default:
          // 알 수 없는 타입은 무시하거나 로깅
          console.warn(`알 수 없는 아이템 타입: ${item.type}`);
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
