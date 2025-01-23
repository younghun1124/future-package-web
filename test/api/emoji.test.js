import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config({ path: '.env.local' });

describe('Emoji API 테스트', () => {
  let server;

  beforeAll(() => {
    // API 키 확인
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error('GOOGLE_API_KEY가 필요합니다.');
    }
  });

  afterAll(() => {
    // 서버를 종료하는 로직을 추가할 수 있습니다.
    // 예: server.close();
  });

  it('텍스트를 이모지로 정상적으로 변환해야 함', async () => {
    const testText = "사과나무";
    
    const response = await fetch('http://localhost:3000/api/emoji', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: testText })
    });

    // HTTP 응답 상태 및 헤더 출력
    console.log('\n=== HTTP 응답 정보 ===');
    console.log('상태:', response.status, response.statusText);
    console.log('헤더:', Object.fromEntries(response.headers));

    const data = await response.json();
    
    // 응답 데이터 출력
    console.log('\n=== 응답 데이터 ===');
    console.log(JSON.stringify(data, null, 2));

    expect(response.ok).toBe(true);
    expect(data.success).toBe(true);
    expect(data.text).toBe(testText);
    expect(typeof data.emoji).toBe('string');
    expect(data.emoji.length).toBeGreaterThan(0);
  }, 30000); // 30초 타임아웃 설정
}); 