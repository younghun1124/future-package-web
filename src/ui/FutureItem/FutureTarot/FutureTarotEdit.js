'use client'
import { useState, useEffect } from 'react';
import CardList from './CardList';
import { Center } from '@chakra-ui/react';
import DoodleButton from '@/ui/buttons/DoodleButton';
import Image from 'next/image';
import { TAROT_MESSAGES } from '@/constants/TAROT_MESSAGE';

export default function FutureTarotEdit({ onSave, receiver, handleInsertWithData }) {
    const [selectedCards, setSelectedCards] = useState([]);
    const [phase, setPhase] = useState('cardSelect');
    const [description, setDescription] = useState('');
    

    const handleCardSelect = (card) => {
        setSelectedCards(prev => {
            if (prev.some(c => c.id === card.id)) {
                return prev.filter(c => c.id !== card.id);
            }
            if (prev.length < 3) {
                return [...prev, card];
            }
            return prev;
        });
    };

    const handlePhaseChange = () => {
        if (selectedCards.length === 3) {
            // 카드의 numid를 오름차순으로 정렬하여 키 생성
            const messageKey = selectedCards
                .map(card => card.numid)
                .sort((a, b) => a - b)
                .join('-');
            
            // 해당하는 메시지가 있으면 설정
            if (TAROT_MESSAGES[messageKey]) {
                setDescription(TAROT_MESSAGES[messageKey]);
            }
            setPhase('description');
        }
    };

    const renderPhaseContent = () => {
        switch (phase) {
            case 'cardSelect':
                return (
                    <>
                        <div className="text-white flex flex-col items-center">
                            <p>인간들은 미래도 모르고 살았다며? 불편했겠네.. 살짝 힌트를 줄까?</p>
                            <p >
                                먼저, 3장의 카드를 선택해. ({selectedCards.length}/3)
                            </p>
                        </div>
                        
                        <CardList 
                            selectedCards={selectedCards}
                            onCardSelect={handleCardSelect}
                        />

                        <div className='text-white text-center'>
                            {selectedCards.length === 1 && <p>시작이 좋아!</p>}
                            {selectedCards.length === 2 && <p>혹시 모를까봐 말하는데, 한장 더 선택해야 3장이야.</p>}
                            {selectedCards.length === 3 && <p>이걸 해내다니! 제법인걸.</p>}
                        </div>

                        <div className="flex justify-center">
                            <DoodleButton
                                onClick={handlePhaseChange}
                                disabled={selectedCards.length !== 3}
                            >
                                다 골랐어요
                            </DoodleButton>
                        </div>
                    </>
                );

            case 'description':
                return (
                    <>  <p className='text-white text-center'>
                        {description === TAROT_MESSAGES[selectedCards.map(card => card.numid).sort((a, b) => a - b).join('-')] 
                            ? '이 카드들이 보여주는 미래의 해석.. 절대! 마음대로! 바꾸지! 마!'
                            : '흠.. 내가 알려준 해석을 바꿨네? 너의 해석이 더 맞을지도..'}
                        </p>
                        <div className="grid grid-cols-3 gap-4 items-center">
                            {selectedCards.map(card => (
                                <div
                                    key={card.id}
                                    className="relative aspect-[2/3] rounded-lg cursor-pointer"
                                >
                                    <Image
                                        src={card.imageUrl}
                                        alt={card.name}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                            ))}
                        </div>
                        
                        <Center>
                            <textarea 
                                className='rounded-md bg-[#666666] text-white text-center p-4 w-full h-[90px] flex items-center justify-center' 
                                placeholder='해석을 입력해'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Center>
                        <div className="flex justify-center gap-4">
                            <DoodleButton
                                variant='white'
                                width={145}
                                onClick={() => setPhase('cardSelect')}
                            >
                                다시 고를래요
                            </DoodleButton>
                            <DoodleButton
                                width={146}
                                height={61}
                                onClick={() => {
                                    if (description) {
                                        onSave({
                                            cards: selectedCards,
                                            description: description
                                        });
                                    }
                                }}
                                disabled={!description}
                            >
                                담을래요
                            </DoodleButton>
                        </div>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <>
            {renderPhaseContent()}
        </>
    );
}
