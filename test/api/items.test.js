import { describe, it, expect } from '@jest/globals';
import fetch from 'node-fetch';

describe('Items API 테스트', () => {
  it('FutureBox를 성공적으로 생성해야 함', async () => {
    const testData = {
      receiver: "테스트 수신자",
      sender: "테스트 발신자",
      futureItems: [
        {
          type: "FutureNote",
          content: {
            message: "테스트 메시지"
          }
        },
        {
          type: "FuturePerfume",
          content: {
            name: "테스트 향수",
            description: "별을 향해 불타는 자부심의 향기",
            keywords: ["열정", "목표 성취", "자부심"],
            shape: 1,
            color: "#FF0000"
          }
        }
      ],
      futureGifticonType: 1,
      futureValueMeterIncluded: false
    };

    const response = await fetch('http://localhost:3000/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
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
    expect(data.uuid).toBeDefined();
  });
});
