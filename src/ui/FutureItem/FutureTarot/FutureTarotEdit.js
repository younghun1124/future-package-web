'use client'
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
export default function FutureTarotEdit({dataRef}) {  
    // useEffect로 초기값 설정을 클라이언트 사이드로 이동
    const [isDiscriptionPage ,setIsDiscriptionPage] = useState(true)
    useEffect(() => {
        if (!dataRef.current) {
            dataRef.current = {
                text: ''
            };
        }
    }, []);
     
    return (
        <div className="flex mt-9 flex-col gap-4">
            <div className="text-center">
                <h2 className="text-3xl text-white mb-2">미래를 보여주는 카드</h2>
                <p className="text-white mb-4">인간들은 본인 미래도 모른다며? 재미없게...
                가볍게 오늘만 살짝 알려줘봐</p>
            </div>
            {!isDiscriptionPage&& <div className='grid grid-cols-4'>
                <Image 
                    src='https://storage.googleapis.com/future-box-cdn-public/futureitem/empty_card_2x.webp' 
                    alt="빈 카드 이미지" 
                    width={100} 
                    height={100} 
                />
                <Image 
                    src='https://storage.googleapis.com/future-box-cdn-public/futureitem/empty_card_2x.webp' 
                    alt="빈 카드 이미지" 
                    width={100} 
                    height={100} 
                />
                <Image 
                    src='https://storage.googleapis.com/future-box-cdn-public/futureitem/empty_card_2x.webp' 
                    alt="빈 카드 이미지" 
                    width={100} 
                    height={100} 
                />
                <Image 
                    src='https://storage.googleapis.com/future-box-cdn-public/futureitem/empty_card_2x.webp' 
                    alt="빈 카드 이미지" 
                    width={100} 
                    height={100} 
                />
                <Image 
                    src='https://storage.googleapis.com/future-box-cdn-public/futureitem/empty_card_2x.webp' 
                    alt="빈 카드 이미지" 
                    width={100} 
                    height={100} 
                />
                <Image 
                    src='https://storage.googleapis.com/future-box-cdn-public/futureitem/empty_card_2x.webp' 
                    alt="빈 카드 이미지" 
                    width={100} 
                    height={100} 
                />
                <Image 
                    src='https://storage.googleapis.com/future-box-cdn-public/futureitem/empty_card_2x.webp' 
                    alt="빈 카드 이미지" 
                    width={100} 
                    height={100} 
                />
                <Image 
                    src='https://storage.googleapis.com/future-box-cdn-public/futureitem/empty_card_2x.webp' 
                    alt="빈 카드 이미지" 
                    width={100} 
                    height={100} 
                />
            </div>
            }
            {isDiscriptionPage &&  
            <>
                <div className='flex'>
                     <Image 
                        src='https://storage.googleapis.com/future-box-cdn-public/futureitem/empty_card_2x.webp' 
                        alt="빈 카드 이미지" 
                        width={100} 
                        height={100} 
                    />
                    <Image 
                        src='https://storage.googleapis.com/future-box-cdn-public/futureitem/empty_card_2x.webp' 
                        alt="빈 카드 이미지" 
                        width={100} 
                        height={100} 
                    />
                    <Image 
                        src='https://storage.googleapis.com/future-box-cdn-public/futureitem/empty_card_2x.webp' 
                        alt="빈 카드 이미지" 
                        width={100} 
                        height={100} 
                    />
                </div>
                <textarea
                    className="w-full p-4 rounded-lg bg-white/10 text-white"
                    placeholder="해석을 입력해줘"
                    onChange={(e) => {
                        dataRef.current = {
                            text: e.target.value
                        };
                    }}
                    defaultValue={dataRef.current?.text || ''}
                    rows={3}
                />
            </>
            }
           <button onClick={()=>setIsDiscriptionPage(!isDiscriptionPage)}>페이지 전환</button>
        </div>
    );
}
