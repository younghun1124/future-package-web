import Image from "next/image";
import DoodleButton from "@ui/buttons/DoodleButton"
import { useState } from "react";

export default function FutureNoteView({dataRef,data, isInbox,setModalState,onDelete, handleInsertWithData}) {
    const text = dataRef?.current.text || data?.text;
    const [isConverting, setIsConverting] = useState(false);

    const handleEmojiConvert = async () => {
        if (!text) return;      
        setIsConverting(true);
        try {
            const response = await fetch('/api/emoji', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }) // 8자로 제한
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || '이모지 변환 실패');
            }

            const result = await response.json();
            if (result.success && result.emoji) {
                dataRef.current = {
                    ...dataRef.current,
                    text: result.emoji
                };
            } else {
                throw new Error('이모지 변환 결과가 없습니다.');
            }

        } catch (error) {
            console.error('이모지 변환 중 오류:', error);
            alert(error.message || '이모지 변환에 실패했습니다.');
        } finally {
            setIsConverting(false);
        }
    };

    return (
        <div className="relative">
            <h2 className="text-3xl text-center font-bold text-white mt-3 mb-2">쪽지</h2>
            <div className="relative">
                <Image 
                    src="https://storage.googleapis.com/future-box-cdn-public/futureitem/note/FutureNote_2x.webp" 
                    alt="Future Note Detail" 
                    width={330} 
                    height={330} 
                    priority={true}
                    className="mx-auto" 
                />
                <div className="absolute top-[70%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] text-center overflow-y-auto">
                    <p className="text-black text-xl whitespace-pre-wrap break-words p-4">
                        {text || ''}
                    </p>
                </div>
                <div className="flex flex-col mt-2">
                <div className="flex justify-between">
                    <DoodleButton 
                        variant='white' 
                        className='self-center'
                        onClick={handleEmojiConvert}
                        disabled={isConverting}
                    >
                        {isConverting ? '변환중...' : '변환할래요'}
                    </DoodleButton>
                    <DoodleButton className='self-center' onClick={()=>handleInsertWithData()}>담을래요</DoodleButton>
                </div>
                </div>
            </div>
        </div>
    );
};

