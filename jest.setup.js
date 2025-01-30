import '@testing-library/jest-dom';
import fetch, { Request, Response } from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';

// .env.local 파일 경로 설정
const envPath = path.resolve(process.cwd(), '.env.local');

// .env.local 파일 로드
dotenv.config({ path: envPath });

// Jest 타임아웃 설정 (60초)
jest.setTimeout(60000);

// 전역 fetch 모의 설정
global.fetch = require('node-fetch');

// fetch 설정
global.fetch = (url, options) => {
  if (url.startsWith('/')) {
    url = `${process.env.NEXT_PUBLIC_BASE_URL}${url}`;
  }
  return fetch(url, options);
};
global.Request = Request;
global.Response = Response;
