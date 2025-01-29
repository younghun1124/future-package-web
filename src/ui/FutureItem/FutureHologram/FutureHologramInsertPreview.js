import { DialogHeader, DialogTitle } from '@chakra-ui/react';
import DoodleButton from '@ui/buttons/DoodleButton';
import Hologram from './Hologram';
export default function FutureHologramInsertPreview({ data,setModalState, handleInsertWithData,dataRef }) {    
    const hologramData = dataRef?.current || data;

    if (!hologramData?.imageUrl) {
        return '이미지를 찾지못했습니다';
    }

    return (
        <div className="flex flex-col items-center gap-4">

                <DialogTitle className="text-2xl text-center text-white">
                    홀로그램 액자
                </DialogTitle>
            <Hologram data={hologramData}  dataRef={dataRef} />
            
            <DoodleButton onClick={() => {
                setModalState("preview");
                handleInsertWithData();
            }}>담을래요
            </DoodleButton>
                        </div>
                    );
} 