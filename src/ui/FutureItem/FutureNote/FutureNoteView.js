import Image from "next/image";
import DoodleButton from "@ui/buttons/DoodleButton"
import { useState } from "react";

export default function FutureNoteView({dataRef,data, isInbox,setModalState,onDelete, handleInsertWithData}) {
    const text = dataRef?.current.message || data?.text;

    return (
        <div className="relative">
            <h2 className="text-3xl text-center text-white">쪽지</h2>
            <div className="relative">
                <Image 
                    src="https://storage.googleapis.com/future-box-cdn-public/futureitem/note/FutureNote_2x.webp" 
                    alt="Future Note Detail" 
                    width={330} 
                    height={330} 
                    priority={true}
                    className="mx-auto" 
                />
                <div className="absolute top-[70%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[220px] text-center overflow-y-auto">
                    <p className="text-black text-xl whitespace-pre-wrap break-words p-4">
                        {text || ''}
                    </p>
                </div>
                {/* <div className="flex flex-col items-center mt-2">
                <DoodleButton variant='white'  disabled>이미지 저장</DoodleButton>
                </div> */}
            </div>
        </div>
    );
};

