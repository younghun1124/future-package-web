// src/app/api/items/[uuid]/route.js
import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET(request) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const uuid = request.url.split('/').pop();

    const [futureBox] = await sql`
      UPDATE future_box 
      SET is_opened = true 
      WHERE uuid = ${uuid}
      RETURNING *
    `;

    if (!futureBox) {
      return NextResponse.json(
        { error: '존재하지 않는 FutureBox입니다.' },
        { status: 404 }
      );
    }

    const [futureNotes, futureLottos, futureHolograms, futureFaceMirrors] = await Promise.all([
      sql`SELECT * FROM future_note WHERE box_id = ${futureBox.id}`,
      sql`SELECT * FROM future_lotto WHERE box_id = ${futureBox.id}`,
      sql`SELECT * FROM future_hologram WHERE box_id = ${futureBox.id}`,
      sql`SELECT * FROM future_face_mirror WHERE box_id = ${futureBox.id}`
    ]);

    const response = {
      box: {
        uuid: futureBox.uuid,
        receiver: futureBox.receiver,
        sender: futureBox.sender,
        futureMovieType: futureBox.future_movie_type,
        futureGifticonType: futureBox.future_gifticon_type,
        futureInventionType: futureBox.future_invention_type,
        createdAt: futureBox.created_at
      },
      items: {
        futureNotes: futureNotes.map(note => ({
          id: note.id,
          message: note.message
        })),
        futureLottos: futureLottos.map(lotto => ({
          id: lotto.id,
          numbers: lotto.numbers
        })),
        futureHolograms: futureHolograms.map(hologram => ({
          id: hologram.id,
          imageUrl: hologram.image_url
        })),
        futureFaceMirrors: futureFaceMirrors.map(mirror => ({
          id: mirror.id,
          year: mirror.year,
          imageUrl: mirror.image_url
        }))
      }
    };

    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Error fetching FutureBox:', error);
    return NextResponse.json(
      { error: 'FutureBox 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}