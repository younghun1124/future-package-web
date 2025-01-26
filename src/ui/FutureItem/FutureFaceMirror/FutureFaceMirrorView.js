'use client'
import { DialogHeader, DialogTitle } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { Center } from '@chakra-ui/react';
export default function FutureFaceMirrorView({ data, dataRef }) {    
    const mirrorData = dataRef?.current.svgImage||null;
    const mirrorUrl = data?.imageUrl||null;
    const searchParams = useSearchParams();
    const receiver = searchParams.get('receiver')||'친구';
    
    return (
        <div className="flex flex-col items-center">
           
                <DialogTitle className="text-2xl text-white text-center">
                    {receiver+'의' } 미래를 비추는 거울
                </DialogTitle>
            
            {/* 이미지 컨테이너 */}
            <Center className="relative w-[300px] mx-auto">
                {/* SVG 이미지 */}
                {mirrorData && (
                    <div 
                        className="absolute transform  w-[100%] h-[68%] z-10"
                        dangerouslySetInnerHTML={{ __html: mirrorData }}
                    />
                )}
                {mirrorUrl && (
                    <img 
                        src={mirrorUrl.startsWith('http') 
                            ? mirrorUrl 
                            : `/api/image?path=${encodeURIComponent(mirrorUrl)}`}
                        className="absolute top-[13%] left-[51%] transform -translate-x-1/2 w-[100%] h-[71%] z-10"
                        alt="미래 얼굴"
                    />
                )}
                {/* 거울 프레임 */}
                <img 
                    src="https://storage.googleapis.com/future-box-cdn-public/futureitem/mirror/mirror_frame_vertical_2x.webp" 
                    alt="거울 프레임"
                    className="w-full z-20 relative"
                />
            </Center>
        </div>
    );
}
