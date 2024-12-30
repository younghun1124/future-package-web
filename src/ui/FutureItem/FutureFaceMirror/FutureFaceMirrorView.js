import { DialogHeader, DialogTitle } from '@chakra-ui/react';

export default function FutureFaceMirrorView({ dataRef }) {    
    return (
        <div className="flex flex-col items-center gap-4">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center py-4">
                    미래의 거울
                </DialogTitle>
            </DialogHeader>
            
            {/* 이미지 컨테이너 */}
            <div 
                className="relative w-full"
                style={{ aspectRatio: '255/170' }}
            >
                {/* SVG 그림 */}
                <div 
                    className="absolute top-0 left-0 w-full h-full z-0"
                    dangerouslySetInnerHTML={{ __html: dataRef?.current?.svgImage || '' }}
                />
                
                {/* 배경 이미지 */}
                <img 
                    src="/futurefacemirror_detail.svg" 
                    alt="거울 프레임"
                    className="absolute top-0 left-0 w-full h-full z-10"
                />
            </div>
        </div>
    );
}
