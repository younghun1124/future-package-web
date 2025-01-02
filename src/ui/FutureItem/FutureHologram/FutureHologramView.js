import { DialogHeader, DialogTitle } from '@chakra-ui/react';

export default function FutureHologramView({ data, dataRef }) {    
    const hologramData = dataRef?.current || data;

    if (!hologramData?.imageUrl) {
        return null;
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center py-4 text-white">
                    홀로그램 액자
                </DialogTitle>
            </DialogHeader>
            
            <div className="relative w-[300px] mx-auto">
                {/* 홀로그램 프레임 이미지 */}
                <img 
                    src="/futurehologram_detail.svg" 
                    alt="홀로그램 프레임"
                    className="w-full"
                />

                {/* 업로드된 이미지 + 홀로그램 효과 */}
                <div className="absolute bottom-[55%] left-1/2 -translate-x-1/2 w-[60%] aspect-square">
                    <div className="relative w-full h-full hologram-container">
                        {hologramData.imageUrl && (
                            <img 
                                src={hologramData.imageUrl.startsWith('http') 
                                    ? hologramData.imageUrl 
                                    : `/api/image?path=${encodeURIComponent(hologramData.imageUrl)}`}
                                alt="홀로그램 이미지"
                                className="w-full h-full object-contain hologram-effect"
                            />
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .hologram-container {
                    perspective: 1000px;
                    transform-style: preserve-3d;
                }

                .hologram-effect {
                    animation: hologram 8s ease-in-out infinite;
                    filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))
                           drop-shadow(0 0 20px rgba(0, 255, 255, 0.3));
                    opacity: 0.8;
                }

                @keyframes hologram {
                    0%, 100% {
                        transform: translateZ(40px) rotateX(0deg);
                        filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))
                               drop-shadow(0 0 20px rgba(0, 255, 255, 0.3));
                    }
                    50% {
                        transform: translateZ(60px) rotateX(3deg);
                        filter: drop-shadow(0 0 15px rgba(0, 255, 255, 0.6))
                               drop-shadow(0 0 25px rgba(0, 255, 255, 0.4));
                    }
                }
            `}</style>
        </div>
    );
} 