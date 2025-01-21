'use client'
import { useState } from 'react';
import CardList from './CardList';
import { Center } from '@chakra-ui/react';
import DoodleButton from '@/ui/buttons/DoodleButton';
import Image from 'next/image';

export default function FutureTarotEdit({ onSave ,data, receiver, handleInsertWithData}) {
    const [selectedCards, setSelectedCards] = useState(data.cards);
    const [description, setDescription] = useState('');
                return (
                    <>
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
                                value={data.description}
                                readOnly
                            />
                        </Center>                        
                    </>
                );


            }
