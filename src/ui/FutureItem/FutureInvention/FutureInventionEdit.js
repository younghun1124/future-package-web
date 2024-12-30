import { DialogHeader, DialogTitle } from '@chakra-ui/react';
import { FUTURE_INVENTION_TYPES } from '@/constants/futureItems';
import { useState } from 'react';

export default function FutureInventionEdit({ dataRef }) {    
    const [currentIndex, setCurrentIndex] = useState(0);
    const inventions = Object.values(FUTURE_INVENTION_TYPES);

    const handleSelect = (type) => {
        dataRef.current = {
            type: type
        };
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => {
            const newIndex = prev - 1;
            const invention = inventions[newIndex < 0 ? inventions.length - 1 : newIndex];
            handleSelect(invention);
            return newIndex < 0 ? inventions.length - 1 : newIndex;
        });
    };

    const handleNext = () => {
        setCurrentIndex((prev) => {
            const newIndex = prev + 1;
            const invention = inventions[newIndex >= inventions.length ? 0 : newIndex];
            handleSelect(invention);
            return newIndex >= inventions.length ? 0 : newIndex;
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center py-4 text-white">
                    미래 발명품
                </DialogTitle>
                <p className="text-white">
                    친구에게 선물할 미래 발명품을 선택해주세요!
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
                        src={inventions[currentIndex].imageUrl} 
                        alt={inventions[currentIndex].name}
                        className="w-48 h-48 object-contain mb-4"
                    />
                    <h3 className="text-xl font-bold text-white text-center">
                        {inventions[currentIndex].name}
                    </h3>
                    <p className="text-sm text-white/80 text-center mt-2">
                        {inventions[currentIndex].description}
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