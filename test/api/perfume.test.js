import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config({ path: '.env.local' });

describe('Perfume API 테스트', () => {
  let server;

  beforeAll(() => {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error('GOOGLE_API_KEY가 필요합니다.');
    }
  });

  afterAll(() => {
  });

  it('키워드로부터 향수 설명을 정상적으로 생성해야 함', async () => {
    const testKeywords = ["열정", "목표 성취", "자부심"];
    
    console.log('\n=== 요청 정보 ===');
    console.log('키워드:', testKeywords);
    
    const response = await fetch('http://localhost:3000/api/perfume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ keywords: testKeywords })
    });

    // HTTP 응답 상태 및 헤더 출력
    console.log('\n=== HTTP 응답 정보 ===');
    console.log('상태:', response.status, response.statusText);
    console.log('헤더:', Object.fromEntries(response.headers));

    const data = await response.json();
    
    // 응답 데이터 출력
    console.log('\n=== 응답 데이터 ===');
    console.log(JSON.stringify(data, null, 2));

    // AI 응답 상세 정보 출력
    if (data.success) {
      console.log('\n=== AI 생성 결과 ===');
      console.log('향수 이름:', data.name);
      console.log('향수 설명:', data.description);
      console.log('이름 길이:', data.name.length, '자');
      console.log('설명 길이:', data.description.length, '자');
    }

    expect(response.ok).toBe(true);
    expect(data.success).toBe(true);
    expect(data.keywords).toEqual(testKeywords);
    expect(typeof data.name).toBe('string');
    expect(typeof data.description).toBe('string');
    expect(data.name.length).toBeLessThanOrEqual(15);
    expect(data.description.length).toBeLessThanOrEqual(60);
  });
});
