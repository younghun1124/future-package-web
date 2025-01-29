import { DialogHeader, DialogTitle, HStack } from '@chakra-ui/react';
import DoodleButton from '@ui/buttons/DoodleButton';
import Hologram from './Hologram';
export default function FutureHologramPreview({ data, dataRef,handleInsertWithData,isInbox ,setModalState,onDelete}) {    
    const hologramData = dataRef?.current || data;

    if (!hologramData?.imageUrl) {
        return '이미지를 찾지못했습니다';
    }

    return (
        <div className="flex flex-col items-center gap-4">

                <DialogTitle className="text-2xl text-center text-white">
                    홀로그램 액자
                </DialogTitle>
        
                <Hologram data={hologramData} handleInsertWithData={handleInsertWithData} dataRef={dataRef} />
                <HStack>
                    <DoodleButton variant="white" onClick={onDelete}>뺄래요</DoodleButton>
                    <DoodleButton  onClick={()=>setModalState('edit')}>바꿀래요</DoodleButton>
                </HStack>
         </div>
         
       
    );
} 