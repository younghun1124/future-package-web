'use client';

import Image from 'next/image';
import Link from 'next/link';
import DoodleButton from '@/ui/buttons/DoodleButton';

export default function DeliveryBox({ uuid }) {
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
                <Link href={`/receive/${uuid}/items`}>
                    <DoodleButton color="black">
                        상자 열기
                    </DoodleButton>
                </Link>
            </div>
        </div>
    );
} 