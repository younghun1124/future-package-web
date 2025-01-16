'use client';
import { TAROT_CARDS } from '@/constants/tarotCards';
import Image from 'next/image';

export default function CardList({ selectedCard, onCardSelect }) {
    return (
        <div className="grid grid-cols-4 gap-4">
            {TAROT_CARDS.map((card) => (
                <div
                    key={card.id}
                    onClick={() => onCardSelect(card)}
                    className={`
                        relative aspect-[3/5] rounded-lg cursor-pointer
                        transition-all duration-200 ease-in-out
                        ${selectedCard?.id === card.id 
                            ? 'ring-4 ring-accent scale-105' 
                            : ''
                        }
                    `}
                >
                    <Image
                        src='https://storage.googleapis.com/future-box-cdn-public/futureitem/empty_card_2x.webp'
                        alt={card.name}
                        fill
                        className="object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 rounded-b-lg">
                        <p className="text-white text-center text-sm">{card.name}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}