import { describe, it, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import FormData from 'form-data';

// .env.local 파일 로드
dotenv.config({ path: '.env.local' });

describe('Upload API 테스트', () => {
  beforeAll(() => {
    // GCP 인증 설정 확인
    if (!process.env.GCP_SERVICE_ACCOUNT_KEY_BASE64) {
      throw new Error('GCP 서비스 계정 키가 필요합니다.');
    }
  });

  it('이미지를 성공적으로 업로드해야 함', async () => {
    const imagePath = path.join(process.cwd(), 'test', 'api', 'public', 'test_item.webp');
    const imageBuffer = fs.readFileSync(imagePath);
    
    const formData = new FormData();
    formData.append('image', imageBuffer, {
      filename: 'test_item.webp',
      contentType: 'image/webp',
    });

    const response = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders()
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
    expect(data.filePath).toBeDefined();
    expect(data.imageUrl).toBeDefined();
  });

  it('이미지 파일이 아닐 때 400 에러를 반환해야 함', async () => {
    const textBuffer = Buffer.from('This is a plain text file.');
    const form = new FormData();
    form.append('image', textBuffer, {
      filename: 'test.txt',
      contentType: 'text/plain',
    });

    const response = await fetch('http://localhost:3000/api/upload', {
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

    expect(response.status).toBe(400);
    expect(data.error).toBe('이미지 파일만 업로드 가능합니다.');
  });

  it('파일 크기가 5MB를 초과할 때 400 에러를 반환해야 함', async () => {
    const largeBuffer = Buffer.alloc(5 * 1024 * 1024 + 1, 'a');
    const form = new FormData();
    form.append('image', largeBuffer, {
      filename: 'large_image.webp',
      contentType: 'image/webp',
    });

    const response = await fetch('http://localhost:3000/api/upload', {
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

    expect(response.status).toBe(400);
    expect(data.error).toBe('파일 크기는 5MB를 초과할 수 없습니다.');
  });
});
