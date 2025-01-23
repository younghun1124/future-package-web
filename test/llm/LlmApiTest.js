import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// 환경 변수 로드
dotenv.config();

// Gemini AI 초기화
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

async function testValueMeter() {
  try {
    // 테스트 이미지 로드
    const imagePath = path.join(process.cwd(), 'public', 'test_item.webp');
    const imageData = fs.readFileSync(imagePath);
    const mimeType = 'image/webp';

    // 이미지를 base64로 변환
    const imageBase64 = imageData.toString('base64');

    const imageParts = [{
      inlineData: {
        data: imageBase64,
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
    5. 다음과 같은 형식으로 출력해주세요:

    2025년: 한정판으로 출시되어 컬렉터들의 관심을 받기 시작했다. / 150000
    2032년: 유명 아티스트의 작품에 등장하며 예술적 가치를 인정받았다. / 280000
    2039년: 빈티지 문화의 부활과 함께 박물관에서 전시되기 시작했다. / 750000
    2047년: 미래 사회를 대표하는 레트로 아이템으로 자리잡았다. / 1200000
    `;

    const result = await model.generateContent([prompt, ...imageParts]);
    console.log('ValueMeter 테스트 성공:', result.response.text());
    return true;
  } catch (error) {
    console.error('ValueMeter 테스트 실패:', error);
    return false;
  }
}

async function testPerfume() {
  try {
    const keywords = ["열정", "목표 성취", "자부심"];
    const prompt = `
    당신은 2047년 외계인 향수 조향사로서, 과거에 있는 고객의 친구에게 향수를 만들어주는 역할을 합니다.
    주어진 3개의 키워드를 바탕으로 하나의 향수를 표현하는 문장을 만들어주세요.

    규칙:
    1. 입력된 키워드: "${keywords.join('", "')}"
    2. 키워드들을 연결해 하나의 향수 향을 표현
    3. 감각적이고 시적인 표현 사용
    4. 한 문장으로만 표현 (30자 이내)
    5. 다른 설명 없이 문장만 출력
    `;

    const result = await model.generateContent(prompt);
    console.log('Perfume 테스트 성공:', result.response.text());
    return true;
  } catch (error) {
    console.error('Perfume 테스트 실패:', error);
    return false;
  }
}

async function testEmoji() {
  try {
    const text = "사과나무";
    const prompt = `
    당신은 이모지 변환기입니다.
    사용자가 입력한 단어나 문장을 이모지로 변환해주세요.
    
    규칙:
    1. 입력된 텍스트: "${text}"
    2. 각 글자를 가장 적절한 이모지로 변환
    3. 직관적이고 추측 가능한 이모지 사용
    4. 이모지만 출력 (다른 설명 없이)
    5. 최대 10개 이모지까지만 사용
    `;

    const result = await model.generateContent(prompt);
    console.log('Emoji 테스트 성공:', result.response.text());
    return true;
  } catch (error) {
    console.error('Emoji 테스트 실패:', error);
    return false;
  }
}

async function runAllTests() {
  console.log('LLM API 테스트 시작...\n');

  const results = await Promise.all([
    testValueMeter(),
    testPerfume(),
    testEmoji()
  ]);

  console.log('\n테스트 결과 요약:');
  console.log('ValueMeter:', results[0] ? '성공' : '실패');
  console.log('Perfume:', results[1] ? '성공' : '실패');
  console.log('Emoji:', results[2] ? '성공' : '실패');
}

runAllTests(); 