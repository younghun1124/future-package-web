'use client'
import { Center, DialogHeader, DialogTitle } from '@chakra-ui/react';
import { useState } from 'react';
import DoodleButton from '@ui/buttons/DoodleButton';
import Perfume from './Perfume';

export default function FuturePerfumeEdit({ dataRef, setModalState }) {
    const [phase, setPhase] = useState(0);
    const [selectedCase, setSelectedCase] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const questions = [
        {
            question: "친구와 함께 만들어가고 있는건",
            options: ['열정', '신뢰', '재미', '다 아니야!'],
            type: 'case'
        },
        {
            question: "그런 친구와 미래에는 어떤일을",
            options: ['목표 성취', '새로운 도전', '위기 극복', '다 아니야!'],
            type: 'answer'
        },
        {
            question: "그 과정에서 우리가 느낀 감정은",
            options: ['감동', '설렘', '평온', '다 아니야!'],
            type: 'color'
        }
    ];

    const handleSelect = (answer) => {
        setSelectedAnswer(answer);
        if (questions[phase].type === 'case') {
            const caseMapping = {
                '열정': 1,
                '신뢰': 2,
                '재미': 3,
                '다 아니야!': Math.floor(Math.random() * 3) + 1
            };
            setSelectedCase(caseMapping[answer]);
        } else if (questions[phase].type === 'color') {
            const colorMapping = {
                '감동': 1,
                '설렘': 3,
                '평온': 5,
                '다 아니야!': Math.floor(Math.random() * 6) + 1
            };
            setSelectedColor(colorMapping[answer]);
        }
    };

    const handleNext = async () => {
        if (phase < questions.length - 1) {
            // 현재 답변 저장하고 다음 질문으로
            dataRef.current = {
                ...dataRef.current,
                [`answer${phase + 1}`]: selectedAnswer
            };
            setPhase(prev => prev + 1);
            setSelectedAnswer(null);
        } else {
            setIsLoading(true); // 로딩 시작
            
            // 마지막 답변 저장
            dataRef.current = {
                ...dataRef.current,
                [`answer${phase + 1}`]: selectedAnswer,
                caseId: selectedCase,
                colorId: selectedColor
            };

            try {
                // 향수 설명 생성 API 호출
                const response = await fetch('/api/perfume', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        keywords: [
                            dataRef.current.answer1,
                            dataRef.current.answer2,
                            dataRef.current.answer3
                        ]
                    })
                });

                if (!response.ok) {
                    throw new Error('향수 설명 생성에 실패했습니다.');
                }

                const data = await response.json();
                
                if (data.success) {
                    // API 응답 데이터를 dataRef에 저장
                    dataRef.current = {
                        ...dataRef.current,
                        // name: data.name,
                        description: data.description
                    };
                } else {
                    throw new Error(data.error || '향수 설명 생성에 실패했습니다.');
                }
            } catch (error) {
                console.error('향수 설명 생성 중 오류:', error);
                dataRef.current = {
                    ...dataRef.current,
                    name: "미래의 향수",
                    description: "미래에서 온 신비로운 향기"
                };
            } finally {
                setIsLoading(false); // 로딩 종료
                setModalState('preview');
            }
        }
    };

    const currentQuestion = questions[phase];

    return (
        <div className="flex flex-col items-center gap-4 p-4">
          
                <DialogTitle className="text-2xl text-center text-white">
                    향수
                </DialogTitle>
                <p className="text-white text-center text-sm mt-2">
                    과거로 보내고 싶은 미래의 기억, 향수로 만들어 줄게
                </p>
           

            <div className="bg-[#A3A3A3] w-full text-lg p-4 rounded-lg text-center my-4">
                Q. {currentQuestion.question}
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
                {currentQuestion.options.map((answer) => (
                    <button 
                        key={answer}
                        onClick={() => handleSelect(answer)}
                        className={`rounded-lg py-2 px-4 text-black transition-colors
                            ${selectedAnswer === answer 
                                ? 'bg-[#1DECAC]' 
                                : 'bg-white hover:bg-gray-100'}`}
                    >
                        {answer}
                    </button>
                ))}
            </div>

            <div className="mt-4">
                <Perfume 
                    size={140} 
                    caseId={selectedCase} 
                    colorId={selectedColor}
                    phase={phase}
                />
            </div>

            <DoodleButton 
                className="mt-4" 
                onClick={handleNext}
                disabled={!selectedAnswer || isLoading}
            >
                {phase < questions.length - 1 ? '다음' : (isLoading ? '조향 중...' : '완료')}
            </DoodleButton>
        </div>
    );
} 