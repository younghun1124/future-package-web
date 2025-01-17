'use client'
import { useState } from 'react';
import CardList from './CardList';
import DoodleButton from '@/ui/buttons/DoodleButton';
import Image from 'next/image';
import { Center } from '@chakra-ui/react';
import useItemStore from '@/store/useItemStore';

export default function FutureTarotEdit() {
    const [selectedCards, setSelectedCards] = useState([]);
    const [phase, setPhase] = useState('cardSelect');
    const [description, setDescription] = useState('');
    const { insertItem, setModalOpen } = useItemStore();
    
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
        insertItem({
            type: 'FutureTarot',
            name: '타로카드'
        }, {
            cards: selectedCards,
            description: description
        });
        setModalOpen(false);
    };

    return (
        <div className="flex flex-col text-white text-center gap-6">
            <h2 className="text-[27.5px] text-center">
                {receiver}님의 미래를 보여주는 카드
            </h2>
            {phase === 'cardSelect' ? (
                <>
                    <p>인간들은 미래도 모르고 살았다며?...이제 살짝 힌트를 줄까?</p>
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
            ) : (
                <>
                    <p>카드만 봐서는 이해를 못하겠지. 친절한 너가 설명해 줘</p>
                    <div className="grid grid-cols-3 gap-4 items-center">
                        {selectedCards.map(card => (
                            <div
                                key={card.id}
                                className="relative aspect-[2/3] rounded-lg cursor-pointer"
                            >
                                <Image
                                    src='https://storage.googleapis.com/future-box-cdn-public/futureitem/empty_card_2x.webp'
                                    alt={card.name}
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                    <Center>
                        <textarea 
                            placeholder='"별과 바람이 흐르는 곳으로.."'
                            className="w-[301px] h-[91px] bg-[#666666] rounded-md text-center centered-textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Center>
                    <div className="flex justify-center gap-4">
                        <DoodleButton
                            variant='white'
                            width={130}
                            onClick={() => {
                                setPhase('cardSelect');
                                setDescription('');
                            }}
                        >
                            다시 고를래요
                        </DoodleButton>
                        <DoodleButton
                            width={130}
                            onClick={handleSave}
                            disabled={!description}
                        >
                            담을래요
                        </DoodleButton>
                    </div>
                </>
            )}
        </div>
    );
}
