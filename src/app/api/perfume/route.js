import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Gemini AI 초기화
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

export async function POST(request) {
  try {
    const { keywords } = await request.json();

    if (!keywords || !Array.isArray(keywords) || keywords.length !== 3) {
      return NextResponse.json(
        { error: '정확히 3개의 키워드가 필요합니다.' },
        { status: 400 }
      );
    }

    const prompt = `
    당신은 2047년 외계인 향수 조향사로서, 과거에 있는 고객의 친구에게 향수를 만들어주는 역할을 합니다.
    주어진 3개의 키워드를 바탕으로 하나의 향수를 표현하는 문장을 만들어주세요.
    사용자는 2025년 ~ 2047년 미래에 친구와 함께하고 싶은 경험에 대한 질문에 키워드 3개를 선택했습니다.

    질문:
    1. 친구와 함께 만들어가고 있는 것은?
    2. 그런 친구와 미래에는 어떤 일을?
    3. 그 과정에서 우리가 느낀 감정은?
    
    규칙:
    1. 입력된 키워드: "${keywords.join('", "')}"
    2. 키워드들을 연결해 하나의 향수 향을 표현
    3. 감각적이고 시적인 표현 사용
    4. 한 문장으로만 표현 (30자 이내)
    5. 다른 설명 없이 문장만 출력
    
    예시:
    입력: ["열정", "목표 성취", "자부심"]
    출력: 별을 향해 불타는 자부심의 향기
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const perfumeDescription = response.text().trim();

    return NextResponse.json({ 
      success: true,
      keywords: keywords,
      description: perfumeDescription 
    });

  } catch (error) {
    console.error('향수 설명 생성 중 오류 발생:', error);
    return NextResponse.json(
      { error: '향수 설명 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 