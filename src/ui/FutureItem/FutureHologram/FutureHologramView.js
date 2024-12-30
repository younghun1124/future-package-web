import { DialogHeader, DialogTitle } from '@chakra-ui/react';

export default function FutureHologramView({ dataRef }) {    
    return (
        <div className="flex flex-col items-center gap-4">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center py-4">
                    홀로그램
                </DialogTitle>
            </DialogHeader>
            
            <div 
                className="relative w-full"
                style={{ aspectRatio: '255/170' }}
            >
                <div 
                    className="absolute top-0 left-0 w-full h-full z-0"
                    dangerouslySetInnerHTML={{ __html: dataRef?.current?.svgImage || '' }}
                />
                
                <img 
                    src="/futurehologram_detail.svg" 
                    alt="홀로그램 프레임"
                    className="absolute top-0 left-0 w-full h-full z-10"
                />
            </div>
        </div>
    );
} 