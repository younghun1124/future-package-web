'use client';
import { useRouter } from 'next/navigation';
import ShareButton from '@/ui/buttons/RequestButton';
import SendButton from '@/ui/buttons/SendButton';
import NavigateButton from '../../../ui/buttons/NavigateButton';
import DoodleButton from '../../../ui/buttons/DoodleButton';
import Image from 'next/image';

export default function CompletePage() {
    return (
        <main className="min-h-screen flex flex-col items-center px-4">
            {/* 배송 완료 이미지 */}
            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
                <h2 className="text-2xl font-bold text-white text-center mb-8">배송 완료!</h2>
                <div className="relative w-full aspect-square max-w-[280px] mb-8">
                    <Image 
                        src='/delivery_complete.svg' 
                        alt='배송완료 이미지' 
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* 버튼 영역 */}
                <div className="w-full flex flex-col items-center space-y-4">
                    <DoodleButton className='w-[85%]' variant='white'>
                        다른 친구에게 요청하기
                    </DoodleButton>
                    <NavigateButton className='w-[85%]' href='/send/form'>
                        다른 친구에게도 보내기
                    </NavigateButton>
                </div>
            </div>
        </main>
    );
}
