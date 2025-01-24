import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { v4 as uuidv4 } from 'uuid';
import { uploadToGCS } from '@/utils/uploadImage';
import { FUTURE_GIFTICON_TYPES } from '@/constants/futureItems';

export async function POST(request) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    
    // 시간대 설정
    await sql`SET timezone = 'Asia/Seoul'`;

    const { receiver, sender, futureItems, futureGifticonType, futureValueMeterIncluded } = await request.json();
    
    // IP, UA 가져오기
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0] : '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || '';

    const boxUuid = uuidv4();

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
    for (const item of futureItems) {
      switch (item.type) {
        case 'FutureNote':
          await sql`
            INSERT INTO future_note (box_id, message, encrypted_message)
            VALUES (${futureBoxId}, ${item.content.message}, ${item.content.encryptedMessage})
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
            INSERT INTO future_tarot (box_id, card_indexes, description)
            VALUES (${futureBoxId}, ${item.content.cardIndexes}, ${item.content.description})
          `;
          break;
        case 'FuturePerfume':
          await sql`
            INSERT INTO future_perfume (
              box_id, name, description, keywords, 
              shape_type, color, outline_type
            )
            VALUES (
              ${futureBoxId}, ${item.content.name}, ${item.content.description}, 
              ${item.content.keywords}, ${item.content.shape}, ${item.content.color},
              ${item.content.outline_type}
            )
          `;
          break;
      }
    }

    return NextResponse.json({ 
      success: true, 
      uuid: boxUuid 
    });
    
  } catch (error) {
    console.error('Error saving FutureBox:', error);
    return NextResponse.json(
      { error: 'FutureBox 저장 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 