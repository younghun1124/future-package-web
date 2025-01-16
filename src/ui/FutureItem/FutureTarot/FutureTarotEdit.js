'use client'
import { useState } from 'react';
import CardList from './CardList';
import DoodleButton from '@/ui/buttons/DoodleButton';

export default function FutureTarotEdit({ onSave }) {
    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardSelect = (card) => {
        setSelectedCard(card);
    };

    const handleSave = () => {
        if (!selectedCard) return;
        onSave({
            cardId: selectedCard.id,
            description: selectedCard.description,
            imageUrl: selectedCard.imageUrl
        });
    };

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-[27.5px] text-white text-center">
                미래를 보여주는 카드
            </h2>
            
            <CardList 
                selectedCard={selectedCard}
                onCardSelect={handleCardSelect}
            />

            {selectedCard && (
                <div className="text-white text-center p-4">
                    {selectedCard.description}
                </div>
            )}

            <div className="flex justify-center">
                <DoodleButton
                    onClick={handleSave}
                    disabled={!selectedCard}
                >
                    선택 완료
                </DoodleButton>
            </div>
        </div>
    );
}
