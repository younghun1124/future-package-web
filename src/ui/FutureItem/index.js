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
import FutureTarot from './FutureTarot'

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
    FutureTarot,
};

 // Start of Selection
const FutureItem = ({ item, handleInsertClick, handleUpdateClick, handleDeleteClick, isSelected, isInBox=false, isReceive=false, modalState: initialModalState='edit' }) => {
    // 모든 상태와 ref를 최상단에 선언
    const Component = componentsMap[item.type] || DefaultComponent;
    const closeButtonRef = useRef(null);
    const currentData = useRef(item.content);
    
    const [modalState, setModalState] = useState(initialModalState);
    const [isOpen, setIsOpen] = useState(false);
    const [receiver, setReceiver] = useState('');

    // useEffect를 순서대로 배치
    useEffect(() => {
        // 클라이언트 사이드에서만 실행
        const searchParams = new URLSearchParams(window.location.search);
        setReceiver(searchParams.get('receiver') || '');
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            console.log('Modal State:', modalState);
            console.log('Current Data:', currentData.current);
        }
    }, [modalState]);

    // isOpen이 변경될 때 modalState 초기화
    useEffect(() => {
        if (isOpen) {
            // 박스에 들어있지 않으면 edit 모드로 초기화
            if (!isInBox) {
                setModalState('edit');
            }
            // 박스에 들어있으면 view 모드로 초기화
            else {
                setModalState('view');
            }
        }
    }, [isOpen, isInBox]);

    const handleInsertWithData = () => {
        const data = currentData.current;
        handleInsertClick?.(item, data);
        closeButtonRef.current?.click();
    };
    const handleDeleteClickWithData=()=>{
        handleDeleteClick(item)
        closeButtonRef.current?.click();
    }

    return (
        <DialogRoot closeOnInteractOutside={true} scrollBehavior="inside" motionPreset='none' onOpenChange={setIsOpen}>
            <DialogTrigger asChild disabled={isSelected && !isInBox}>
                <Button 
                    className={`flex-col w-[83px] h-[105px] ${isSelected && !isInBox ? 'cursor-not-allowed' : ''}`}
                >
                    <div className="relative w-[74px] h-[74px]">
                        <Image 
                            src={item.icon}
                            alt="File Icon" 
                            fill
                            className="object-contain"
                            disabled={isSelected}
                            priority={true}
                        />
                    </div>
                    {!isInBox && <div className='text-white text-sm'>{item.name}</div>}
                </Button>
            </DialogTrigger>
            
            <DialogContent                 
                backgroundColor="#585858"
                borderRadius="22px" style={{ maxHeight: '90vh', maxWidth:'90vw' }}           
            >
            
                <DialogBody className="flex flex-col gap-6 mt-11 px-6">
                <DialogCloseTrigger ref={closeButtonRef}>
                    <Image src="/x_icon.svg" alt="X" width={18} height={18} />
                </DialogCloseTrigger>
                    <Component 
                        item={item}
                        dataRef={currentData}
                        receiver={receiver}
                        isInbox={isInBox}
                        modalState={modalState}
                        setIsOpen={setIsOpen}
                        isReceive={isReceive}
                        handleInsertWithData={handleInsertWithData}
                        setModalState={setModalState}
                        onDelete={handleDeleteClickWithData}
                    />
                </DialogBody>
            </DialogContent>
        </DialogRoot>
    );
};

export default FutureItem;


