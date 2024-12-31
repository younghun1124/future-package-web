'use client'
import Image from 'next/image';
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import {
    DialogRoot,
    DialogTrigger,
    DialogContent,
    DialogBody,
    DialogCloseTrigger,
} from "@/components/ui/dialog";
import DoodleButton from '@/ui/buttons/DoodleButton';
import FutureFaceMirrorView from './FutureFaceMirror/FutureFaceMirrorView';
import FutureNoteView from './FutureNote/FutureNoteView';
import FutureLottoView from './FutureLotto/FutureLottoView';
import FutureHologramView from './FutureHologram/FutureHologramView';
import FutureMovieTicketView from './FutureMovieTicket/FutureMovieTicketView';
import FutureGifticonView from './FutureGifticon/FutureGifticonView';
import FutureInventionView from './FutureInvention/FutureInventionView';
import { DialogFooter } from '@chakra-ui/react';

// View 전용 컴포넌트 매핑
const componentsMap = {
    FutureFaceMirror: FutureFaceMirrorView,
    FutureNote: FutureNoteView,
    FutureLotto: FutureLottoView,
    FutureHologram: FutureHologramView,
    FutureMovieTicket: FutureMovieTicketView,
    FutureGifticon: FutureGifticonView,
    FutureInvention: FutureInventionView,
};

const DefaultComponent = () => <div>기본 컴포넌트</div>;

export default function FutureItemView({ item }) {
    const Component = componentsMap[item.type] || DefaultComponent;
    const [isOpen, setIsOpen] = useState(false);
    const modalContentRef = useRef(null);

    const handleDownload = async () => {
        if (!modalContentRef.current) return;

        try {
            const canvas = await html2canvas(modalContentRef.current, {
                backgroundColor: '#585858',
                scale: 2,
                allowTaint: true,
                useCORS: true,
                logging: true,
                // 요소의 실제 위치와 크기를 정확하게 캡처하기 위한 옵션들
                onclone: (document, element) => {
                    // 클론된 요소에 추가 스타일 적용
                    element.style.transform = 'none';
                    element.style.position = 'relative';
                    // absolute 위치를 가진 자식 요소들의 위치 보정
                    const absoluteElements = element.getElementsByClassName('absolute');
                    Array.from(absoluteElements).forEach(el => {
                        el.style.position = 'relative';
                        el.style.transform = 'none';
                    });
                }
            });

            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = image;
            link.download = `미래택배_${item.name}.png`;
            link.click();
        } catch (error) {
            console.error('이미지 저장 중 오류가 발생했습니다:', error);
        }
    };

    return (
        <DialogRoot size="cover" closeOnInteractOutside={false} scrollBehavior="inside" motionPreset='none' onOpenChange={setIsOpen}>
            <DialogTrigger asChild>         
                <Image 
                    src={item.icon}
                    alt={`${item.name} 아이콘`}
                    width={90}  
                    height={90}   
                    priority={true}
                />
            </DialogTrigger>
            
            <DialogContent                 
                backgroundColor="#585858"
                borderRadius="22.5px"                
                className="backdrop-blur-md"
                style={{ maxHeight: '90vh' }}  
            >
              
                    <DialogBody className="flex flex-col gap-6 px-6">
                        <Component 
                            data={item.content}
                        />
                    </DialogBody>
                

                {/* 이미지 저장 버튼 */}
                <DialogFooter className="flex justify-center mt-4 mb-6">
                    <DoodleButton 
                        width={'200px'}
                        className='text-sm'
                        // onClick={handleDownload}
                       
                    >
                        이미지 저장하기(개발중..)
                    </DoodleButton>
                </DialogFooter>

                <DialogCloseTrigger>
                    <Image src="/x_icon.svg" alt="X" width={18} height={18} />
                </DialogCloseTrigger>
            </DialogContent>
        </DialogRoot>
    );
} 