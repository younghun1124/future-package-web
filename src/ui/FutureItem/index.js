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
import FutureNote from './FutureNote';
import FutureLotto from './FutureLotto/FutureLottoView';
import FutureInvention from './FutureInvention';
import FutureMovieTicket from './FutureMovieTicket';
import FutureHologram from './FutureHologram';
import FutureGifticon from './FutureGifticon';


// 임시로 다른 컴포넌트들도 기본 구현
const DefaultComponent = () => <div>기본 컴포넌트</div>;

const componentsMap = {
    FutureFaceMirror,
    // FutureNote,
    FutureLotto,
    // FutureInvention,
    // FutureMovieTicket,
    // FutureHologram,
    // FutureGifticon,
};

const FutureItem = ({ item, handleInsertClick, handleUpdateClick, handleDeleteClick, isSelected, isEdit }) => {
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
                <Button className='flex-col w-[83px] h-[105px]'>
                    <Image 
                        src={item.icon}
                        alt="File Icon" 
                        width={74} 
                        height={74}                 
                        className={`cursor-pointer ${isSelected && !isEdit ? 'opacity-50' : ''}`}
                        priority={true}
                    />
                    <div className='text-white text-sm'>{item.name}</div>
                </Button>
            </DialogTrigger>
            
            <DialogContent                 
                backgroundColor="#585858"
                borderRadius="22.5px"                
                className="backdrop-blur-md"
            >
                {/* <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center py-4 text-white">
                        {isEdit ? '선물 수정하기' : item.type}
                    </DialogTitle>
                </DialogHeader> */}
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
                        <>
                            <DoodleButton variant="white"
                        onClick={() => handleDeleteClick(item)}
                      className=""
                    >빼기</DoodleButton>
                            <DoodleButton 
                                onClick={() => {
                                    handleUpdateClick(item, currentData.current);
                                    closeButtonRef.current.click();
                                }}       
                            >
                                수정하기
                            </DoodleButton>
                        </>
                    )}
                </DialogFooter>
                <DialogCloseTrigger ref={closeButtonRef}>
                    <Image src="/x_icon.svg" alt="X" width={18} height={18} />
                </DialogCloseTrigger>
            </DialogContent>
        </DialogRoot>
    );
};

export default FutureItem;


