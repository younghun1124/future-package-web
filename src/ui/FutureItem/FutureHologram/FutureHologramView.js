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
            
            <div className="relative w-full h-[400px]">
                {/* 업로드된 이미지 + 홀로그램 효과 */}
                <div className="absolute bottom-[45%] left-1/2 -translate-x-1/2 w-[60%] aspect-square z-20">
                    <div className="relative w-full h-full hologram-container">
                        <img 
                            src={uploadedImage}
                            alt="홀로그램 이미지"
                            className="w-full h-full object-contain hologram-effect"
                        />
                    </div>
                </div>
                
                {/* 홀로그램 프레임 이미지 */}
                <div className="absolute bottom-0 left-0 w-full">
                    <img 
                        src="/futurehologram_detail.svg" 
                        alt="홀로그램 프레임"
                        className="w-full h-auto"
                    />
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