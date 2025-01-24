# Future Box API 스펙

## 이미지 업로드
```http
POST {{base_url}}/api/upload
Content-Type: multipart/form-data

form-data:
{
    "image": "<file>"
}
```

### Response 200
```json
{
    "filePath": "uploads/1234567890-image.jpg",
    "imageUrl": "https://storage.googleapis.com/bucket-name/uploads/1234567890-image.jpg"
}
```

## 아이템 등록
```http
POST {{base_url}}/api/boxes
Content-Type: application/json

{
    "receiver": "미래",
    "sender": "현재",
    "futureItems": [
        {
            "type": "FutureNote",
            "content": {
                "message": "미래에서 보내는 편지입니다.",
                "encryptedMessage": "이모티콘 메시지"
            }
        },
        {
            "type": "FutureHologram",
            "content": {
                "imageUrl": "uploads/1234567890-hologram.jpg"
            }
        },
        {
            "type": "FutureFaceMirror",
            "content": {
                "year": 2047,
                "imageUrl": "mirrors/1234567890-face.svg"
            }
        },
        {
            "type": "FutureTarot",
            "content": {
                "cardIndexes": [1, 2, 3],
                "description": "당신은 남은 하루를 재밌게 보낼거에요"
            }
        }
        {
            "type": "FuturePerfume",
            "content": {
                "name": "나는 모르는 향",
                "description": "잔잔한 비가 내리는 날의 쾌쾌한 향",
                "keywords": ["열정", "목표 성취", "감동"],
                "shape": 1,
                "color": 180,
                "outline_type": 1
            }
        }
    ],
    "futureGifticonType": 1
    "futureValueMeterIncluded": false
}
```

### Response 200
```json
{
    "success": true,
    "uuid": "550e8400-e29b-41d4-a716-446655440000"
}
```

## 아이템 조회
```http
GET {{base_url}}/api/boxes/{{uuid}}
```

### Response 200
```json
{
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "receiver": "미래",
    "sender": "현재",
    "futureItems": [
        {
            "type": "FutureNote",
            "content": {
                "message": "미래에서 보내는 편지입니다.",
                "encryptedMessage": "이모티콘 메시지"
            }
        },
        {
            "type": "FutureHologram",
            "content": {
                "imageUrl": "uploads/1735842555359-vite.svg"
            }
        },
        {
            "type": "FutureFaceMirror",
            "content": {
                "year": 2047,
                "imageUrl": "mirrors/1735842555359-vite.svg"
            }
        },
        {
            "type": "FutureTarot",
            "content": {
                "cardIndexes": [1, 2, 3],
                "description": "당신은 남은 하루를 재밌게 보낼거에요"
            }
        },
        {
            "type": "FuturePerfume",
            "content": {
                "name": "나는 모르는 향",
                "description": "잔잔한 비가 내리는 날의 쾌쾌한 향",
                "keywords": ["열정", "목표 성취", "감동"],
                "shape": 1,
                "color": 180,
                "outline_type": 1
            }
        }
    ],
    "futureGifticonType": 1,
    "futureValueMeterIncluded": false,
}
```

### Response 404
```json
{
    "error": "존재하지 않는 선물입니다."
}
```

-----------------------------
# 이모지 변환 API 스펙

## 기본 정보
- **엔드포인트**: `/api/emoji`
- **메소드**: POST
- **설명**: 텍스트를 이모지로 변환하는 API

## 요청 (Request)

### Headers
```
Content-Type: application/json
```

### Body
```json
{
  "text": "변환할텍스트"
}
```

### 제약 조건
- `text`: 문자열
  - 필수 항목
  - 길이: 1-8자 이내
  - 타입: string

## 응답 (Response)

### 성공 응답 (200 OK)
```json
{
  "success": true,
  "text": "입력한텍스트",
  "emoji": "변환된이모지"
}
```

### 오류 응답

#### 잘못된 요청 (400 Bad Request)
```json
{
  "error": "텍스트는 1-8자 사이여야 합니다."
}
```

#### 서버 오류 (500 Internal Server Error)
```json
{
  "error": "이모지 변환 중 오류가 발생했습니다."
}
```

## 예시

### 요청 예시
```json
{
  "text": "사과나무"
}
```

### 응답 예시
```json
{
  "success": true,
  "text": "사과나무",
  "emoji": "🍎🌳"
}
```
-----------------------------
# 향수 설명 생성 API 스펙

## 기본 정보
- **엔드포인트**: `/api/perfume`
- **메소드**: POST
- **설명**: 키워드를 기반으로 향수 설명을 생성하는 API

## 요청 (Request)

### Headers
```
Content-Type: application/json
```

### Body
```json
{
  "keywords": ["키워드1", "키워드2", "키워드3"]
}
```

### 제약 조건
- `keywords`: 문자열 배열
  - 필수 항목
  - 정확히 3개의 키워드 필요
  - 각 키워드는 문자열
  - 빈 문자열 불가

## 응답 (Response)

### 성공 응답 (200 OK)
```json
{
  "success": true,
  "name": "향수 이름",
  "keywords": ["키워드1", "키워드2", "키워드3"],
  "description": "생성된 향수 설명"
}
```

### 오류 응답

#### 잘못된 요청 (400 Bad Request)
```json
{
  "error": "정확히 3개의 키워드가 필요합니다."
}
```

#### 서버 오류 (500 Internal Server Error)
```json
{
  "error": "향수 설명 생성 중 오류가 발생했습니다."
}
```

## 예시

### 요청 예시
```json
{
  "keywords": ["봄", "꽃", "달콤"]
}
```

### 응답 예시
```json
{
  "success": true,
  "name": "별을 향한 비상 향",
  "keywords": ["열정", "목표 성취", "자부심"],
  "description": "별을 향해 불타는 자부심의 향기"
}
```

## 참고사항
- Google Gemini AI를 사용하여 향수 설명 생성
- 감각적이고 시적인 표현으로 향수 설명 생성
- 설명은 30자 이내의 한 문장으로 제한

-----------------------------

# 미래 가치 측정기 API 스펙

## 기본 정보
- **엔드포인트**: `/api/valuemeter`
- **메소드**: POST
- **설명**: 이미지를 분석하여 미래의 가치와 스토리를 예측하는 API

## 요청 (Request)

### Headers
```
Content-Type: multipart/form-data
```

### Body
```
image: File (이미지 파일)
```

### 제약 조건
- `image`: 이미지 파일
  - 필수 항목
  - 파일 형식: image/*
  - 최대 크기: 아직 안 정함
  - 지원 형식: jpg, jpeg, png, gif, webp

## 응답 (Response)

### 성공 응답 (200 OK)
```json
{
  "success": true,
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
    },
    {
      "year": 2039,
      "story": "빈티지 문화의 부활과 함께 박물관에서 전시되기 시작했다.",
      "value": 750000
    },
    {
      "year": 2047,
      "story": "미래 사회를 대표하는 레트로 아이템으로 자리잡았다.",
      "value": 1200000
    }
  ]
}
```

### 오류 응답

#### 잘못된 요청 (400 Bad Request)
```json
{
  "error": "이미지가 필요합니다."
}
```

```json
{
  "error": "이미지 파일만 업로드 가능합니다."
}
```

#### 서버 오류 (500 Internal Server Error)
```json
{
  "error": "가치 측정 중 오류가 발생했습니다."
}
```
-----------------------------

### 환경 변수
```json
{
    "base_url": "http://localhost:3000",
    "uuid": "550e8400-e29b-41d4-a716-446655440000"
}
```
