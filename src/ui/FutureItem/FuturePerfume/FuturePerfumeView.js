'use client'
import { DialogHeader, DialogTitle } from '@chakra-ui/react';
import DoodleButton from '@ui/buttons/DoodleButton';
import Perfume from './Perfume';

export default function FuturePerfumeView({ dataRef, setModalState, sender, handleInsertWithData, isInbox, onDelete }) {

    return (
        <div className="flex flex-col items-center gap-4 p-4">
                <DialogTitle className="text-2xl text-center text-white">
                    기억의 향수 (made by. {sender})
                </DialogTitle>
            <div className="relative">
                <div className="flex justify-center mb-4">
                    <Perfume 
                        size={250} 
                        caseId={dataRef.current?.shape} 
                        colorId={dataRef.current?.color}
                        outline_type={dataRef.current?.outline_type}
                    />
                </div>

                <div className="text-center text-white">
                    <h3 className="text-xl mb-4">{dataRef.current?.name}</h3>
                    <p className="text-sm leading-relaxed">
                        {dataRef.current?.description}
                    </p>
                </div>
            </div>

            <div className="flex gap-2 mt-4">
               
                <DoodleButton variant='white' >이미지 저장</DoodleButton>
               
            </div>
        </div>
    );
}