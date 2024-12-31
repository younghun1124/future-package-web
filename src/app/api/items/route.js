import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const { receiver, sender, futureItems } = await request.json();
    
    const boxUuid = uuidv4();
    
    const futureMovieType = futureItems.find(item => item.type === 'FutureMovieTicket')?.content?.type?.id || 1;
    const futureGifticonType = futureItems.find(item => item.type === 'FutureGifticon')?.content?.type?.id || 1;
    const futureInventionType = futureItems.find(item => item.type === 'FutureInvention')?.content?.type?.id || 1;

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
    
    for (const item of futureItems) {
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
            VALUES (${futureBoxId}, 2047, ${item.content.svgImage})
          `;
          break;
      }
    }
    
    return NextResponse.json({ success: true, uuid: boxUuid });
    
  } catch (error) {
    console.error('Error saving FutureBox:', error);
    return NextResponse.json(
      { error: 'FutureBox 저장 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}