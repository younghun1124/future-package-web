import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import DoodleButton from '@ui/buttons/DoodleButton'
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FutureFaceMirror from './FutureFaceMirror';

// 각 컴포넌트를 default export로 가정
const FutureNote = () => (
    <div className="whitespace-pre-line text-lg leading-relaxed text-accent">
        {/* FutureNote 내용 */}
    </div>
);

const FutureLotto = () => (
    <div className="text-center">
        {/* FutureLotto 내용 */}
    </div>
);

// 임시로 다른 컴포넌트들도 기본 구현
const DefaultComponent = () => <div>기본 컴포넌트</div>;

const componentsMap = {
    'FutureFaceMirror': FutureFaceMirror,
    'FutureNote': FutureNote,
    'FutureLotto': FutureLotto,
    'FutureInvention': DefaultComponent,
    'FutureMovieTicket': DefaultComponent,
    'FutureHologram': DefaultComponent,
};

export default function FutureItem({ item, handleInsertClick, handleUpdateClick, isSelected, isEdit }) {
    const Component = componentsMap[item.type] || DefaultComponent;
    const closeButtonRef = useRef(null);
    const currentData = useRef(null);
    // 디버깅을 위한 로그 추가
    useEffect(() => {
        console.log('Current Item:', item);
        console.log('Current Data:', currentData);
    }, [item, currentData]);   

    return (
        <DialogRoot size="cover">
            <DialogTrigger asChild>         
                <Button disabled={isSelected && !isEdit}>
                    <Image 
                        src="/file.svg" 
                        alt="File Icon" 
                        width={80} 
                        height={80}                 
                        className={`cursor-pointer ${isSelected && !isEdit ? 'opacity-50' : ''}`}
                        priority={true}
                    />
                </Button>
            </DialogTrigger>
            <DialogContent                 
                backgroundColor="rgba(88, 88, 88, 0.7)"
                borderRadius="22.5px"
                backdropFilter="blur(4px)"
                className="backdrop-blur-md"
            >
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center py-4 text-white">
                        {isEdit ? '선물 수정하기' : item.type}
                    </DialogTitle>
                </DialogHeader>
                <DialogBody className="flex flex-col gap-6 px-6">
                    <Component 
                        item={item}
                        dataRef={currentData} 
                        isEdit={isEdit}                       
                    />
                </DialogBody>
                <DialogFooter className="gap-4 p-4 grid justify-center">                    
                    {!isEdit ? (
                        <DoodleButton 
                            onClick={()=>{
                                handleInsertClick(item, currentData.current)
                                closeButtonRef.current.click();
                            }}                        
                        >
                            담기
                        </DoodleButton>
                    ) : (
                        <DoodleButton 
                            onClick={() => {
                                handleUpdateClick(item, currentData.current);
                                closeButtonRef.current.click();
                            }}       
                        >
                            수정하기
                        </DoodleButton>
                    )}
                </DialogFooter>
                <DialogCloseTrigger ref={closeButtonRef}>
                    <Image src="/x_icon.svg" alt="X" width={18} height={18} />
                </DialogCloseTrigger>
            </DialogContent>
        </DialogRoot>
    );
}


