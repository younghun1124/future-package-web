import { DialogHeader, DialogTitle } from '@chakra-ui/react';
import { FUTURE_GIFTICON_TYPES } from '@/constants/futureItems';
import { useState } from 'react';

export default function FutureGifticonEdit({ dataRef }) {    
    const [currentIndex, setCurrentIndex] = useState(0);
    const gifticons = Object.values(FUTURE_GIFTICON_TYPES);

    const handleSelect = (type) => {
        dataRef.current = {
            type: type
        };
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => {
            const newIndex = prev - 1;
            const gifticon = gifticons[newIndex < 0 ? gifticons.length - 1 : newIndex];
            handleSelect(gifticon);
            return newIndex < 0 ? gifticons.length - 1 : newIndex;
        });
    };

    const handleNext = () => {
        setCurrentIndex((prev) => {
            const newIndex = prev + 1;
            const gifticon = gifticons[newIndex >= gifticons.length ? 0 : newIndex];
            handleSelect(gifticon);
            return newIndex >= gifticons.length ? 0 : newIndex;
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center py-4 text-white">
                    미래 기프티콘
                </DialogTitle>
                <p className="text-white">
                    2047년에 사용할 수 있는 기프티콘을 선택해주세요!
                </p>
            </DialogHeader>

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
        </div>
    );
} 