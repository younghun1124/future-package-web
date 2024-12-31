'use client'
import Image from 'next/image';
import { useState } from 'react';
import {
    DialogRoot,
    DialogTrigger,
    DialogContent,
    DialogBody,
    DialogCloseTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FutureFaceMirrorView from './FutureFaceMirror/FutureFaceMirrorView';
import FutureNoteView from './FutureNote/FutureNoteView';
import FutureLottoView from './FutureLotto/FutureLottoView';
import FutureHologramView from './FutureHologram/FutureHologramView';
import FutureMovieTicketView from './FutureMovieTicket/FutureMovieTicketView';
import FutureGifticonView from './FutureGifticon/FutureGifticonView';
import FutureInventionView from './FutureInvention/FutureInventionView';

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

    return (
        <DialogRoot size="cover" closeOnInteractOutside={false} scrollBehavior="inside" motionPreset='none' onOpenChange={setIsOpen}>
            <DialogTrigger asChild>         
                
                    <Image 
                        src={item.icon}
                        alt={`${item.name} 아이콘`}
                        width={200}  
                        height={200}   
                        priority={true}
                    />
                    {/* <span className="text-white text-sm">{item.name}</span> */}
                
            </DialogTrigger>
            
            <DialogContent                 
                backgroundColor="#585858"
                borderRadius="22.5px"                
                className="backdrop-blur-md"
            >
                <DialogBody className="flex flex-col gap-6 px-6">
                    <Component 
                        data={item.content}
                    />
                </DialogBody>
                <DialogCloseTrigger>
                    <Image src="/x_icon.svg" alt="X" width={18} height={18} />
                </DialogCloseTrigger>
            </DialogContent>
        </DialogRoot>
    );
} 