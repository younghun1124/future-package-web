import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const { uuid } = params;

    // future_box 조회
    const [box] = await sql`
      SELECT * FROM future_box 
      WHERE uuid = ${uuid}
    `;

    if (!box) {
      return NextResponse.json(
        { error: '존재하지 않는 선물입니다.' },
        { status: 404 }
      );
    }

    // 각 아이템 테이블에서 box_id로 조회. 근데 이럴꺼면 FutureBox 를 괜히 만들었나...
    const [movieTickets, notes, lottos, inventions, holograms] = await Promise.all([
      sql`
        SELECT * FROM future_movie_ticket 
        WHERE box_id = ${box.id}
        ORDER BY created_at DESC
      `,
      sql`
        SELECT * FROM future_note 
        WHERE box_id = ${box.id}
        ORDER BY created_at DESC
      `,
      sql`
        SELECT * FROM future_lotto 
        WHERE box_id = ${box.id}
        ORDER BY created_at DESC
      `,
      sql`
        SELECT * FROM future_invention 
        WHERE box_id = ${box.id}
        ORDER BY created_at DESC
      `,
      sql`
        SELECT * FROM future_hologram 
        WHERE box_id = ${box.id}
        ORDER BY created_at DESC
      `
    ]);

    const response = {
      box: {
        uuid: box.uuid,
        receiver: box.receiver,
        sender: box.sender,
        created_at: box.created_at
      },
      items: {
        movieTickets,
        notes,
        lottos,
        inventions,
        holograms
      }
    };

    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json(
      { error: 'FutureBox 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 