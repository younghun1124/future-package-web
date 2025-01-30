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

    // 정상 응답 검증
    if (response.ok) {
      console.log('\n=== AI 생성 결과 ===');
      console.log('향수 이름:', data.name);
      console.log('향수 설명:', data.description);
      console.log('이름 길이:', data.name.length, '자');
      console.log('설명 길이:', data.description.length, '자');

      expect(data.success).toBe(true);
      expect(data.keywords).toEqual(testKeywords);
      expect(typeof data.name).toBe('string');
      expect(typeof data.description).toBe('string');
      expect(data.name.length).toBeLessThanOrEqual(15);
      expect(data.description.length).toBeLessThanOrEqual(60);
    } else {
      // 에러 응답 검증
      expect(data.success).toBe(false);
      expect(data.error).toBeDefined();
      
      // 과부하 에러 검증
      if (response.status === 503) {
        expect(data.error).toBe('AI 서버가 과부하 상태입니다. 잠시 후 다시 시도해주세요.');
      }
      // 토큰 제한 에러 검증
      else if (response.status === 429) {
        expect(data.error).toBe('토큰 제한에 도달했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  }, 30000); // 30초 타임아웃 설정

  it('서버 과부하 시 503 에러를 반환해야 함', async () => {
    // 서버 과부하를 시뮬레이션하기 위해 여러 번의 동시 요청
    const testKeywords = ["열정", "목표 성취", "자부심"];
    const requests = Array(5).fill().map(async () => {
      return fetch('http://localhost:3000/api/perfume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ keywords: testKeywords })
      });
    });

    const responses = await Promise.all(requests);
    const errorResponse = responses.find(response => response.status === 503);

    if (errorResponse) {
      const data = await errorResponse.json();
      expect(data.success).toBe(false);
      expect(data.error).toBe('AI 서버가 과부하 상태입니다. 잠시 후 다시 시도해주세요.');
    }
  }, 60000); // 60초 타임아웃 설정
});
