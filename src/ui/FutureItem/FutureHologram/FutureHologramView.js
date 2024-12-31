import { DialogHeader, DialogTitle } from '@chakra-ui/react';

export default function FutureHologramView({ dataRef }) {    
    const uploadedImage = dataRef.current?.imageUrl;

    if (!uploadedImage) {
        return null;
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center py-4 text-white">
                    홀로그램
                </DialogTitle>
            </DialogHeader>
            
            <div className="relative w-full">
                {/* 홀로그램 프레임 이미지 */}
                <img 
                    src="/futurehologram_detail.svg" 
                    alt="홀로그램 프레임"
                    className=" w-full h-full z-10"
                />
                
                {/* 업로드된 이미지 */}
                <div 
                    className="relative w-full"
                    style={{ aspectRatio: '255/170' }}
                >
                    <img 
                        src={uploadedImage}
                        alt="홀로그램 이미지"
                        className="w-full h-full object-contain z-0"
                    />
                </div>
            </div>
        </div>
    );
} 