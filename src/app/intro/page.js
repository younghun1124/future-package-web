'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DoodleButton from '@/ui/buttons/DoodleButton';
import Link from 'next/link';
import Navbar from '@ui/Navbar';

export default function IntroPage() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const introContents = [
        {
            image: "https://storage.googleapis.com/future-box-cdn-public/static/assets/landing/belt_2x.webp",
            text: "2047년엔 뭐든 가능하다더니, 시간역행 택배가 현실이 될 줄이야. 외계인들이 하는 지구 택배 사업이라니!"
        },
        {
            image: "https://storage.googleapis.com/future-box-cdn-public/static/assets/landing/belt_2x.webp",
            text: "근데 외계인들이 왜 이런 일을 하는 걸까? 까칠한 태도를 보면 서비스업이랑은 거리가 멀어 보이는데 말이야.."
        },
        {
            image: "https://storage.googleapis.com/future-box-cdn-public/static/assets/landing/ufo_dropbox_2x.webp",
            text: "그래도 2025년으로 깜짝 선물을 보낼 생각을 하니까 신나네. 한번 보내볼까? 외계인한테 잘 부탁한다고 해야지."
        }
    ];

    const handleNext = () => {
        if (currentPage < introContents.length - 1) {
            setCurrentPage(prev => prev + 1);
        } else {
            router.push('/send/form');
        }
    };

    return (
        <main className="min-h-screen flex flex-col text-white items-center bg-black">
            <div className="w-full max-w-[393px] mx-auto px-5 mb-"><Navbar /></div>
            
            {/* 메인 콘텐츠 */}
            <div className="flex flex-col items-center justify-center w-full">
                <div className={`relative w-full aspect-square mb-8 transition-opacity duration-1000`}>
                    <img
                        src={introContents[currentPage].image}
                        alt={`인트로 이미지 ${currentPage + 1}`}
                        className="w-full absolute h-full object-contain"
                    />
                    {!(currentPage===2) && <img
                        src={"https://storage.googleapis.com/future-box-cdn-public/static/assets/landing/alien_2x.webp"}
                        alt={`인트로 이미지 ${currentPage + 1}`}
                        className={`w-full absolute top-0 left-0 object-contain transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    />}
                </div>
                <p className={`text-white text-xl text-center p-5 mb-0`}>
                    {introContents[currentPage].text}
                </p>
            </div>

            {/* 하단 버튼 */}
            <div className="relative flex items-center justify-center w-full mb-3">
                <button 
                    onClick={handleNext}
                    className="h-[37px] px-4 min-w-[84px] bg-white/5 rounded-[9px] border-2 border-white"
                >
                    {currentPage < introContents.length - 1 ? '다음' : '선물 보내러 가기'}
                </button>
                {!(currentPage===introContents.length-1) && <Link 
                    href="/send/form"
                    className="absolute top-1 right-4 text-white text-xl"
                >
                   {'skip >>'}
                </Link>}
            </div>
        </main>
    );
}
