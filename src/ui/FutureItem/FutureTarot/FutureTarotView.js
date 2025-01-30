'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import DoodleButton from '@/ui/buttons/DoodleButton';
import html2canvas from 'html2canvas';
import { TAROT_CARDS } from '@/constants/tarotCards';
// 임시 데이터


export default function FutureTarotView({ data, isReceiverView=false }) {
    console.log('Received data:', data);
    console.log('TAROT_CARDS:', TAROT_CARDS);
    
    const [flippedCards, setFlippedCards] = useState([]);
    const [showInterpretation, setShowInterpretation] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const captureRef = useRef(null);

    const handleCardClick = (cardIndex) => {
        if (!flippedCards.includes(cardIndex)) {
            setFlippedCards(prev => [...prev, cardIndex]);
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
        <>
            <div ref={captureRef} className="flex flex-col items-center gap-6 min-h-[100px] justify-between">
                <div className="grid grid-cols-3 gap-4 items-center">
                    {data.cardIndexes.map((cardIndex, i) => {
                        console.log(`Card index ${i}:`, cardIndex);
                        const card = TAROT_CARDS[cardIndex-1];
                        console.log(`Found card:`, card);
                        
                        if (!card) {
                            console.error(`Card not found for index ${cardIndex}`);
                            return null;
                        }

                        return (
                            <div
                                key={cardIndex}
                                onClick={() => handleCardClick(cardIndex)}
                                className="relative h-[140px] aspect-[2/3] cursor-pointer perspective-1000"
                            >
                                <div
                                    className={`
                                        relative w-full h-full
                                        transition-transform duration-1000
                                        transform-style-3d
                                        ${flippedCards.includes(cardIndex) ? 'rotate-y-180' : ''}
                                    `}
                                >
                                    {/* 카드 앞면 (뒷면 이미지) */}
                                    <div className="absolute w-full h-full backface-hidden">
                                        <Image
                                            src="https://storage.googleapis.com/future-box-cdn-public/futureitem/tarot/card_back_2x.webp"
                                            alt="카드 뒷면"
                                            fill
                                            className="object-cover rounded-lg"
                                        />
                                    </div>
                                    
                                    {/* 카드 뒷면 (실제 카드 이미지) */}
                                    {card && (
                                        <div className="absolute w-full h-full backface-hidden rotate-y-180">
                                            <Image
                                                src={card.imageUrl}
                                                alt={card.name}
                                                fill
                                                className="object-cover rounded-lg"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className=" flex flex-col items-center justify-center">
                    {showButton && !showInterpretation && (
                        <DoodleButton
                            variant="white"
                            onClick={() => setShowInterpretation(true)}
                        >
                            해석 볼래요
                        </DoodleButton>
                    )}
                </div>
                {showInterpretation &&  (
                    <div className="text-white text-center p-4 bg-[#666666] rounded-lg w-full">
                        {data.description}
                    </div>
                )}
            </div>
            {showInterpretation &&  (
                <>
                    {/* <DoodleButton 
                        variant="white"
                        onClick={handleSaveImage}
                        className="my-4 mb-3 mx-auto"
                    >
                        이미지 저장
                    </DoodleButton> */}
                </>
            )}
        </>
    );
}

