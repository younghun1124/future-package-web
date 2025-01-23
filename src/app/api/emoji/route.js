import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Gemini AI 초기화
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

export async function POST(request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: '변환할 텍스트가 필요합니다.' },
        { status: 400 }
      );
    }

    if (text.length > 8 || text.length < 1) {
      return NextResponse.json(
        { error: '텍스트는 1-8자 사이여야 합니다.' },
        { status: 400 }
      );
    }

    const prompt = `
    당신은 이모지 변환기입니다.
    사용자가 입력한 단어나 문장을 이모지로 변환해주세요.
    
    규칙:
    1. 입력된 텍스트: "${text}"
    2. 각 글자를 가장 적절한 이모지로 변환
    3. 직관적이고 추측 가능한 이모지 사용
    4. 이모지만 출력 (다른 설명 없이)
    5. 최대 10개 이모지까지만 사용
    
    예시:
    입력: "사과나무"
    출력: 🍎🌳
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const emojiResult = response.text().trim();

    if (!emojiResult) {
      throw new Error('이모지 생성 실패');
    }

    return NextResponse.json({ 
      success: true,
      text: text,
      emoji: emojiResult 
    });

  } catch (error) {
    console.error('이모지 변환 중 오류 발생:', error);
    return NextResponse.json(
      { error: '이모지 변환 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 