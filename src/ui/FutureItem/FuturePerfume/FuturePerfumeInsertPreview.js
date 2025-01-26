'use client'
import { DialogHeader, DialogTitle } from '@chakra-ui/react';
import DoodleButton from '@ui/buttons/DoodleButton';
import Perfume from './Perfume';
import DoodleLine from '@ui/DoodleLine';

export default function FuturePerfumePreview({ dataRef, setModalState, handleInsertWithData, isInbox, onDelete }) {
    const getDescription = () => {
        const answers = [
            dataRef.current?.answer1,
            dataRef.current?.answer2,
            dataRef.current?.answer3
        ];

        return `따뜻한 친구같이 있어 가는 동안, 가끔고 자유롭게 움직이는 중기들이 공기 중에 떠다닥, 글내 고요한 무언가 속으로 스며드는 향.`;
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <DialogTitle className="text-2xl text-center text-white">
                향수
            </DialogTitle>
            <div className="relative">
                <div className="flex justify-center mt-[-20px]">
                    <Perfume 
                        size={250} 
                        caseId={dataRef.current?.shape} 
                        colorId={dataRef.current?.color}
                        outline_type={dataRef.current?.outline_type}
                    />
                </div>

                <div className="text-center text-white">
                    <h3 className="text-xl">{dataRef.current?.name || "한밤의 포만감 향"}</h3>
                    <DoodleLine />
                    <p className="mt-5 leading-relaxed">
                        {dataRef.current?.description || "따뜻한 친밀감이 입안 가득 번지고, 가볍고 자유로운 즐거움이 공기 중에 떠돌다, 끝내 고요한 무한함 속으로 스며드는 향."}
                    </p>
                </div>
            </div>

            <div className="flex gap-2 mt-4">
                    <DoodleButton onClick={handleInsertWithData}>담을래요</DoodleButton>
            </div>
        </div>
    );
}
