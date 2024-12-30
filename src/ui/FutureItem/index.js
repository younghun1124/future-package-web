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
const FutureItem = ({ item, handleInsertClick, handleUpdateClick, handleDeleteClick, isSelected, isinBox=false}) => {
    const Component = componentsMap[item.type] || DefaultComponent;
    const closeButtonRef = useRef(null);
    const currentData = useRef(item.content);
    console.log('currentData 초기화')
    console.log(currentData.current)
    const [modalState, setModalState] = useState('edit');
    const [isOpen, setIsOpen] = useState(false);

    // modalState 초기화 로직
    useEffect(() => {
        if (isOpen) {
            setModalState(isSelected ? 'inboxpreview' : 'edit');
        }
    }, [isSelected, isOpen]);

    // // 모달이 열리거나 닫힐 때 currentData 초기화
    // useEffect(() => {
    //     if (isOpen) {
    //         // 모달이 열릴 때 초기 데이터 설정
    //         currentData.current = isSelected ? item.content : null;
    //     } else {
    //         // 모달이 닫힐 때 데이터 초기화
    //         currentData.current = null;
    //     }
    // }, [isOpen, isSelected, item.content]);

    // modalState 변경 시 로깅
    useEffect(() => {
        console.log('Modal State:', modalState);
        console.log('Current Data:', currentData.current);
    }, [modalState]);

    const handleComplete = () => {
        const data = currentData.current;
        console.log("현재 업데이트 함수에 넣을 데이터")
        console.log(currentData)
        console.log("+=======+")
        if (isSelected) {
            handleUpdateClick(item, data);
            setModalState('inboxpreview');
        } else {
            setModalState('preview');
        }
    };

    const handleInsertWithData = () => {
        const data = currentData.current;
        handleInsertClick(item, data);
        closeButtonRef.current.click();
    };

    const handleOpenModal = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isSelected || isinBox) {
            setIsOpen(true);
        }
    };

    return (
        <DialogRoot size="cover" closeOnInteractOutside={false} scrollBehavior="inside" motionPreset='none' onOpenChange={setIsOpen}>
            <DialogTrigger asChild disabled={isSelected&&!isinBox}>         
                <Button 
                    className={`flex-col w-[83px] h-[105px] ${isSelected && !isinBox ? 'cursor-not-allowed'  : ''}`}
                >
                    <Image 
                        src={item.icon}
                        alt="File Icon" 
                        width={74} 
                        height={74}   
                        disabled={isSelected}
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
            {modalState}
                <DialogBody className="flex flex-col gap-6 px-6">
                    <Component 
                        item={item}
                        dataRef={currentData}
                        modalState={modalState}
                    />
                </DialogBody>
                <DialogFooter className="gap-4 p-4 grid justify-center">                    
                    {modalState === 'view' && (
                        <DoodleButton onClick={handleInsertWithData}>
                            이미지 저장
                        </DoodleButton>
                    )}
                    {modalState === 'edit' && (
                        <DoodleButton onClick={handleComplete}>
                            완료
                        </DoodleButton>
                    )}
                    {modalState === 'inboxpreview' && (
                        <>
                            <DoodleButton 
                                variant="white"
                                onClick={() => handleDeleteClick(item)}
                            >
                                빼기
                            </DoodleButton>
                            <DoodleButton onClick={() => setModalState("edit")}>
                                수정하기
                            </DoodleButton>
                        </>
                    )}
                    {modalState === 'preview' && (
                        <DoodleButton onClick={handleInsertWithData}>
                            담기
                        </DoodleButton>
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


