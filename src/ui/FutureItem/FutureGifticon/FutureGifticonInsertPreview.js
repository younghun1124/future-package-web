'use client'
import { DialogHeader, DialogTitle } from '@chakra-ui/react';
import DoodleButton from '@ui/buttons/DoodleButton';
import { FUTURE_GIFTICON_TYPES } from '@/constants/futureItems';
import GifticonDetail from './GifticonDetail';
export default function FutureGifticonInsertPreview({ dataRef, setModalState, handleInsertWithData }) {
    // id로 기프티콘 찾기
    const selectedGifticon = Object.values(FUTURE_GIFTICON_TYPES).find(
        gifticon => gifticon.id === dataRef?.current.futureGifticonType
    );
    if (!selectedGifticon) {
        return null;
    }
    return (
        <div className="flex flex-col items-center gap-4">
                <DialogTitle className="text-2xl text-white text-center ">
                    미래 기프트카드
                </DialogTitle>
                <GifticonDetail imageUrl={selectedGifticon.detailImageUrl} />
            <DoodleButton onClick={handleInsertWithData}>담을래요</DoodleButton>
        </div>
    );
} 