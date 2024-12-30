import { useEffect, useRef, useState } from 'react';

export default function FutureLottoInput({ item, dataRef }) {    
    const [selectedNumbers, setSelectedNumbers] = useState(item?.content?.numbers || []);    

    useEffect(() => {
        const loadSavedData = async () => {
            if (item?.content?.numbers) {
                setSelectedNumbers(item.content.numbers);
            }
        };
        
        loadSavedData();
    }, [item]);
    
    const handleDataChange = async () => {
        try {
            dataRef.current = {
                numbers: selectedNumbers
            }
        } catch (error) {
            console.error('Data change error:', error);
        }
    };

    return (
        <div className="flex mt-9 flex-col gap-4">
            <div className=" text-center">
                <h2 className="text-2xl font-bold text-white mb-2">로또 (2352회)</h2>
                <p className="text-white mb-4">행운의 번호 6개를 선택해주세요</p>
            </div>

            <div className="grid grid-cols-7 gap-2">
                {[...Array(45)].map((_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => {
                            if (selectedNumbers.includes(i + 1)) {
                                setSelectedNumbers(prev => prev.filter(n => n !== i + 1));
                            } else if (selectedNumbers.length < 6) {
                                setSelectedNumbers(prev => [...prev, i + 1].sort((a, b) => a - b));
                            }
                        }}
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

            {/* <div className="mt-4">
                <div className="flex justify-center gap-2 mb-4">
                    {selectedNumbers.map((num) => (
                        <div key={num} className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold">
                            {num}
                        </div>
                    ))}
                    {[...Array(6 - selectedNumbers.length)].map((_, i) => (
                        <div key={i} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            ?
                        </div>
                    ))}
                </div>

                
            </div> */}
            <button
                    onClick={() => {
                        dataRef.current = {
                            numbers: selectedNumbers
                        };
                        handleDataChange();
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
