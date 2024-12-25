import Image from 'next/image';
import { useState } from 'react';
import FullScreenModal from '../FullScreenModal';

import FutureFaceMirror from './FutureFaceMirror';
import FutureGifticon from './FutureGifticon';
import FutureInvention from './FutureInvention';
import FutureNote from './FutureNote';
import FutureMovieTicket from './FutureMovieTicket';
import FutureLotto from './FutureLotto';
import FutureHologram from './FutureHologram';

import { dummyItems } from '@/mocks/items';

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
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
const componentsMap={
    'FutureFaceMirror': FutureFaceMirror,
    'FutureGifticon': FutureGifticon,
    'FutureInvention': FutureInvention,
    'FutureNote': FutureNote,
    'FutureMovieTicket': FutureMovieTicket,
    'FutureLotto': FutureLotto,
    'FutureHologram': FutureHologram,
}


export default function FutureItem({iteminfo}) {
    // item이 없는 경우 dummyItems의 첫번째 아이템 사용
    const item = iteminfo || dummyItems[0];

    const Component = componentsMap[item.type] || (() => <div>Unknown Item</div>);
    return (
        <>
        <div>
            <DialogRoot size="full" motionPreset="scale">
            <DialogTrigger asChild>         
                <Button>
                    <Image 
                    src="/file.svg" 
                    alt="File Icon" 
                    width={100} 
                    height={100}                 
                    className="cursor-pointer"
                    style={{ width: 'auto', height: 'auto' }}
                    priority={true}
                    />
                </Button>
                
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center py-4">쪽지</DialogTitle>
                </DialogHeader>
                <DialogBody className="flex flex-col gap-6 px-6">
                <p className="whitespace-pre-line text-lg leading-relaxed text-accent">
                2025년의 ??에게,

                2047년에서 인사드립니다. 
                새해 복 많이 받으세요! 🎊

                우리가 살고 있는 2047년은 정말 놀랍습니다.<br/>
                하늘을 나는 자동차도 있고, 화성 여행도 일상이 되었죠.
                하지만 이런 변화 속에서도 변치 않는 것이 있습니다.
                바로 새해 첫날 서로를 향한 따뜻한 마음과 축복의 메시지입니다.<br/>

                당신의 2024년은 희망과 행복으로 가득할거에요.
                모든 꿈이 이루어지는 특별한 한 해를 재밌게 즐겨요!
                <br/>

                미래에서,
                당신의 ?? 드림
                </p>
                <br/>
                <p className="!italic text-lg font-medium text-gray-600 text-center">
                 2047년에서 온 쪽지. 알 수 없는 잉크로 쓰여진 글씨가 은은하게 빛난다. 
                </p>
                </DialogBody>
                <DialogFooter className="gap-4 p-4 bg-gray-50">
                <DialogActionTrigger asChild>
                    <Button variant="outline">닫기</Button>
                </DialogActionTrigger>
                <Button colorScheme="blue">저장</Button>
                <Button colorScheme="green">선물 이미지 저장하기</Button>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
            </DialogRoot>
            
            
        </div>
        </>
        
    );
}


