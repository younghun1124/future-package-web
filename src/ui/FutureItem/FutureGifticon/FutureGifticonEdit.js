'use client'
import { DialogHeader, DialogTitle } from '@chakra-ui/react';
import { FUTURE_GIFTICON_TYPES } from '@/constants/futureItems';
import { useState, useEffect } from 'react';
import DoodleButton from '@ui/buttons/DoodleButton';

export default function FutureGifticonEdit({ dataRef, setModalState }) {    
    const gifticons = Object.values(FUTURE_GIFTICON_TYPES);
    // 현재 선택된 기프티콘의 인덱스 찾기
    const initialIndex = gifticons.findIndex(
        gifticon => gifticon.id === dataRef?.current?.futureGifticonType
    );
    const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);

    // 초기 선택
    useEffect(() => {
        if (!dataRef.current?.futureGifticonType) {
            handleSelect(currentIndex);
        }
    }, []);
    
    const handleSelect = (idx) => {
        dataRef.current = {
            futureGifticonType: gifticons[idx].id
        };
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => {
            const newIndex = prev - 1;
            const finalIndex = newIndex < 0 ? gifticons.length - 1 : newIndex;
            handleSelect(finalIndex);
            return finalIndex;
        });
    };

    const handleNext = () => {
        setCurrentIndex((prev) => {
            const newIndex = prev + 1;
            const finalIndex = newIndex >= gifticons.length ? 0 : newIndex;
            handleSelect(finalIndex);
            return finalIndex;
        });
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <DialogTitle className="text-2xl text-center text-white">
                미래 기프트카드
            </DialogTitle>
            <p className="text-white">
                보내봤자 2047년은 되어야 쓸 수 있을거야. 약올리고 싶은거지?
            </p>

            <div className="relative w-full px-12">
                {/* 이전 버튼 */}
                <button 
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-white"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>

                {/* 현재 아이템 */}
                <div className="flex flex-col items-center">
                    <img 
                        src={gifticons[currentIndex].imageUrl} 
                        alt={gifticons[currentIndex].name}
                        className="w-48 h-48 object-contain mb-4"
                    />
                    <h3 className="text-xl font-bold text-white text-center">
                        {gifticons[currentIndex].name}
                    </h3>
                    <p className="text-sm text-white/80 text-center mt-2">
                        {gifticons[currentIndex].description}
                    </p>
                </div>

                {/* 다음 버튼 */}
                <button 
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-white"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
            <DoodleButton onClick={()=>setModalState('insertPreview')}>완료</DoodleButton>
        </div>
    );
} 