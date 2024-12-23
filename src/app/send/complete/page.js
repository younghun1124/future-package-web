'use client';
import { useRouter } from 'next/navigation';

export default function CompletePage() {
  const router = useRouter();

  return (
    <main className="flex flex-col gap-8 items-center justify-between min-h-[calc(100vh-80px)] py-8">
      {/* 배송 완료 이미지 */}
      <div className="flex-1 w-full flex flex-col items-center justify-center gap-4">
        <div className="relative w-48 h-48 mb-4">
          <div className="absolute inset-0 bg-accent/10 border-4 border-accent rounded-full flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className="w-16 h-16 text-accent"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" 
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center">배송이 완료되었습니다!</h2>
        <p className="text-gray-600 text-center">
          소중한 마음이 무사히 전달되었습니다
        </p>
      </div>

      {/* 버튼 영역 */}
      <div className="w-full space-y-4">
        <button
          onClick={() => router.push('/request')}
          className="w-full py-4 bg-accent text-white rounded-lg hover:bg-opacity-90 transition-all"
        >
          다른 친구에게 요청하기
        </button>
        <button
          onClick={() => router.push('/send/form')}
          className="w-full py-4 border-2 border-accent text-accent rounded-lg hover:bg-accent hover:text-white transition-all"
        >
          다른 친구에게도 보내기
        </button>
      </div>
    </main>
  );
}
