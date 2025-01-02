import { DialogHeader, DialogTitle } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';

export default function FutureFaceMirrorView({ data, dataRef }) {    
    const mirrorData = dataRef?.current.svgImage||null;
    const mirrorUrl = data?.imageUrl||null;
    const searchParams = useSearchParams();
    const receiver = searchParams.get('receiver') || '당신';

    return (
        <div className="flex flex-col items-center gap-4">
            <DialogHeader>
                <DialogTitle className="text-2xl text-white font-bold text-center py-4">
                    {receiver}님의 미래를 비추는 거울
                </DialogTitle>
            </DialogHeader>
            
            {/* 이미지 컨테이너 */}
            <div className="relative w-[300px] mx-auto">
                {/* SVG 이미지 */}
                {mirrorData && (
                    <div 
                        className="absolute top-[5%] left-[51%] transform -translate-x-1/2 w-[65%] h-[50%] z-10"
                        dangerouslySetInnerHTML={{ __html: mirrorData }}
                    />
                )}
                {mirrorUrl && (
                    <img 
                        src={mirrorUrl}
                        className="absolute top-[5%] left-[51%] transform -translate-x-1/2 w-[65%] h-[50%] z-10"
                    />
                )}
                {/* 거울 프레임 */}
                <img 
                    src="/futurefacemirror_detail.svg" 
                    alt="거울 프레임"
                    className="w-full z-20 relative"
                />
            </div>
        </div>
    );
}
