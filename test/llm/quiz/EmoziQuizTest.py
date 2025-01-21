import os
import google.generativeai as genai
from dotenv import load_dotenv

# 환경 변수 로드
load_dotenv()

# API 키 설정
genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))
model = genai.GenerativeModel('gemini-1.5-flash-latest')

def create_emoji_quiz(text):
    # AI 프롬프트 작성
    prompt = f"""
    당신은 이모지 퀴즈 생성기입니다.
    사용자가 입력한 단어나 문구를 이모지로 변환해주세요.
    
    규칙:
    1. 입력된 텍스트: "{text}"
    2. 각 글자를 가장 적절한 이모지로 변환
    3. 직관적이고 추측 가능한 이모지 사용
    4. 이모지만 출력 (다른 설명 없이)
    5. 최대 8개 이모지까지만 사용
    
    예시:
    입력: "사과나무"
    출력: 🍎🌳
    """
    
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"에러 발생: {e}")
        return None

def main():
    while True:
        text = input("퀴즈로 만들 단어를 입력하세요 (8글자 이내, 종료는 q): ")
        
        if text.lower() == 'q':
            break
            
        if len(text) > 8:
            print("8글자를 초과했습니다. 다시 입력해주세요.")
            continue
            
        emoji_quiz = create_emoji_quiz(text)
        if emoji_quiz:
            print(f"\n이모지 퀴즈: {emoji_quiz}")
            
            answer = input("\n정답을 맞춰보세요: ")
            if answer == text:
                print("정답입니다! 🎉")
            else:
                print(f"틀렸습니다. 정답은 '{text}'입니다.")

if __name__ == "__main__":
    main()
