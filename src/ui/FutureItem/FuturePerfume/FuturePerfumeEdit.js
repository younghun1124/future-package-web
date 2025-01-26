'use client'
import { Center, DialogHeader, DialogTitle } from '@chakra-ui/react';
import { useState } from 'react';
import DoodleButton from '@ui/buttons/DoodleButton';
import Perfume from './Perfume';

export default function FuturePerfumeEdit({ dataRef, setModalState }) {
    const [phase, setPhase] = useState(0);
    const [shape, setShape] = useState(null);
    const [color, setColor] = useState(null);
    const [outline_type, set_outline_type] = useState(null);
    const [keywords, setKeywords] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [customAnswer, setCustomAnswer] = useState('');

    const questions = [
        {
            question: "친구와 나의 사이를 표현하는 건",
            options: ['열정', '신뢰', '재미', '다 아니야!'],
            type: 'shape'
        },
        {
            question: "그런 친구와 미래에는 어떤일을",
            options: ['목표 성취', '새로운 도전', '위기 극복', '다 아니야!'],
            type: 'color'
        },
        {
            question: "그 과정에서 우리가 느낀 감정은",
            options: ['감동', '설렘', '평온', '다 아니야!'],
            type: 'outline_type'
        }
    ];

    const handleSelect = (answer) => {
        if (answer === '다 아니야!') {
            setShowCustomInput(true);
            return;
        }

        setSelectedAnswer(answer);

        if (questions[phase].type === 'shape') {
            const shapeMapping = {
                '열정': 1,
                '신뢰': 2,
                '재미': 3
            };
            setShape(shapeMapping[answer] || Math.floor(Math.random() * 3) + 1);
        } else if (questions[phase].type === 'color') {
            const colorMapping = {
                '목표 성취': 1,
                '새로운 도전': 3,
                '위기 극복': 5
            };
            setColor(colorMapping[answer] || Math.floor(Math.random() * 6) + 1);
        } else if (questions[phase].type === 'outline_type') {
            const outline_typeMapping = {
                '감동': 1,
                '설렘': 3,
                '평온': 5
            };
            set_outline_type(outline_typeMapping[answer] || Math.floor(Math.random() * 6) + 1);
        }
    };

    const handleCustomSubmit = () => {
        if (customAnswer.trim()) {
            setSelectedAnswer(customAnswer);
            if (questions[phase].type === 'shape') {
                setShape(Math.floor(Math.random() * 3) + 1);
            } else if (questions[phase].type === 'color') {
                setColor(Math.floor(Math.random() * 6) + 1);
            } else if (questions[phase].type === 'outline_type') {
                set_outline_type(Math.floor(Math.random() * 6) + 1);
            }
            setShowCustomInput(false);
            setCustomAnswer('');
        }
    };

    const handleNext = async () => {
        if (phase < questions.length - 1) {
            setKeywords(prev => [...prev, selectedAnswer]);
            setPhase(prev => prev + 1);
            setSelectedAnswer(null);
        } else {
            setIsLoading(true);
            const finalKeywords = [...keywords, selectedAnswer];
            
            dataRef.current = {
                ...dataRef.current,
                keywords: finalKeywords,
                shape,
                color,
                outline_type,
            };

            try {
                const response = await fetch('/api/perfume', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        keywords: finalKeywords
                    })
                });

                if (!response.ok) {
                    throw new Error('향수 설명 생성에 실패했습니다.');
                }

                const data = await response.json();
                if (data.success) {
                    dataRef.current = {
                        ...dataRef.current,
                        name: data.name,
                        description: data.description
                    };
                }
            } catch (error) {
                console.error('향수 설명 생성 중 오류:', error);
                dataRef.current = {
                    ...dataRef.current,
                    name: "미래의 향수",
                    description: "미래에서 온 신비로운 향기"
                };
            } finally {
                setIsLoading(false);
                setModalState('insertPreview');
            }
        }
    };

    const getCustomInputGuide = () => {
        switch (questions[phase].type) {
            case 'shape':
                return '친구와 나의 사이를 표현하는 것을 자유롭게 적어봐';
            case 'color':
                return '친구와 미래에 하고 있는 일을 자유롭게 적어봐';
            case 'outline_type':
                return '그 과정에서 느낀 감정을 자유롭게 적어봐';
            default:
                return '자유롭게 적어주세요';
        }
    };

    if (showCustomInput) {
        return (
            <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
                <div className="bg-[#1A1A1A] p-6 rounded-lg w-[90%] max-w-md">
                    <h2 className="text-white text-xl mb-4">향수</h2>
                    <p className="text-white/70 text-sm mb-6">
                        {getCustomInputGuide()}
                    </p>
                    <input
                        type="text"
                        value={customAnswer}
                        onChange={(e) => setCustomAnswer(e.target.value)}
                        maxLength={10}
                        className="w-full bg-white/10 text-white p-3 rounded-lg mb-2"
                        placeholder="여기에 입력하세요"
                    />
                    <div className="text-right text-white/50 text-sm mb-4">
                        {customAnswer.length}/10
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setShowCustomInput(false)}
                            className="px-4 py-2 text-white/70"
                        >
                            취소
                        </button>
                        <DoodleButton
                            onClick={handleCustomSubmit}
                            disabled={!customAnswer.trim()}
                        >
                            다 적었어요
                        </DoodleButton>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <DialogTitle className="text-2xl text-center text-white">
                향수
            </DialogTitle>
            <p className="text-white text-center text-sm mt-2">
                과거로 보내고 싶은 미래의 기억, 향수로 만들어 줄게
            </p>

            <div className="bg-[#A3A3A3] w-full text-lg p-4 rounded-lg text-center my-4">
                Q. {questions[phase].question}
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
                {questions[phase].options.map((answer) => {
                    if (answer === '다 아니야!' && selectedAnswer && !questions[phase].options.includes(selectedAnswer)) {
                        return (
                            <button 
                                key={answer}
                                onClick={() => setShowCustomInput(true)}
                                className={`rounded-lg py-2 px-4 text-black transition-colors
                                    ${selectedAnswer ? 'bg-[#1DECAC]' : 'bg-white hover:bg-gray-100'}`}
                            >
                                {selectedAnswer}
                            </button>
                        );
                    }
                    
                    return (
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
                    );
                })}
            </div>

            <div className="mt-4">
                <Perfume 
                    size={140} 
                    caseId={shape} 
                    colorId={color}
                    phase={phase}
                    outline_type={outline_type}
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