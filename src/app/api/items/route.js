export async function POST(request) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const { receiver, sender, futureItems } = await request.json();
    
    const boxUuid = uuidv4();
    
    const futureMovieType = futureItems.find(item => item.id === 'future_movie_ticket')?.type || 1;
    const futureGifticonType = futureItems.find(item => item.id === 'future_gifticon')?.type || 1;
    const futureInventionType = futureItems.find(item => item.id === 'future_invention')?.type || 1;

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
    
    for (const futureItem of futureItems) {
      switch (futureItem.id) {
        case 'future_note':
          await sql`
            INSERT INTO future_note (box_id, message)
            VALUES (${futureBoxId}, ${futureItem.message})
          `;
          break;
          
        case 'future_lotto':
          await sql`
            INSERT INTO future_lotto (box_id, numbers)
            VALUES (${futureBoxId}, ${futureItem.numbers})
          `;
          break;
          
        case 'future_hologram':
          await sql`
            INSERT INTO future_hologram (box_id, message, image_url)
            VALUES (${futureBoxId}, ${futureItem.message}, ${futureItem.image_url})
          `;
          break;
          
        case 'future_face_mirror':
          await sql`
            INSERT INTO future_face_mirror (box_id, year, image_url)
            VALUES (${futureBoxId}, ${futureItem.year || 2047}, ${futureItem.image_url})
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