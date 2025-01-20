import os
import pathlib
import google.generativeai as genai
from PIL import Image
from dotenv import load_dotenv

# 환경 변수 로드
load_dotenv()

# API 키 설정
genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))

def test_gemini_image():
    try:
        # 모델 초기화 (이미지를 지원하는 모델 사용)
        model = genai.GenerativeModel('gemini-1.5-flash-latest')
        
        # 현재 디렉토리의 상위 public 폴더에서 이미지 로드
        image_path = pathlib.Path(__file__).parent.parent / 'public' / 'ufo.png'
        
        # 이미지 열기
        image = Image.open(image_path)
        
        # 프롬프트 작성
        prompt = """
        이 이미지에 대해 설명해주세요.
        다음 형식으로 답변해주세요:
        1. 이미지의 주요 객체
        2. 이미지의 스타일 (예: 일러스트, 사진 등)
        3. 주요 색상
        """
        
        # 이미지와 함께 프롬프트 전송
        response = model.generate_content([prompt, image])
        
        print("테스트 성공!")
        print("\n응답 내용:")
        print(response.text)
        
    except Exception as e:
        print(f"테스트 실패: {str(e)}")

if __name__ == "__main__":
    test_gemini_image()