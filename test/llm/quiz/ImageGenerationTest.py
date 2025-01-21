import os
import pathlib
import google.generativeai as genai
from PIL import Image
from dotenv import load_dotenv
import base64
import io

# 환경 변수 로드
load_dotenv()

# API 키 설정
genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))

def test_gemini_image_generation():
    try:
        # 모델 초기화 (이미지 생성 모델)
        model = genai.GenerativeModel('gemini-1.5-flash-latest')
        
        # 이미지를 생성할 프롬프트
        prompt = """
        다음 설명에 맞는 이미지를 생성해주세요:
        귀여운 우주선이 밤하늘을 날아가는 모습
        스타일: 심플한 일러스트레이션n
        색상: 파스텔톤
        """
        
        # 이미지 생성 요청
        response = model.generate_content(prompt)
        
        # 응답에서 이미지 데이터 추출 시도
        if hasattr(response, 'candidates') and len(response.candidates) > 0:
            for candidate in response.candidates:
                if hasattr(candidate, 'image') and candidate.image:
                    # 이미지 데이터를 바이트로 변환
                    image_data = base64.b64decode(candidate.image)
                    image = Image.open(io.BytesIO(image_data))
                    
                    # public 폴더에 저장
                    save_path = pathlib.Path(__file__).parent.parent.parent / 'public' / 'generated_image.png'
                    image.save(save_path, 'PNG')
                    
                    print(f"이미지가 성공적으로 생성되어 {save_path}에 저장되었습니다!")
                    return True
        
        print("이미지 생성에 실패했습니다. 제미나이가 이미지 생성을 지원하지 않을 수 있습니다.")
        return False
        
    except Exception as e:
        print(f"테스트 실패: {str(e)}")
        return False

if __name__ == "__main__":
    test_gemini_image_generation()