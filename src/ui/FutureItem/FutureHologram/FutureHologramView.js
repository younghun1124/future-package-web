import { DialogHeader, DialogTitle } from '@chakra-ui/react';
import DoodleButton from '@ui/buttons/DoodleButton';
import Hologram from './Hologram';
export default function FutureHologramView({ data, dataRef,handleInsertWithData,isInbox ,setModalState,onDelete}) {    
    const hologramData = dataRef?.current || data;

    if (!hologramData?.imageUrl) {
        return '이미지를 찾지못했습니다';
    }

    return (
        <div className="flex flex-col items-center gap-4">

                <DialogTitle className="text-2xl text-center text-white">
                    홀로그램 액자
                </DialogTitle>
        
            <Hologram data={hologramData} dataRef={dataRef} />
            
            <DoodleButton disabled  onClick={handleInsertWithData}>이미지 저장</DoodleButton>
        </div>
    );
} 