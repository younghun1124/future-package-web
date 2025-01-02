// src/app/api/upload/route.js
import { NextResponse } from 'next/server';
import { uploadToGCS } from '@/utils/uploadImage';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json(
        { error: '업로드할 파일이 없습니다.' },
        { status: 400 }
      );
    }

    // 파일 유형 검증
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: '이미지 파일만 업로드 가능합니다.' },
        { status: 400 }
      );
    }

    // 파일 크기 검증 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: '파일 크기는 5MB를 초과할 수 없습니다.' },
        { status: 400 }
      );
    }

    // 파일 데이터 준비
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileData = {
      originalFilename: file.name,
      mimetype: file.type,
      buffer
    };

    // GCS에 업로드 -> 경로만 받아옴 (ex: "uploads/1679911112223-myfile.png")
    const filePath = await uploadToGCS(fileData, 'uploads');

    // 여기서는 filePath만 반환 (public url X, signed url X)
    return NextResponse.json({ filePath });

  } catch (error) {
    console.error('업로드 에러:', error);
    return NextResponse.json(
      { error: '파일 업로드 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
