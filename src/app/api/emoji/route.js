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

    if (text.length > 50 || text.length < 1) {
      return NextResponse.json(
        { error: '텍스트는 1-50자 사이여야 합니다.' },
        { status: 400 }
      );
    }

    const prompt = `
    당신은 이모지 변환기입니다.
    사용자가 입력한 단어나 문장을 이모지로 변환해주세요.
    
    사용자가 입력한 문장: "${text}"

    규칙:
    1. 각 글자를 가장 적절한 이모지로 변환. 기본적으로 이모지로 변환할 때 단어 의미 단위로 이모지 변환해줘.
    2. 직관적이고 추측 가능한 이모지 사용
    3. 응답에는 반드시 이모지만 포함되어야 함
    4. 최대 20개 이모지까지만 사용
    5. 숫자, 문자, 특수문자 등 이모지가 아닌 것은 절대 포함하면 안 됨
    6. 예시를 참고하여 변환 결과를 생성

    잘못된 응답 예시:
    ❌ "안녕하세요" -> 👋 Hello
    ❌ "좋아요" -> 👍 OK!
    ❌ "내일 보자" -> 明日 👋

    올바른 응답 예시:
    ✅ "안녕하세요" -> 👋
    ✅ "좋아요" -> 👍
    ✅ "내일 보자" -> 🌅 👋
    
    참고 예시1:
    사용자 입력: 새해 복 많이 받으세요
    변환 결과: 🎉🧧💯🤲

    참고 예시2:
    사용자 입력: 소녀는 공원 구석에 불쌍하게 쭈그리고 앉아 나뭇가지로 모래에 낙서를 하고 있었다.
    변환 결과: 👧🏻🏞️🌳😔💺🌿✍️🏖️

    참고 예시3:
    사용자 입력: 미안해 내가 너를 생각 안하고 너무 직진만 했지? 이제 천천히 다가갈께 미안해
    변환 결과: 🙏🏻💭👀😔💔😢🙏🏻🕰️💨😊

    참고 예시4:
    사용자 입력: 메리 크리스마스!! 행복한 하루 되길 바래 이번 년도도 수고했고 내년도 파이팅 해보자
    변환 결과: 🎄🎅️!! 😊🙏 💪🏼🎉 👏😊 🎊🔥💥
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