'use client'
import { Center, DialogHeader, DialogTitle } from '@chakra-ui/react';
import { useState } from 'react';
import DoodleButton from '@ui/buttons/DoodleButton';
import Perfume from './Perfume';

export default function FuturePerfumeEdit({ dataRef, setModalState }) {
    const [phase, setPhase] = useState(0);
    const [selectedCase, setSelectedCase] = useState(dataRef.current?.caseId || 1);
    const [selectedColor, setSelectedColor] = useState(dataRef.current?.colorId || 1);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

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
            setSelectedCase(Number(answer.charAt(0)));
        } else if (questions[phase].type === 'color') {
            setSelectedColor(Number(answer.charAt(0)));
        }
    };

    const handleNext = () => {
        if (phase < questions.length - 1) {
            // 현재 답변 저장하고 다음 질문으로
            dataRef.current = {
                ...dataRef.current,
                [`answer${phase + 1}`]: selectedAnswer
            };
            setPhase(prev => prev + 1);
            setSelectedAnswer(null);
        } else {
            // 마지막 답변 저장하고 preview로
            dataRef.current = {
                ...dataRef.current,
                [`answer${phase + 1}`]: selectedAnswer,
                caseId: selectedCase,
                colorId: selectedColor
            };
            setModalState('preview');
        }
    };

    const currentQuestion = questions[phase];

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <DialogHeader>
                <DialogTitle className="text-2xl text-center text-white">
                    향수
                </DialogTitle>
                <p className="text-white text-center text-sm mt-2">
                    친구에게 향수 하나 만들어볼까?<br/>
                    너가 알고있는 친구한테 어떤일이?
                </p>
            </DialogHeader>

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
                                ? 'bg-[#1DECAC] text-white' 
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
                disabled={!selectedAnswer}
            >
                {phase < questions.length - 1 ? '다음' : '완료'}
            </DoodleButton>
        </div>
    );
} 