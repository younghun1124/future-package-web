'use client'
import { useState } from 'react';
import CardList from './CardList';
import { Center } from '@chakra-ui/react';
import DoodleButton from '@/ui/buttons/DoodleButton';
import Image from 'next/image';

export default function FutureTarotEdit({ onSave }) {
    const [selectedCards, setSelectedCards] = useState([]);
    const [phase, setPhase] = useState('cardSelect');
    const [description, setDescription] = useState('');
    const receiver = new URLSearchParams(window.location.search).get('receiver');

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

    const handleSave = () => {
        if (selectedCards.length !== 3 || !description) return;
        onSave({
            cards: selectedCards,
            description: description
        });
    };

    const renderPhaseContent = () => {
        switch (phase) {
            case 'cardSelect':
                return (
                    <>
                        <p>인간들은 미래도 모르고 살았다며? 불편했겠네.. 살짝 힌트를 줄까?</p>
                        <p className="text-white">
                            먼저, 3장의 카드를 선택해. ({selectedCards.length}/3)
                        </p>
                        
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
                                onClick={() => setPhase('description')}
                                disabled={selectedCards.length !== 3}
                            >
                                다 골랐어요
                            </DoodleButton>
                        </div>
                    </>
                );

            case 'description':
                return (
                    <>
                        <div className="grid grid-cols-3 gap-4 items-center">
                            {selectedCards.map(card => (
                                <div
                                    key={card.id}
                                    className="relative aspect-[3/5] rounded-lg cursor-pointer"
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
                                className='rounded-md bg-[#666666] text-center p-4 w-full h-[90px] flex items-center justify-center' 
                                placeholder='해석을 입력해'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Center>
                        <div className="flex justify-center gap-4">
                            <DoodleButton
                                onClick={() => setPhase('cardSelect')}
                            >
                                다시 고를래요
                            </DoodleButton>
                            <DoodleButton
                                onClick={handleSave}
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
        <div className="flex flex-col text-white text-center gap-6">
            <h2 className="text-[27.5px] text-center">
                {receiver || '익명의 친구'}의 미래를 보여주는 카드
            </h2>
            {renderPhaseContent()}
        </div>
    );
}
