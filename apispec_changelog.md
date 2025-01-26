# 기존 스펙
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

# 변경 스펙
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
        {
            "type": "FutureGifticon",
            "futureGifticonType": 1
        },
        {
            "type": "FutureValueMeter"
        }
    ]
}

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
        },
        {
            "type": "FutureGifticon",
            "futureGifticonType": 1
        },
        {
            "type": "FutureValueMeter"
        }
    ]
}