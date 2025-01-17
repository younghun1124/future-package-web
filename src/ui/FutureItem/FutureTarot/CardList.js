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
                        relative rounded-md aspect-[2/3] cursor-pointer
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
                        src='https://storage.googleapis.com/future-box-cdn-public/futureitem/tarot/card_empty_2x.webp'
                        alt={card.name}
                        fill
                        className="object-cover rounded-lg"
                    />
                    {/* <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 rounded-b-lg">
                        <p className="text-white text-center text-sm">{card.name}</p>
                    </div> */}
                </div>
            ))}
        </div>
    );
}