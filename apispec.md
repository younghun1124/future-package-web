# Future Box API Documentation

## 이미지 업로드
```http
POST {{base_url}}/api/upload
Content-Type: multipart/form-data

form-data:
{
    "futureImage": "<file>",
    "type": "FutureHologram" // or "FutureFaceMirror"
}
```

### Response 200
```json
{
    "imageUrl": "https://storage.googleapis.com/bucket-name/path/to/image.jpg"
}
```

### Response 400
```json
{
    "error": "파일이 없습니다."
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
            "id": "FutureNote",
            "message": "미래에서 보내는 편지입니다."
        },
        {
            "id": "FutureLotto",
            "numbers": [1, 2, 3, 4, 5, 6]
        },
        {
            "id": "FutureHologram",
            "message": "홀로그램 메시지",
            "imageUrl": "https://storage.googleapis.com/bucket-name/holograms/image.jpg"
        },
        {
            "id": "FutureFaceMirror",
            "year": 2047,
            "imageUrl": "https://storage.googleapis.com/bucket-name/mirrors/image.jpg"
        },
        {
            "id": "FutureMovieTicket",
            "type": 1
        },
        {
            "id": "FutureGifticon",
            "type": 2
        },
        {
            "id": "FutureInvention",
            "type": 3
        }
    ]
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
    "box": {
        "uuid": "550e8400-e29b-41d4-a716-446655440000",
        "receiver": "미래",
        "sender": "현재",
        "futureMovieType": 1,
        "futureGifticonType": 2,
        "futureInventionType": 3,
        "createdAt": "2024-01-01T00:00:00Z"
    },
    "items": {
        "futureNotes": [
            {
                "id": 1,
                "boxId": 1,
                "message": "미래에서 보내는 편지입니다."
            }
        ],
        "futureLottos": [
            {
                "id": 1,
                "boxId": 1,
                "numbers": [1, 2, 3, 4, 5, 6]
            }
        ],
        "futureHolograms": [
            {
                "id": 1,
                "boxId": 1,
                "message": "홀로그램 메시지",
                "imageUrl": "https://storage.googleapis.com/bucket-name/holograms/image.jpg"
            }
        ],
        "futureFaceMirrors": [
            {
                "id": 1,
                "boxId": 1,
                "year": 2047,
                "imageUrl": "https://storage.googleapis.com/bucket-name/mirrors/image.jpg"
            }
        ]
    }
}
```

### Response 404
```json
{
    "error": "존재하지 않는 선물입니다."
}
```

### Environment Variables
```json
{
    "base_url": "http://localhost:3000",
    "uuid": "550e8400-e29b-41d4-a716-446655440000"
}
```
