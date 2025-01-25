import { DialogHeader, DialogTitle } from '@chakra-ui/react';
import DoodleButton from '@ui/buttons/DoodleButton';
export default function FutureGifticonView({ dataRef ,data, handleInsertWithData, onDelete, setModalState}) {    
    const selectedGifticon = dataRef?.current||data;

    if (!selectedGifticon) {
        return null;
    }

    return (
        <div className="flex flex-col items-center gap-4">
          
                <DialogTitle className="text-2xl text-white text-center ">
                    미래 기프트카드
                </DialogTitle>
            <div className="relative w-full">
                <img 
                    src={selectedGifticon.detailImageUrl} 
                    alt={selectedGifticon.name}
                    className="w-full h-auto"
                />
            </div>
            <div>
                <DoodleButton variant="white" onClick={onDelete}>뺄래요</DoodleButton>
                <DoodleButton  onClick={()=>setModalState('edit')}>바꿀래요</DoodleButton>
                </div>
        </div>
    );
} 