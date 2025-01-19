'use client'
import { useState } from 'react';
import CardList from './CardList';
import DoodleButton from '@/ui/buttons/DoodleButton';
import Image from 'next/image';
export default function FutureTarotEdit({ onSave }) {
    const [selectedCards, setSelectedCards] = useState([]);
    const [phase,setPhase]=useState('cardSelect')
    const handleCardSelect = (card) => {
        setSelectedCards(prev => {
            // 이미 선택된 카드인 경우 제거
            if (prev.some(c => c.id === card.id)) {
                return prev.filter(c => c.id !== card.id);
            }
            // 3장 이하일 때만 새 카드 추가
            if (prev.length < 3) {
                return [...prev, card];
            }
            return prev;
        });
    };
    const receiver = new URLSearchParams(window.location.search).get('receiver');
    const handleSave = () => {
        if (selectedCards.length !== 3) return;
        onSave({
            cards: selectedCards,
            description: selectedCards.map(card => card.description).join('\n')
        });
    };

    return (
        <div className="flex flex-col text-white text-center gap-6">
            <h2 className="text-[27.5px] text-center">
                {receiver}님의 미래를 보여주는 카드
            </h2>
            {phase==='cardSelect'?<>
                <p>인간들은 미래도 모르고 살았다며? 불편했겠네.. 살짝 힌트를 줄까?</p>
                <p className="text-white" >
                   먼저, 3장의 카드를 선택해. ({selectedCards.length}/3)               
                </p>
                
                
                <CardList 
                    selectedCards={selectedCards}
                    onCardSelect={handleCardSelect}
                />
                <div className='text-white text-center'>
                    {selectedCards.length===1 && <p> 시작이 좋아!</p>}
                    {selectedCards.length===2 && <p> 혹시 모를까봐 말하는데, 한장 더 선택해야 3장이야.</p>}
                    {selectedCards.length===3 && <p> 이걸 해내다니! 제법인걸.</p>}
                </div>
                {/* {selectedCards.length > 0 && (
                    <div className="text-white text-center p-4">
                        {selectedCards.map((card, index) => (
                            <p key={card.id} className="mb-2">
                                {index + 1}. {card.description}
                            </p>
                        ))}
                    </div>
                )} */}
                <div className="flex justify-center">
                <DoodleButton
                    onClick={()=>setPhase('description')}
                    disabled={selectedCards.length !== 3}
                >
                    다 골랐어요
                </DoodleButton>
                </div>
            </>:
            //해설 쓰기
            <>
                <div className="grid grid-cols-3 gap-4 items-center">
                    {selectedCards.map( card=> (
                        <div
                            key={card.id}
                            className={`
                                relative aspect-[3/5] rounded-lg cursor-pointer
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
                <div className="flex justify-center">
                    <DoodleButton
                        onClick={()=>setPhase('cardSelect')}
                    >
                        다시 고를래요
                    </DoodleButton>
                    </div>
            </>
            
            }
           
                

            
        </div>
    );
}
