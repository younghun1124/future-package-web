'use client';
import { TAROT_CARDS } from '@/constants/tarotCards';
import Image from 'next/image';

export default function CardList({ selectedCards, onCardSelect }) {
    return (
        <div className="grid grid-cols-4 gap-4">
            {TAROT_CARDS.map((card) => (
                <div
                    key={card.id}
                    onClick={() => onCardSelect(card)}
                    className={`
                        relative aspect-[2/3] rounded-md cursor-pointer
                        transition-all duration-200 ease-in-out border-accent
                        ${selectedCards.some(c => c.id === card.id)
                            ? 'scale-105 border-2' 
                            : ''
                        }
                        ${selectedCards.length >= 3 && !selectedCards.some(c => c.id === card.id)
                            ? 'opacity-50 cursor-not-allowed'
                            : ''
                        }
                    `}
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
    );
}