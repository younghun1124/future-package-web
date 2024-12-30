import { useEffect, useRef, useState } from 'react';

export default function FutureLottoEdit({ item, dataRef }) {    
    const [selectedNumbers, setSelectedNumbers] = useState(dataRef.content?.numbers || []);    

    useEffect(() => {
        const loadSavedData = async () => {
            if (dataRef?.current) {
                setSelectedNumbers(dataRef.current.numbers || []);
            }
        };
        console.log("dataRef 불러옴");
        console.log(dataRef.content);
        loadSavedData();
    }, [item]);

    const handleDataChange = (i) => {
        setSelectedNumbers((prev) => {
            let updatedNumbers;
            if (prev.includes(i)) {
                // 숫자가 포함되어 있으면 제거
                updatedNumbers = prev.filter(n => n !== i);
            } else if (prev.length < 6) {
                // 숫자가 포함되어 있지 않고 6개 미만이면 추가
                updatedNumbers = [...prev, i].sort((a, b) => a - b);
            } else {
                updatedNumbers = prev; // 변경이 없는 경우
            }

            // `dataRef.current` 업데이트
            dataRef.current = {
                numbers: updatedNumbers,
            };
            console.log('dataRef updated:', dataRef.current);

            return updatedNumbers; // 상태 업데이트
        });
    };

    return (
        <div className="flex mt-9 flex-col gap-4">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">로또 (2352회)</h2>
                <p className="text-white mb-4">행운의 번호 6개를 선택해주세요</p>
            </div>

            <div className="grid grid-cols-7 gap-2">
                {[...Array(45)].map((_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => handleDataChange(i + 1)}
                        className={`
                            w-7 h-7 bg-[url('/lottocircle.svg')] bg-[length:100%_100%] bg-no-repeat bg-center flex items-center justify-center text-lg font-bold
                            ${selectedNumbers.includes(i + 1) 
                                ? ` bg-[url('/lottocircle_filled_white.svg')] text-black` 
                                : ' text-white'}
                            ${selectedNumbers.length >= 6 && !selectedNumbers.includes(i + 1) 
                                ? 'opacity-50 cursor-not-allowed' 
                                : ''}
                        `}
                        disabled={selectedNumbers.length >= 6 && !selectedNumbers.includes(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            <button
                onClick={() => {
                    dataRef.current = {
                        numbers: selectedNumbers,
                    };
                    console.log('최종 선택된 번호:', dataRef.current.numbers);
                }}
                disabled={selectedNumbers.length !== 6}
                className={`
                    w-full py-3 rounded-lg font-bold
                    ${selectedNumbers.length === 6 
                        ? 'bg-accent text-black hover:bg-accent' 
                        : 'bg-gray-500 text-white cursor-not-allowed'}
                `}
            >
                번호 선택 완료
            </button>
        </div>
    );
}
