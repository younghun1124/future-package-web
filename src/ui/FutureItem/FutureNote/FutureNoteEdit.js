'use client'
import React, { useEffect, useRef } from 'react';
import DoodleButton from '@ui/buttons/DoodleButton';
import Image from 'next/image';
export default function FutureNoteEdit({dataRef,setIsOpen, setModalState}) {  

     
    return (
        <div className="flex flex-col gap-4">
            <div className="text-center">
                <h2 className="text-3xl text-white mb-2">쪽지</h2>
                <p className="text-white mb-4">미래에서 친구에게 전하고 싶은 메세지를 입력해보세요!</p>
            </div>
            <textarea
                className="w-full p-4 rounded-lg bg-white/10 text-white min-h-[200px]"
                placeholder="여기에 메모를 입력하세요..."
                onChange={(e) => {
                    dataRef.current = {
                        text: e.target.value
                    };
                }}
                defaultValue={dataRef.current?.text || ''}
                
            />
            <DoodleButton className='self-center' onClick={()=>{setModalState('view')}}>
            완료</DoodleButton>
            <Image 
                    src="https://storage.googleapis.com/future-box-cdn-public/futureitem/note/FutureNote_2x.webp" 
                    alt="Future Note Detail" 
                    width={330} 
                    height={330} 
                    priority={true}
                    className="mx-auto hidden" 
                />
        </div>
    );
}
