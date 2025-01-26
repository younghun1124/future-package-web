// src/app/api/boxes/[uuid]/route.js
import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { 
  FUTURE_GIFTICON_TYPES
} from '@/constants/futureItems';
import { getSignedUrlFromGCS } from '@/utils/uploadImage';

// 서버 시작 시 FutureGifticon 타입 캐싱
let cachedGifticonTypes = [];

const cacheGifticonTypes = async (sql) => {
  if (cachedGifticonTypes.length === 0) {
    const gifticonTypes = await sql`SELECT * FROM future_gifticon_type`;
    cachedGifticonTypes = gifticonTypes;
  }
  return cachedGifticonTypes;
};

export async function GET(request, { params }) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const { uuid } = await params;
    
    // 먼저 box가 존재하는지 확인
    const [boxExists] = await sql`
      SELECT EXISTS (
        SELECT 1 FROM future_box WHERE uuid = ${uuid}
      )
    `;

    if (!boxExists.exists) {
      return NextResponse.json(
        { error: '존재하지 않는 FutureBox입니다.' },
        { status: 404 }
      );
    }

    // 기존의 is_opened 업데이트 로직
    const [futureBox] = await sql`
      UPDATE future_box 
      SET is_opened = true 
      WHERE uuid = ${uuid}
      RETURNING *
    `;

    const [futureNotes, futureHolograms, futureFaceMirrors, futureTarots, futurePerfumes] = await Promise.all([
      sql`SELECT * FROM future_note WHERE box_id = ${futureBox.id}`,
      sql`SELECT * FROM future_hologram WHERE box_id = ${futureBox.id}`,
      sql`SELECT * FROM future_face_mirror WHERE box_id = ${futureBox.id}`,
      sql`SELECT * FROM future_tarot WHERE box_id = ${futureBox.id}`,
      sql`SELECT * FROM future_perfume WHERE box_id = ${futureBox.id}`
    ]);

    // GCS filePath를 Signed URL로 변환
    const hologramsWithUrl = await Promise.all(
      futureHolograms.map(async (h) => {
        if (!h.image_url) return h;
        try {
          const signedUrl = await getSignedUrlFromGCS(h.image_url);
          return { ...h, image_url: signedUrl };
        } catch (error) {
          console.error('홀로그램 Signed URL 생성 실패:', error);
          return h;
        }
      })
    );

    const mirrorsWithUrl = await Promise.all(
      futureFaceMirrors.map(async (m) => {
        if (!m.image_url) return m;
        try {
          const signedUrl = await getSignedUrlFromGCS(m.image_url);
          return { ...m, image_url: signedUrl };
        } catch (error) {
          console.error('미러 Signed URL 생성 실패:', error);
          return m;
        }
      })
    );

    // API 스펙에 맞게 응답 데이터 구성
    const futureItems = [
      ...futureNotes.map(note => ({
        type: 'FutureNote',
        content: {
          message: note.message,
          encryptedMessage: note.encrypted_message
        }
      })),
      ...hologramsWithUrl.map(hologram => ({
        type: 'FutureHologram',
        content: {
          imageUrl: hologram.image_url
        }
      })),
      ...mirrorsWithUrl.map(mirror => ({
        type: 'FutureFaceMirror',
        content: {
          year: mirror.year,
          imageUrl: mirror.image_url
        }
      })),
      ...futureTarots.map(tarot => ({
        type: 'FutureTarot',
        content: {
          cardIndexes: tarot.card_indexes,
          description: tarot.description
        }
      })),
      ...futurePerfumes.map(perfume => ({
        type: 'FuturePerfume',
        content: {
          name: perfume.name,
          description: perfume.description,
          keywords: perfume.keywords,
          shape: perfume.shape_type,
          color: perfume.color,
          outline_type: perfume.outline_type
        }
      }))
    ];

    // 기프티콘이 있으면 추가
    if (futureBox.future_gifticon_type) {
      futureItems.push({
        type: 'FutureGifticon',
        content:{futureGifticonType: futureBox.future_gifticon_type}
      });
    }

    // 가치 측정기가 있으면 추가
    if (futureBox.future_value_meter_included) {
      futureItems.push({
        type: 'FutureValueMeter'
      });
    }

    return NextResponse.json({
      uuid: futureBox.uuid,
      receiver: futureBox.receiver,
      sender: futureBox.sender,
      futureItems
    });
    
  } catch (error) {
    console.error('Error fetching FutureBox:', error);
    return NextResponse.json(
      { error: 'FutureBox 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
