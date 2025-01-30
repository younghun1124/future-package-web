import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

// .env.local 파일 로드
dotenv.config({ path: '.env.local' });

describe('ValueMeter API 테스트', () => {
  let server;

  beforeAll(() => {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error('GOOGLE_API_KEY가 필요합니다.');
    }
  });

  afterAll(() => {
    // 서버를 종료하는 로직을 추가할 수 있습니다.
    // 예: server.close();
  });

  it('이미지 분석 및 가치 예측을 정상적으로 수행해야 함', async () => {
    const imagePath = path.join(process.cwd(), 'test', 'api', 'public', 'test_item.webp');
    
    // 이미지 파일이 존재하는지 확인
    if (!fs.existsSync(imagePath)) {
      throw new Error(`이미지 파일을 찾을 수 없습니다: ${imagePath}`);
    }

    const imageBuffer = fs.readFileSync(imagePath);
    const form = new FormData();
    form.append('image', imageBuffer, {
      filename: 'test_item.webp',
      contentType: 'image/webp',
    });

    const response = await fetch('http://localhost:3000/api/valuemeter', {
      method: 'POST',
      body: form,
      headers: form.getHeaders(),
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
      expect(data.success).toBe(true);
      expect(data.predictions).toBeInstanceOf(Array);
      expect(data.predictions.length).toBe(4);

      data.predictions.forEach(prediction => {
        expect(prediction).toHaveProperty('year');
        expect(prediction).toHaveProperty('story');
        expect(prediction).toHaveProperty('value');
        expect(typeof prediction.year).toBe('number');
        expect(typeof prediction.story).toBe('string');
        expect(typeof prediction.value).toBe('number');
      });
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
    const requests = Array(5).fill().map(async () => {
      const imagePath = path.join(process.cwd(), 'test', 'api', 'public', 'test_item.webp');
      const imageBuffer = fs.readFileSync(imagePath);
      const form = new FormData();
      form.append('image', imageBuffer, {
        filename: 'test_item.webp',
        contentType: 'image/webp',
      });

      return fetch('http://localhost:3000/api/valuemeter', {
        method: 'POST',
        body: form,
        headers: form.getHeaders(),
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
