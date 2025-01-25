'use client'
import { useState, useEffect } from 'react';
import { DialogHeader, DialogTitle } from '@chakra-ui/react';
import DoodleButton from '@ui/buttons/DoodleButton';
import Image from 'next/image';

export default function FutureNoteEdit({ dataRef, setModalState }) {
    // dataRef.current 초기화 및 기본값 설정
    const [text, setText] = useState(dataRef.current?.text || '');
    const maxLength = 50;

    const handleTextChange = (e) => {
        const newText = e.target.value;
        if (newText.length <= maxLength) {
            setText(newText);
            // dataRef 업데이트
            dataRef.current = {
                ...dataRef.current,
                text: newText
            };
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <DialogTitle className="text-2xl text-center text-white">
                쪽지
            </DialogTitle>
            <p className="text-white text-center">
                과거의 친구에게 하고 싶은 말을 적어봐
            </p>

            <div className="w-full">
                <textarea
                    value={text}
                    onChange={handleTextChange}
                    className="w-full h-[200px] p-4 rounded-lg resize-none bg-white/10 text-white"
                    placeholder="여기에 입력하세요..."
                />
                <div className="text-right text-white/50 text-sm mt-1">
                    {text.length}/{maxLength}
                </div>
            </div>

            <DoodleButton 
                onClick={() => setModalState('insertPreview')}
                disabled={text.length === 0}
            >
                다 썼어요
            </DoodleButton>
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
