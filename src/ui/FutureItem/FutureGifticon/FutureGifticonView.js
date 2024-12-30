import { DialogHeader, DialogTitle } from '@chakra-ui/react';

export default function FutureGifticonView({ dataRef }) {    
    const selectedGifticon = dataRef.current?.type;

    if (!selectedGifticon) {
        return null;
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center py-4">
                    미래 기프티콘
                </DialogTitle>
            </DialogHeader>
            
            <div className="relative w-full">
                <img 
                    src="/futuregifticon_detail.svg" 
                    alt="기프티콘"
                    className="w-full h-auto"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <h3 className="text-xl font-bold">{selectedGifticon.name}</h3>
                    <p className="text-sm text-gray-600">{selectedGifticon.description}</p>
                </div>
            </div>
        </div>
    );
} 