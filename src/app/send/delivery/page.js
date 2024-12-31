'use client';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import Image from 'next/image';
import DoodleButton from '@/ui/buttons/DoodleButton';

function DeliveryContent() {
    const searchParams = useSearchParams();
    const uuid = searchParams.get('uuid');
    const router = useRouter();

    useEffect(() => {
        // Kakao SDK 초기화
        if (!window.Kakao.isInitialized()) {
            window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
        }
    }, []);

    const handleShare = () => {
        if (!window.Kakao) {
            return;
        }

        const shareUrl = `${process.env.NEXT_PUBLIC_SERVICE_URL}/receive/${uuid}/box`;
        window.Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: '미래에서 온 선물이 도착했어요! 🎁',
                description: '미래에서 온 특별한 선물을 확인해보세요.',
                imageUrl: 'https://your-domain.com/future_package.png',
                link: {
                    mobileWebUrl: shareUrl,
                    webUrl: shareUrl,
                },
            },
            buttons: [
                {
                    title: '선물 확인하기',
                    link: {
                        mobileWebUrl: shareUrl,
                        webUrl: shareUrl,
                    },
                },
            ],
        });
        router.push('/send/complete'); // 페이지 이동
    };

    return (
        <div className="flex flex-col gap-8 items-center justify-between py-8">
            <div className="flex-1 w-full flex items-center justify-center">
                <div>
                    <Image 
                        src='/ufo.svg'
                        alt="배달 ufo"
                        width={100}
                        height={100}
                        className='ml-auto'
                    />
                    <Image
                        src='/future_package.svg'
                        alt="미래 택배 상자"
                        width={300}
                        height={300}
                        priority
                    />      
                </div>
            </div>

            <div className="w-full flex justify-center">
                <DoodleButton 
                    width='300px'
                    onClick={handleShare}
                    color="black"
                >
                    카카오톡으로 전달하기
                </DoodleButton>
            </div>
        </div>
    );
}

export default function DeliveryPage() {
    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <DeliveryContent />
            </Suspense>
        </main>
    );
}
