// src/app/api/items/[uuid]/route.js
import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { 
  FUTURE_GIFTICON_TYPES
} from '@/constants/futureItems';
import { getSignedUrlFromGCS } from '@/utils/uploadImage';

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

    const [futureNotes, futureHolograms, futureFaceMirrors, futureTarots, futurePerfumes, futureGifticons] = await Promise.all([
      sql`SELECT * FROM future_note WHERE box_id = ${futureBox.id}`,
      sql`SELECT * FROM future_hologram WHERE box_id = ${futureBox.id}`,
      sql`SELECT * FROM future_face_mirror WHERE box_id = ${futureBox.id}`,
      sql`SELECT * FROM future_tarot WHERE box_id = ${futureBox.id}`,
      sql`SELECT * FROM future_perfume WHERE box_id = ${futureBox.id}`,
      sql`SELECT * FROM future_gifticon WHERE box_id = ${futureBox.id}`
    ]);

    // GCS filePath를 Signed URL로 변환
    const hologramsWithUrl = await Promise.all(
      futureHolograms.map(async (h) => {
        if (!h.image_url) return h;
        try {
          const signedUrl = await getSignedUrlFromGCS(h.image_url);
          return {
            ...h,
            image_url: signedUrl
          };
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
          return {
            ...m,
            image_url: signedUrl
          };
        } catch (error) {
          console.error('미러 Signed URL 생성 실패:', error);
          return m;
        }
      })
    );

    // FutureGifticon 타입 캐싱
    let cachedGifticonTypes = [];
    if (cachedGifticonTypes.length === 0) {
      const gifticonTypes = await sql`SELECT * FROM future_gifticon_type`;
      cachedGifticonTypes = gifticonTypes;
    }

    // 기본 아이템 변환
    const futureItems = [
      ...futureNotes.map(note => ({
        id: `note_${note.id}`,
        type: 'FutureNote',
        name: '쪽지',
        icon: '/futurenote_icon.svg',
        content: { message: note.message }
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
      })),
      ...futureTarots.map(tarot => ({
        id: `tarot_${tarot.id}`,
        type: 'FutureTarot',
        name: '타로',
        icon: '/futuretarot_icon.svg',
        content: { 
          cardIndexes: tarot.indexes, 
          description: tarot.description 
        }
      })),
      ...futurePerfumes.map(perfume => ({
        id: `perfume_${perfume.id}`,
        type: 'FuturePerfume',
        name: '향수',
        icon: '/futureperfume_icon.svg',
        content: { 
          name: perfume.name,
          description: perfume.description,
          keywords: perfume.keywords,
          shapeType: perfume.shape_type,
          color: perfume.color
        }
      })),
      ...futureGifticons.map(gifticon => {
        const type = cachedGifticonTypes.find(gt => gt.id === gifticon.gifticon_type_id);
        return {
          id: `gifticon_${gifticon.id}`,
          type: 'FutureGifticon',
          name: type.name,
          icon: type.image_url,
          content: { 
            id: type.id,
            name: type.name,
            description: type.description,
            imageUrl: type.image_url,
            detailImageUrl: type.detail_image_url 
          }
        };
      })
    ];

    const response = {
      box: {
        uuid: futureBox.uuid,
        receiver: futureBox.receiver,
        sender: futureBox.sender,
        futureGifticonType: futureBox.future_gifticon_type,
        futureValueMeterIncluded: futureBox.future_value_meter_included,
        createdAt: futureBox.created_at
      },
      items: {
        futureNotes: futureNotes.map(note => ({
          id: note.id,
          message: note.message
        })),
        futureHolograms: hologramsWithUrl.map(hologram => ({
          id: hologram.id,
          imageUrl: hologram.image_url
        })),
        futureFaceMirrors: mirrorsWithUrl.map(mirror => ({
          id: mirror.id,
          year: mirror.year,
          imageUrl: mirror.image_url
        })),
        futureTarots: futureTarots.map(tarot => ({
          id: tarot.id,
          cardIndexes: tarot.indexes,
          description: tarot.description
        })),
        futurePerfumes: futurePerfumes.map(perfume => ({
          id: perfume.id,
          name: perfume.name,
          description: perfume.description,
          keywords: perfume.keywords,
          shapeType: perfume.shape_type,
          color: perfume.color
        })),
        futureGifticons: futureGifticons.map(gifticon => ({
          id: gifticon.id,
          gifticonTypeId: gifticon.gifticon_type_id
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