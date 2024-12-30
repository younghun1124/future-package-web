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

 // Start of Selection
const FutureItem = ({ item, handleInsertClick, handleUpdateClick, handleDeleteClick, isSelected, isinBox=false}) => {
    const Component = componentsMap[item.type] || DefaultComponent;
    const closeButtonRef = useRef(null);
    const currentData = useRef(null);
    const [modalState,setModalState] =useState(null)
    // useEffect(() => {
        
    //     console.log('Current Item:', item);
    //     console.log('Current Data:', currentData);
    // }, [item, currentData]);   

    useEffect(() => {
        setModalState(isSelected ? 'inboxpreview' : 'edit');
    }, [isSelected]);

    return (
        <DialogRoot size="cover">
            <DialogTrigger asChild disabled={isSelected&&!isinBox}>         
                <Button className={`flex-col w-[83px] h-[105px] ${isSelected && !isinBox ? 'cursor-not-allowed'  : ''}`}>
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
                {/* <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center py-4 text-white">
                        {isEdit ? '선물 수정하기' : item.type}
                    </DialogTitle>
                </DialogHeader> */}
                <DialogBody className="flex flex-col gap-6 px-6">
                {modalState}
                    <Component 
                        item={item}
                        dataRef={currentData}
                        modalState={modalState}
                                            
                    />
                </DialogBody>
                <DialogFooter className="gap-4 p-4 grid justify-center">                    
                    {modalState === 'view' && (
                        <DoodleButton 
                            onClick={()=>{
                                handleInsertClick(item, currentData.current)
                                closeButtonRef.current.click();
                            }}                        
                        >
                            이미지 저장
                        </DoodleButton>
                    )}
                    {modalState === 'edit' && (
                             <DoodleButton 
                                onClick={() => {
                                    if (isSelected) {
                                        // isSelected true일 때의 동작
                                        setModalState('inboxpreview')
                                        handleUpdateClick(item, currentData.current);
                                    } else {
                                        //false일 때의 동작
                                        setModalState('preview')
                                    }
                                }}       
                            >
                               완료
                            </DoodleButton>
                        
                    )}
                    {modalState === 'inboxpreview' && (
                        <>
                        <DoodleButton variant="white"
                                    onClick={() => handleDeleteClick(item)}
                                    className=""
                                >
                                    빼기
                            </DoodleButton>
                            <DoodleButton 
                                onClick={() => {
                                    setModalState("edit");
                                }}
                            >
                                수정하기
                            </DoodleButton>
                           
                        </>
                    )}
                    {modalState === 'preview' && (
                        <DoodleButton 
                            onClick={() => {
                                closeButtonRef.current.click()
                                handleInsertClick(item,currentData.current)
                            }}
                        >
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


