import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Gemini AI 초기화
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

export async function POST(request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image');

    if (!imageFile) {
      return NextResponse.json(
        { error: '이미지가 필요합니다.' },
        { status: 400 }
      );
    }

    // 이미지 처리
    const imageData = await imageFile.arrayBuffer();
    const mimeType = imageFile.type;

    // 이미지를 Gemini가 처리할 수 있는 형식으로 변환
    const imageParts = [{
      inlineData: {
        data: Buffer.from(imageData).toString('base64'),
        mimeType
      }
    }];

    const prompt = `
    당신은 미래의 가치를 예측하는 AI입니다.
    이 이미지의 아이템에 대해 2025년부터 2047년 사이의 4개 시점에서의 스토리와 가치를 예측해주세요.

    규칙:
    1. 각 시점은 최소 3년 이상의 간격을 두어야 합니다.
    2. 각 시점의 스토리는 반드시 한 문장(30자 이내)으로만 작성해주세요.
    3. 스토리는 해당 시점에서 이 아이템이 어떻게 사용되고 있는지를 간단히 설명해야 합니다.
    4. 가격은 스토리의 맥락과 자연스럽게 연결되어야 합니다.
    5. 다음 JSON 형식으로 출력해주세요:

    {
      "predictions": [
        {
          "year": 2025,
          "story": "한정판으로 출시되어 컬렉터들의 관심을 받기 시작했다.",
          "value": 150000
        },
        {
          "year": 2032,
          "story": "유명 아티스트의 작품에 등장하며 예술적 가치를 인정받았다.",
          "value": 280000
        }
        ...
      ]
    }
    `;

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const predictions = JSON.parse(response.text());

    return NextResponse.json({ 
      success: true,
      predictions: predictions.predictions
    });

  } catch (error) {
    console.error('가치 측정 중 오류 발생:', error);
    return NextResponse.json(
      { error: '가치 측정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 