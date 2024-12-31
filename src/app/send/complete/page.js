'use client';
import { useRouter } from 'next/navigation';
import ShareButton from '@/ui/buttons/RequestButton';
import SendButton from '@/ui/buttons/SendButton';
import NavigateButton from '../../../ui/buttons/NavigateButton';
import DoodleButton from '../../../ui/buttons/DoodleButton';
import Image from 'next/image';
export default function CompletePage() {
  return (
    <main className="flex flex-col gap-8 items-center justify-between min-h-[calc(100vh-80px)] py-8">
      {/* 배송 완료 이미지 */}
      <div className="flex-1 w-full flex flex-col items-center justify-center gap-4">
        <div className="w-48 h-48 mb-4">
        <h2 className="text-2xl font-bold text-white text-center">배송 완료!</h2>
        {/* <p className="text-gray-600 text-center">
          소중한 마음이 무사히 전달되었습니다
        </p> */}
          
            <Image src='/delivery_complete.svg' alt='배송완료 이미지' width={220} height={430} />
          
        </div>
        
      </div>

      {/* 버튼 영역 */}
      <div className="w-full flex-col justify-center space-y-4">
        <DoodleButton className='w-[85%]' w='200px' variant='white' >
          다른 친구에게 요청하기
        </DoodleButton>
        <NavigateButton className='w-[85%]' href='/send/form'>
          다른 친구에게도 보내기
        </NavigateButton>
      </div>
    </main>
  );
}
