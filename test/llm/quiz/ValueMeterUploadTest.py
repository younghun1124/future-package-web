import os
import pathlib
import google.generativeai as genai
from PIL import Image
from dotenv import load_dotenv

# 환경 변수 로드
load_dotenv()

# API 키 설정
genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))

def test_value_meter():
    try:
        # 모델 초기화 (이미지를 지원하는 모델 사용)
        model = genai.GenerativeModel('gemini-1.5-flash-latest')
        
        # 현재 디렉토리의 상위 public 폴더에서 테스트 이미지 로드
        image_path = pathlib.Path(__file__).parent.parent / 'public' / 'test_item.webp'
        
        # 이미지 열기
        image = Image.open(image_path)
        
        # 프롬프트 작성
        prompt = """
        당신은 미래의 가치를 예측하는 AI입니다.
        이 이미지의 아이템에 대해 2025년부터 2047년 사이의 4개 시점에서의 스토리와 가치를 예측해주세요.

        규칙:
        1. 각 시점은 최소 3년 이상의 간격을 두어야 합니다.
        2. 각 시점의 스토리는 반드시 한 문장(30자 이내)으로만 작성해주세요.
        3. 스토리는 해당 시점에서 이 아이템이 어떻게 사용되고 있는지를 간단히 설명해야 합니다.
        4. 가격은 스토리의 맥락과 자연스럽게 연결되어야 합니다.
        5. 다음 JSON 형식으로 출력해주세요:

        {
          "predictions": [
            {
              "year": 2025,
              "story": "첫 번째 시점의 스토리",
              "value": 150000
            },
            {
              "year": 2032,
              "story": "두 번째 시점의 스토리",
              "value": 280000
            }
            ...
          ]
        }
        """
        
        # 이미지와 함께 프롬프트 전송
        response = model.generate_content([prompt, image])
        
        print("\n=== 미래 가치 측정 테스트 결과 ===")
        print("\n예측된 가치:")
        
        # JSON 응답 파싱 및 출력
        predictions = response.text
        print(predictions)
        
        print("\n테스트 성공!")
        return True
        
    except Exception as e:
        print(f"\n테스트 실패: {str(e)}")
        return False

if __name__ == "__main__":
    test_value_meter()