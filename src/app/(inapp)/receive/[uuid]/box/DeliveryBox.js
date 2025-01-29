'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DoodleButton from '@/ui/buttons/DoodleButton';

export default function DeliveryBox({ uuid }) {
    const [scaleClass, setScaleClass] = useState('scale-100');

    useEffect(() => {
        // 페이지 로드 후 0.1초 뒤에 크기를 작게 만듦
        const timer = setTimeout(() => {
            setScaleClass('scale-0');
        }, 2000);

        // 컴포넌트가 언마운트될 때 타이머 클리어
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col gap-8 items-center justify-between py-8">
            <div className="flex-1 w-full flex items-center justify-center">
                <div>
                    <Image 
                        src='https://storage.googleapis.com/future-box-cdn-public/static/assets/ufo/ufo_2x.webp' 
                        alt="배달 ufo" 
                        width={90} 
                        height={90} 
                        className={`ml-auto transition-transform duration-500 ease-in-out ${scaleClass}`} 
                    />
                    <Image 
                        src='https://storage.googleapis.com/future-box-cdn-public/static/assets/futurebox/futurebox_packed_2x.webp'
                        alt="미래 택배 상자"
                        width={300}
                        height={300}
                        priority
                    />      
                </div>
            </div>

            <div className="w-full flex justify-center">
                <Link href={`/receive/${uuid}/items`}>
                    <DoodleButton color="black">
                        상자 열기
                    </DoodleButton>
                </Link>
            </div>
        </div>
    );
}
