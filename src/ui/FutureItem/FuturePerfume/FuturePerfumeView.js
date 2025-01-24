'use client'
import { DialogHeader, DialogTitle } from '@chakra-ui/react';
import DoodleButton from '@ui/buttons/DoodleButton';
import Perfume from './Perfume';

export default function FuturePerfumeView({ dataRef, setModalState, handleInsertWithData, isInbox, onDelete }) {
    const getDescription = () => {
        const answers = [
            dataRef.current?.answer1,
            dataRef.current?.answer2,
            dataRef.current?.answer3
        ];

        return `따뜻한 친구같이 있어 가는 동안, 가끔고 자유롭게 움직이는 중기들이 공기 중에 떠다닥, 글내 고요한 무언가 속으로 스며드는 향.`;
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
                <DialogTitle className="text-2xl text-center text-white">
                    향수
                </DialogTitle>
            <div className="relative">
                <div className="flex justify-center mb-4">
                    <Perfume 
                        size={200} 
                        caseId={dataRef.current?.caseId} 
                        colorId={dataRef.current?.colorId}
                    />
                </div>

                <div className="text-center text-white">
                    <h3 className="text-xl mb-4">한밤의 포만감 향</h3>
                    <p className="text-sm leading-relaxed">
                        {getDescription()}
                    </p>
                </div>
            </div>

            <div className="flex gap-2 mt-4">
                {isInbox ? (
                    <>
                        <DoodleButton onClick={onDelete}>뺄래요</DoodleButton>
                        <DoodleButton onClick={() => setModalState('edit')}>바꿀래요</DoodleButton>
                    </>
                ) : (
                    <DoodleButton onClick={handleInsertWithData}>담을래요</DoodleButton>
                )}
            </div>
        </div>
    );
}
