// src/app/api/boxes/[uuid]/route.js
import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { 
  FUTURE_MOVIE_TYPES,
  FUTURE_GIFTICON_TYPES,
  FUTURE_INVENTION_TYPES 
} from '@/constants/futureItems';
import { getSignedUrlFromGCS } from '@/utils/uploadImage';

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

    // GCS filePath를 Signed URL로 변환
    const hologramsWithUrl = await Promise.all(
      futureHolograms.map(async (h) => {
        const signedUrl = await getSignedUrlFromGCS(h.image_url);
        return {
          ...h,
          image_url: signedUrl // <- 실제 응답 시에는 signed url로 덮어쓰기
        };
      })
    );

    const mirrorsWithUrl = await Promise.all(
      futureFaceMirrors.map(async (m) => {
        const signedUrl = await getSignedUrlFromGCS(m.image_url);
        return {
          ...m,
          image_url: signedUrl // <- 실제 응답 시에는 signed url로 덮어쓰기
        };
      })
    );

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
      ...hologramsWithUrl.map(hologram => ({
        id: `hologram_${hologram.id}`,
        type: 'FutureHologram',
        name: '홀로그램',
        icon: '/futurehologram_icon.svg',
        content: { imageUrl: hologram.image_url }
      })),
      ...mirrorsWithUrl.map(mirror => ({
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
    // ... (기존 로직 동일)

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
