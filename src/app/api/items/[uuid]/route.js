export async function GET(request, { params }) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const { uuid } = params;

    const [futureBox] = await sql`
      SELECT * FROM future_box 
      WHERE uuid = ${uuid}
    `;

    if (!futureBox) {
      return NextResponse.json(
        { error: '존재하지 않는 FutureBox입니다.' },
        { status: 404 }
      );
    }

    const [futureNotes, futureLottos, futureHolograms, futureFaceMirrors] = await Promise.all([
      sql`SELECT * FROM future_note WHERE box_id = ${futureBox.id} ORDER BY created_at DESC`,
      sql`SELECT * FROM future_lotto WHERE box_id = ${futureBox.id} ORDER BY created_at DESC`,
      sql`SELECT * FROM future_hologram WHERE box_id = ${futureBox.id} ORDER BY created_at DESC`,
      sql`SELECT * FROM future_face_mirror WHERE box_id = ${futureBox.id} ORDER BY created_at DESC`
    ]);

    const response = {
      future_box: {
        uuid: futureBox.uuid,
        receiver: futureBox.receiver,
        sender: futureBox.sender,
        future_movie_type: futureBox.future_movie_type,
        future_gifticon_type: futureBox.future_gifticon_type,
        future_invention_type: futureBox.future_invention_type,
        created_at: futureBox.created_at
      },
      future_items: {
        future_notes: futureNotes,
        future_lottos: futureLottos,
        future_holograms: futureHolograms,
        future_face_mirrors: futureFaceMirrors
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