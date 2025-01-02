import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { 
    FUTURE_MOVIE_TYPES,
    FUTURE_GIFTICON_TYPES,
    FUTURE_INVENTION_TYPES 
} from '@/constants/futureItems';

export async function GET(request, { params }) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const uuid = params.uuid;

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
      sql`SELECT * FROM future_note WHERE box_id = ${futureBox.id}`,
      sql`SELECT * FROM future_lotto WHERE box_id = ${futureBox.id}`,
      sql`SELECT * FROM future_hologram WHERE box_id = ${futureBox.id}`,
      sql`SELECT * FROM future_face_mirror WHERE box_id = ${futureBox.id}`
    ]);

    // 기본 아이템 변환
    const futureItems = [
      ...futureNotes.map(note => ({
        id: `note_${note.id}`,
        type: 'FutureNote',
        name: '쪽지',
        icon: '/futurenote_icon.svg',
        content: { message: note.message }
      })),
      ...futureLottos.map(lotto => ({
        id: `lotto_${lotto.id}`,
        type: 'FutureLotto',
        name: '로또',
        icon: '/futurelotto_icon.svg',
        content: { numbers: lotto.numbers }
      })),
      ...futureHolograms.map(hologram => ({
        id: `hologram_${hologram.id}`,
        type: 'FutureHologram',
        name: '홀로그램',
        icon: '/futurehologram_icon.svg',
        content: { imageUrl: hologram.image_url }
      })),
      ...futureFaceMirrors.map(mirror => ({
        id: `mirror_${mirror.id}`,
        type: 'FutureFaceMirror',
        name: '미래얼굴',
        icon: '/futurefacemirror_icon.svg',
        content: { 
          year: mirror.year,
          imageUrl: mirror.image_url 
        }
      }))
    ];

    // 영화, 기프티콘, 발명품 추가
    if (futureBox.future_movie_type) {
      const movieData = Object.values(FUTURE_MOVIE_TYPES).find(movie => movie.id === futureBox.future_movie_type);
      if (movieData) {
        futureItems.push({
          id: `movie_${movieData.id}`,
          type: 'FutureMovieTicket',
          name: '영화 티켓',
          icon: '/futuremovieticket_icon.svg',
          content: movieData
        });
      }
    }

    if (futureBox.future_gifticon_type) {
      const gifticonData = Object.values(FUTURE_GIFTICON_TYPES).find(gifticon => gifticon.id === futureBox.future_gifticon_type);
      if (gifticonData) {
        futureItems.push({
          id: `gifticon_${gifticonData.id}`,
          type: 'FutureGifticon',
          name: '기프티콘',
          icon: '/futuregifticon_icon.svg',
          content: gifticonData
        });
      }
    }

    if (futureBox.future_invention_type) {
      const inventionData = Object.values(FUTURE_INVENTION_TYPES).find(invention => invention.id === futureBox.future_invention_type);
      if (inventionData) {
        futureItems.push({
          id: `invention_${inventionData.id}`,
          type: 'FutureInvention',
          name: '미래 발명품',
          icon: '/futureinvention_icon.svg',
          content: inventionData
        });
      }
    }

    const response = {
      uuid: futureBox.uuid,
      receiver: futureBox.receiver,
      sender: futureBox.sender,
      createdAt: futureBox.created_at,
      futureItems
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

export async function PATCH(request, { params }) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const uuid = params.uuid;

    const [updatedBox] = await sql`
      UPDATE future_box 
      SET is_opened = true 
      WHERE uuid = ${uuid}
      RETURNING *
    `;

    if (!updatedBox) {
      return NextResponse.json(
        { error: '존재하지 않는 FutureBox입니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error updating FutureBox:', error);
    return NextResponse.json(
      { error: 'FutureBox 업데이트 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}