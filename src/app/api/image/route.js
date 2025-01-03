import { NextResponse } from 'next/server';
import { getSignedUrlFromGCS } from '@/utils/uploadImage';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');

    if (!path) {
      return NextResponse.json(
        { error: '이미지 경로가 필요합니다.' },
        { status: 400 }
      );
    }

    const signedUrl = await getSignedUrlFromGCS(path);
    
    // 리다이렉트로 처리
    return NextResponse.redirect(signedUrl);

  } catch (error) {
    console.error('이미지 URL 생성 오류:', error);
    return NextResponse.json(
      { error: '이미지 URL 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 