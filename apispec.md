# Future Box API 명세서

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
POST {{base_url}}/api/items
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
                "shape": 1
                "color": "#FFFFFF"
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
GET {{base_url}}/api/items/{{uuid}}
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
                "imageUrl": "https://storage.googleapis.com/bucket-name/uploads/1234567890-hologram.jpg"
            }
        },
        {
            "type": "FutureFaceMirror",
            "content": {
                "year": 2047,
                "imageUrl": "https://storage.googleapis.com/bucket-name/mirrors/1234567890-face.svg"
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
                "color": "#FFFFFF"
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

### 환경 변수
```json
{
    "base_url": "http://localhost:3000",
    "uuid": "550e8400-e29b-41d4-a716-446655440000"
}
```
