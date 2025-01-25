import { DialogHeader, DialogTitle } from '@chakra-ui/react';
import DoodleButton from '@ui/buttons/DoodleButton';
export default function FutureHologramPreview({ data, dataRef,handleInsertWithData,isInbox ,setModalState,onDelete}) {    
    const hologramData = dataRef?.current || data;

    if (!hologramData?.imageUrl) {
        return '이미지를 찾지못했습니다';
    }

    return (
        <div className="flex flex-col items-center gap-4">

                <DialogTitle className="text-2xl text-center text-white">
                    홀로그램 액자
                </DialogTitle>
        
            <div className="relative w-[300px] mx-auto">
                {/* 홀로그램 프레임 이미지 */}
                <img 
                    src="/futurehologram_detail.svg" 
                    alt="홀로그램 프레임"
                    className="w-full"
                />

                {/* 업로드된 이미지 + 홀로그램 효과 */}
                <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[60%] aspect-square">
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
                    perspective: 700px;
                    transform-style: preserve-3d;
                }

                .hologram-effect {
                    animation: hologram 8s ease-in-out infinite,
                             flicker 6s linear infinite,
                             stretch 5s ease-in-out infinite;
                    filter: drop-shadow(0 0 10px rgba(18, 223, 146, 0.3))
                           drop-shadow(0 0 20px rgba(18, 223, 146, 0.15));
                    opacity: 0.8;
                    position: relative;
                }

                .hologram-effect::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(18, 223, 146, 0.15);
                    mix-blend-mode: overlay;
                    pointer-events: none;
                }

                @keyframes hologram {
                    0%, 100% {
                        transform: translateZ(40px) rotateX(-10deg);
                        filter: drop-shadow(0 0 10px rgba(18, 223, 146, 0.4))
                               drop-shadow(0 0 20px rgba(18, 223, 146, 0.7));
                    }
                    50% {
                        transform: translateZ(60px) rotateX(10deg);
                        filter: drop-shadow(0 0 15px rgba(18, 223, 146, 0.5))
                               drop-shadow(0 0 25px rgba(18, 223, 146, 0.25));
                    }
                }

                @keyframes flicker {
                    0%, 100% { opacity: 0.8; }
                    3% { opacity: 0.6; }
                    4% { opacity: 0.8; }
                    7% { opacity: 0.6; }
                    8% { opacity: 0.8; }
                    92% { opacity: 0.8; }
                    93% { opacity: 0.6; }
                    94% { opacity: 0.8; }
                }

                @keyframes stretch {
                    0%, 100% { transform: scaleX(1); }
                    50% { transform: scaleX(0.985); }
                }
            `}</style>
          <div>
                <DoodleButton variant="white" onClick={onDelete}>뺄래요</DoodleButton>
                <DoodleButton  onClick={()=>setModalState('edit')}>바꿀래요</DoodleButton>
                </div>
         
        </div>
    );
} 