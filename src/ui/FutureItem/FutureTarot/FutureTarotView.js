'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import DoodleButton from '@/ui/buttons/DoodleButton';
import html2canvas from 'html2canvas';

// 임시 데이터
const TEMP_DATA = {
    cards: [
        {
            id: 'sword',
            name: '칼',
            description: '운명의 칼이 당신의 미래를 가르키고 있습니다',
            imageUrl: 'https://storage.googleapis.com/future-box-cdn-public/futureitem/tarot/card_angel_2x.webp'
        },
        {
            id: 'storm',
            name: '폭풍',
            description: '격변의 폭풍이 당신의 미래를 휘감고 있습니다',
            imageUrl: 'https://storage.googleapis.com/future-box-cdn-public/futureitem/tarot/card_storm_1x.webp'
        },
        {
            id: 'key',
            name: '열쇠',
            description: '미래의 문을 여는 열쇠가 당신을 기다립니다',
            imageUrl: 'https://storage.googleapis.com/future-box-cdn-public/futureitem/tarot/card_key_1x.webp'
        }
    ],
    description: '당신의 미래에는 큰 변화가 찾아올 것입니다. 하지만 두려워하지 마세요. 그 변화는 당신을 더 나은 곳으로 이끌어줄 것입니다.'
};

export default function FutureTarotView({ data = TEMP_DATA, isReceiverView=false }) {
    const [flippedCards, setFlippedCards] = useState([]);
    const [showInterpretation, setShowInterpretation] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const captureRef = useRef(null);

    const handleCardClick = (cardId) => {
        if (!flippedCards.includes(cardId)) {
            setFlippedCards(prev => [...prev, cardId]);
        }
    };

    // 마지막 카드가 뒤집힌 후 버튼 표시
    useEffect(() => {
        if (flippedCards.length === 3) {
            // 애니메이션 시간(1000ms) 후에 버튼 표시
            const timer = setTimeout(() => {
                setShowButton(true);
            }, 700);
            
            return () => clearTimeout(timer);
        } else {
            setShowButton(false);
        }
    }, [flippedCards]);

    const handleSaveImage = async () => {
        if (!captureRef.current) return;
        try {
            const canvas = await html2canvas(captureRef.current, {
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#585858',
                scale: 2,
                logging: true,
                imageTimeout: 0,
                onclone: (document) => {
                    // 클론된 요소에서 이미지 로딩 완료 대기
                    const images = document.getElementsByTagName('img');
                    return Promise.all(Array.from(images).map(img => {
                        if (img.complete) {
                            return Promise.resolve();
                        }
                        return new Promise((resolve) => {
                            img.onload = resolve;
                            img.onerror = resolve;
                        });
                    }));
                }
            });
            
            const image = canvas.toDataURL('image/png', 1.0);
            const link = document.createElement('a');
            link.href = image;
            link.download = 'tarot-reading.png';
            link.click();
        } catch (error) {
            console.error('이미지 저장 중 오류:', error);
        }
    };

    return (
        <div ref={captureRef} className="flex flex-col items-center gap-6 min-h-[300px] justify-between">
            <div className="grid grid-cols-3 gap-4 items-center">
                {data.cards.map((card, index) => (
                    <div
                        key={card.id}
                        onClick={() => handleCardClick(card.id)}
                        className="relative h-[140px] aspect-[2/3] cursor-pointer perspective-1000"
                    >
                        <div
                            className={`
                                relative w-full h-full
                                transition-transform duration-1000
                                transform-style-3d
                                ${flippedCards.includes(card.id) ? 'rotate-y-180' : ''}
                            `}
                        >
                            {/* 카드 앞면 (뒷면 이미지) */}
                            <div
                                className="absolute w-full h-full backface-hidden"
                            >
                                <Image
                                    src="https://storage.googleapis.com/future-box-cdn-public/futureitem/tarot/card_back_2x.webp"
                                    alt="카드 뒷면"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                            
                            {/* 카드 뒷면 (실제 카드 이미지) */}
                            <div
                                className="absolute w-full h-full backface-hidden rotate-y-180"
                            >
                                <Image
                                    src={card.imageUrl}
                                    alt={card.name}
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 버튼과 해석을 위한 고정된 공간 */}
            <div className="h-[150px] flex flex-col items-center justify-center">
                {showButton && !showInterpretation && (
                    <DoodleButton
                        variant="white"
                        onClick={() => setShowInterpretation(true)}
                    >
                        해석 볼래요
                    </DoodleButton>
                )}

                {showInterpretation &&  (
                    <>
                        <div className="text-white text-center p-4 bg-[#666666] rounded-lg w-full">
                            {data.description}
                        </div>
                        
                    </>
                )}
                {
                    isReceiverView &&<DoodleButton 
                            onClick={handleSaveImage}
                            className="my-4 mb-3"
                        >
                            이미지 저장
                        </DoodleButton>
                }
            </div>
        </div>
    );
}

