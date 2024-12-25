import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const { receiver, sender, items } = await request.json();
    
    // UUID 생성
    const boxUuid = uuidv4();
    
    // future_box 테이블에 먼저 insert
    const [boxResult] = await sql`
      INSERT INTO future_box (uuid, receiver, sender)
      VALUES (${boxUuid}, ${receiver}, ${sender})
      RETURNING id
    `;
    
    const boxId = boxResult.id;
    
    // 아이템별로 테이블에 삽입.
    for (const item of items) {
      switch (item.id) {
        case 'movie':
          await sql`
            INSERT INTO future_movie_ticket (box_id, image_url)
            VALUES (${boxId}, ${`/images/tickets/${item.genre}.png`})
          `;
          break;
          
        case 'note':
          await sql`
            INSERT INTO future_note (box_id, message)
            VALUES (${boxId}, ${item.message})
          `;
          break;
          
        case 'lotto':
          const numbers = Array.from({length: 6}, () => 
            Math.floor(Math.random() * 45) + 1
          ).sort((a, b) => a - b);
          
          await sql`
            INSERT INTO future_lotto (box_id, numbers)
            VALUES (${boxId}, ${numbers})
          `;
          break;
          
        case 'invention':
          await sql`
            INSERT INTO future_invention (box_id, name, description, image_url)
            VALUES (
              ${boxId}, 
              ${item.name || '미래의 발명품'}, 
              ${item.description || ''},
              ${`/images/inventions/default.png`}
            )
          `;
          break;
          
        case 'hologram':
          await sql`
            INSERT INTO future_hologram (box_id, message)
            VALUES (${boxId}, ${item.message})
          `;
          break;
      }
    }
    
    return NextResponse.json({ success: true, uuid: boxUuid });
    
  } catch (error) {
    console.error('Error saving items:', error);
    return NextResponse.json(
      { error: '아이템 저장 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 