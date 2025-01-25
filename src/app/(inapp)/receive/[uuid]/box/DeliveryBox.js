'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DoodleButton from '@/ui/buttons/DoodleButton';

export default function DeliveryBox({ uuid }) {
    const router = useRouter();

    const handleOpenBox = async () => {
        try {
            const response = await fetch(`/api/boxes/${uuid}/logs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                console.error('로그 기록 실패');
            }

            // 상자 내용물 페이지로 이동
            router.push(`/receive/${uuid}/items`);
        } catch (error) {
            console.error('상자 열기 오류:', error);
            router.push(`/receive/${uuid}/items`);
        }
    };

    return (
        <div className="flex flex-col gap-8 items-center justify-between py-8">
            <div className="flex-1 w-full flex items-center justify-center">
                <div>
                    <Image 
                        src='/ufo.svg'
                        alt="배달 ufo" 
                        width={150}
                        height={130}
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
                <DoodleButton color="black" onClick={handleOpenBox}>
                    상자 열기
                </DoodleButton>
            </div>
        </div>
    );
} 