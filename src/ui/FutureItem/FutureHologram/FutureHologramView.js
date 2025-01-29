import { DialogHeader, DialogTitle } from '@chakra-ui/react';
import DoodleButton from '@ui/buttons/DoodleButton';
import Hologram from './Hologram';
import handleCapture from '../../../app/utils/capture';
export default function FutureHologramView({ data, dataRef,handleInsertWithData,isInbox ,setModalState, captureRef, onDelete}) {    
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
            
            <DoodleButton variant="white"  onClick={()=>handleCapture(captureRef,"미래에서 온 홀로그램 장치")}>이미지 저장</DoodleButton>
        </div>
    );
} 