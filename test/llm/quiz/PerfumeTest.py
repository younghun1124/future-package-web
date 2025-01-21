import os
import google.generativeai as genai
from dotenv import load_dotenv

# 환경 변수 로드
load_dotenv()

# API 키 설정
genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))
model = genai.GenerativeModel('gemini-1.5-flash-latest')

def create_perfume_description(keywords):
    if not keywords or len(keywords) != 3:
        raise ValueError("정확히 3개의 키워드가 필요합니다.")
        
    # AI 프롬프트 작성
    prompt = f"""
    당신은 2047년 외계인 향수 조향사로서, 과거에 있는 고객의 친구에게 향수를 만들어주는 역할을 합니다.
    주어진 3개의 키워드를 바탕으로 하나의 향수를 표현하는 문장을 만들어주세요.
    사용자는 2025년 ~ 2047년 미래에 친구와 함께하고 싶은 경험에 대한 질문에 키워드 3개를 선택했습니다.

    질문:
    1. 친구와 함께 만들어가고 있는 것은?
    2. 그런 친구와 미래에는 어떤 일을?
    3. 그 과정에서 우리가 느낀 감정은?
    
    규칙:
    1. 입력된 키워드: "{keywords[0]}", "{keywords[1]}", "{keywords[2]}"
    2. 키워드들을 연결해 하나의 향수 향을 표현
    3. 감각적이고 시적인 표현 사용
    4. 한 문장으로만 표현 (30자 이내)
    5. 다른 설명 없이 문장만 출력
    
    예시:
    입력: ["열정", "목표 성취", "자부심"]
    출력: 별을 향해 불타는 자부심의 향기
    """
    
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"에러 발생: {e}")
        return None

def main():
    test_cases = [
        ["열정", "목표 성취", "자부심"],
        ["신뢰", "사업", "설공"],
        ["힐링", "친구와 함께", "평온"],
        ["성장", "새로운 도전", "행복"]
    ]
    
    print("향수 설명 생성 테스트 시작\n")
    
    for keywords in test_cases:
        print(f"테스트 키워드: {', '.join(keywords)}")
        description = create_perfume_description(keywords)
        
        if description:
            print(f"생성된 설명: {description}")
            print("테스트 성공!")
        else:
            print("테스트 실패: 설명을 생성하지 못했습니다.")
        print("-" * 50)

if __name__ == "__main__":
    main() 