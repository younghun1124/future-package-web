'use client'
import { Center, DialogHeader, DialogTitle } from '@chakra-ui/react';
import { useState, useRef } from 'react';
import DoodleButton from '@ui/buttons/DoodleButton';
import Perfume from './Perfume';
export default function FuturePerfumeEdit({ dataRef ,handleInsertWithData,setModalState}) {    
    const [phase, setPhase] = useState(0);
    const question = ['친구와 함께 만들어 가고 있는 건','친구와 함께 만들어 가고 있는 건','친구와 함께 만들어 가고 있는 건']
    return (
        <div className="flex flex-col items-center gap-6 w-full">
           
                <DialogTitle className="text-2xl  text-white">
                    기억의 향수
                </DialogTitle>
                <p className="text-white">
                    미래의 기억을 향으로 전달할수 있어. 몇가지 물어볼게
                </p>

            {/* 질문 영역*/}
            <div className="bg-[#A3A3A3] w-full text-2xl h-[68px] rounded-lg">
                <Center className="h-full">
                    Q. {question[phase]}
                </Center>
            </div>
            <div className="grid row-2">

            </div>
            
            <div className="flex justify-center w-full">
               
                <Perfume size={140} caseId={1} colorId={null}/>
            </div>
            <DoodleButton onClick={()=>setModalState('preview')}>다음</DoodleButton>
        </div>
    );
} 