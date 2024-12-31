'use client'
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import DoodleButton from '@ui/buttons/DoodleButton'
import {
    DialogRoot,
    DialogTrigger,
    DialogContent,
    DialogBody,
    DialogFooter,
    DialogCloseTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FutureFaceMirror from './FutureFaceMirror';
import FutureNote from './FutureNote';
import FutureLotto from './FutureLotto';
import FutureInvention from './FutureInvention';
import FutureMovieTicket from './FutureMovieTicket';
import FutureHologram from './FutureHologram';
import FutureGifticon from './FutureGifticon';


// 임시로 다른 컴포넌트들도 기본 구현
const DefaultComponent = () => <div>기본 컴포넌트</div>;

const componentsMap = {
    FutureFaceMirror,
    FutureNote,
    FutureLotto,
    FutureInvention,
    FutureMovieTicket,
    FutureHologram,
    FutureGifticon,
};

 // Start of Selection
const FutureItem = ({ item, handleInsertClick, handleUpdateClick, handleDeleteClick, isSelected, isinBox=false, modalState: initialModalState='edit' }) => {
    // 모든 상태와 ref를 최상단에 선언
    const Component = componentsMap[item.type] || DefaultComponent;
    const closeButtonRef = useRef(null);
    const currentData = useRef(item.content);
    
    const [modalState, setModalState] = useState(initialModalState);
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // useEffect를 순서대로 배치
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen && isMounted) {
            setModalState(isSelected ? 'inboxpreview' : 'edit');
        }
    }, [isSelected, isOpen, isMounted]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            console.log('Modal State:', modalState);
            console.log('Current Data:', currentData.current);
        }
    }, [modalState]);

    // 서버사이드 렌더링 시 기본 상태 반환
    if (!isMounted) {
        return (
            <Button 
                className={`flex-col w-[83px] h-[105px] ${isSelected && !isinBox ? 'cursor-not-allowed' : ''}`}
            >
                <Image 
                    src={item.icon}
                    alt="File Icon" 
                    width={74} 
                    height={74}   
                    disabled={isSelected}
                    priority={true}
                />
                {!isinBox ? <div className='text-white text-sm'>{item.name}</div>:''}
            </Button>
        );
    }

    const handleComplete = () => {
        const data = currentData.current;
        if (isSelected) {
            handleUpdateClick?.(item, data);
            setModalState('inboxpreview');
        } else {
            setModalState('preview');
        }
    };

    const handleInsertWithData = () => {
        const data = currentData.current;
        handleInsertClick?.(item, data);
        closeButtonRef.current?.click();
    };

    return (
        <DialogRoot size="cover" closeOnInteractOutside={false} scrollBehavior="inside" motionPreset='none' onOpenChange={setIsOpen}>
            <DialogTrigger asChild disabled={isSelected && !isinBox}>         
                <Button 
                    className={`flex-col w-[83px] h-[105px] ${isSelected && !isinBox ? 'cursor-not-allowed' : ''}`}
                >
                    <Image 
                        src={item.icon}
                        alt="File Icon" 
                        width={74} 
                        height={74}   
                        disabled={isSelected}
                        priority={true}
                    />
                    {!isinBox ? <div className='text-white text-sm'>{item.name}</div>:<></>}
                </Button>
            </DialogTrigger>
            
            <DialogContent                 
                backgroundColor="#585858"
                borderRadius="22.5px"                
                className="backdrop-blur-md"
            >
                <DialogBody className="flex flex-col gap-6 px-6">
                    <Component 
                        item={item}
                        dataRef={currentData}
                        modalState={modalState}
                    />
                </DialogBody>
                <DialogFooter className="gap-4 p-4 grid justify-center">                    
                    {modalState === 'edit' && (
                        <DoodleButton onClick={handleComplete}>
                            완료
                        </DoodleButton>
                    )}
                    {modalState === 'preview' && !isSelected && (
                        <DoodleButton onClick={handleInsertWithData}>
                            담기
                        </DoodleButton>
                    )}
                    {modalState === 'inboxpreview' && (
                        <>
                            <DoodleButton 
                                variant="white"
                                onClick={() => handleDeleteClick?.(item)}
                            >
                                빼기
                            </DoodleButton>
                            <DoodleButton onClick={() => setModalState("edit")}>
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


