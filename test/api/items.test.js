import { describe, it, expect } from '@jest/globals';
import fetch from 'node-fetch';

describe('Boxes API 테스트', () => {
  it('FutureBox를 성공적으로 생성해야 함', async () => {
    const testData = {
      receiver: "테스트 수신자",
      sender: "테스트 발신자",
      futureItems: [
        {
          type: "FutureNote",
          content: {
            message: "미래에서 보내는 편지입니다.",
            encryptedMessage: "이모티콘 메시지"
          }
        },
        {
          type: "FutureHologram",
          content: {
            imageUrl: "uploads/test-hologram.jpg"
          }
        },
        {
          type: "FutureFaceMirror",
          content: {
            year: 2047,
            imageUrl: "mirrors/test-face.svg"
          }
        },
        {
          type: "FutureTarot",
          content: {
            cardIndexes: [1, 2, 3],
            description: "당신은 남은 하루를 재밌게 보낼거에요"
          }
        },
        {
          type: "FuturePerfume",
          content: {
            name: "테스트 향수",
            description: "별을 향해 불타는 자부심의 향기",
            keywords: ["열정", "목표 성취", "자부심"],
            shape: 1,
            color: 180,
            outline_type: 1
          }
        }
      ],
      futureGifticonType: 1,
      futureValueMeterIncluded: false
    };

    const response = await fetch('http://localhost:3000/api/boxes', {
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

  it('아이템을 성공적으로 조회해야 함', async () => {
    // 먼저 아이템 생성
    const testData = {
      receiver: "테스트 수신자",
      sender: "테스트 발신자",
      futureItems: [
        {
          type: "FutureNote",
          content: {
            message: "미래에서 보내는 편지입니다.",
            encryptedMessage: "이모티콘 메시지"
          }
        },
        {
          type: "FutureHologram",
          content: {
            imageUrl: "uploads/test-hologram.jpg"
          }
        },
        {
          type: "FutureFaceMirror",
          content: {
            year: 2047,
            imageUrl: "mirrors/test-face.svg"
          }
        },
        {
          type: "FutureTarot",
          content: {
            cardIndexes: [1, 2, 3],
            description: "당신은 남은 하루를 재밌게 보낼거에요"
          }
        },
        {
          type: "FuturePerfume",
          content: {
            name: "테스트 향수",
            description: "별을 향해 불타는 자부심의 향기",
            keywords: ["열정", "목표 성취", "자부심"],
            shape: 1,
            color: 180,
            outline_type: 1
          }
        }
      ],
      futureGifticonType: 1,
      futureValueMeterIncluded: false
    };

    const createResponse = await fetch('http://localhost:3000/api/boxes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    const createData = await createResponse.json();
    expect(createData.uuid).toBeDefined();

    // 생성된 아이템 조회
    const getResponse = await fetch(`http://localhost:3000/api/boxes/${createData.uuid}`);
    
    // HTTP 응답 상태 및 헤더 출력
    console.log('\n=== GET 응답 정보 ===');
    console.log('상태:', getResponse.status, getResponse.statusText);
    console.log('헤더:', Object.fromEntries(getResponse.headers));

    const getData = await getResponse.json();
    
    // GET 응답 데이터 출력
    console.log('\n=== GET 응답 데이터 ===');
    console.log(JSON.stringify(getData, null, 2));

    expect(getResponse.ok).toBe(true);
    expect(getData.uuid).toBe(createData.uuid);
    expect(getData.receiver).toBe("테스트 수신자");
    expect(getData.sender).toBe("테스트 발신자");
    expect(getData.futureItems).toBeInstanceOf(Array);
    expect(getData.futureItems).toHaveLength(5);

    // FutureNote 검증
    expect(getData.futureItems[0]).toMatchObject({
      type: "FutureNote",
      content: {
        message: "미래에서 보내는 편지입니다.",
        encryptedMessage: "이모티콘 메시지"
      }
    });

    // FutureHologram 검증
    expect(getData.futureItems[1]).toMatchObject({
      type: "FutureHologram",
      content: {
        imageUrl: expect.any(String)
      }
    });

    // FutureFaceMirror 검증
    expect(getData.futureItems[2]).toMatchObject({
      type: "FutureFaceMirror",
      content: {
        year: 2047,
        imageUrl: expect.any(String)
      }
    });

    // FutureTarot 검증
    expect(getData.futureItems[3]).toMatchObject({
      type: "FutureTarot",
      content: {
        cardIndexes: [1, 2, 3],
        description: "당신은 남은 하루를 재밌게 보낼거에요"
      }
    });

    // FuturePerfume 검증
    expect(getData.futureItems[4]).toMatchObject({
      type: "FuturePerfume",
      content: {
        name: "테스트 향수",
        description: "별을 향해 불타는 자부심의 향기",
        keywords: ["열정", "목표 성취", "자부심"],
        shape: 1,
        color: 180,
        outline_type: 1
      }
    });

    expect(getData.futureGifticonType).toBe(1);
    expect(getData.futureValueMeterIncluded).toBe(false);
  });

  it('존재하지 않는 아이템 조회 시 404를 반환해야 함', async () => {
    const response = await fetch('http://localhost:3000/api/boxes/af67afba-ee2e-4e03-84be-7a8b399e3333');
    
    // 404 응답 정보 출력
    console.log('\n=== 404 응답 정보 ===');
    console.log('상태:', response.status, response.statusText);
    console.log('헤더:', Object.fromEntries(response.headers));

    const data = await response.json();
    
    // 404 응답 데이터 출력
    console.log('\n=== 404 응답 데이터 ===');
    console.log(JSON.stringify(data, null, 2));

    expect(response.status).toBe(404);
    expect(data.error).toBe('존재하지 않는 FutureBox입니다.');
  });
});
