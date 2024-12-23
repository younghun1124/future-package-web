'use client';
import { useRouter } from 'next/navigation';

export default function DeliveryPage() {
  const router = useRouter();

  return (
    <main className="flex flex-col gap-8 items-center justify-between min-h-[calc(100vh-80px)] py-8">
      {/* 택배 박스 애니메이션 */}
      <div className="flex-1 w-full flex items-center justify-center">
        <div className="relative w-48 h-48">
          {/* 택배 박스 */}
          <div className="absolute inset-0 bg-accent/10 border-4 border-accent rounded-lg transform rotate-45 flex items-center justify-center">
            <div className="transform -rotate-45">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-12 h-12 text-accent"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 12 .375a2.625 2.625 0 0 0 0 4.5Z" 
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 배송 메시지 */}
      <div className="w-full text-center mb-8">
        <h2 className="text-xl font-bold mb-2">선물 포장이 완료되었습니다</h2>
        <p className="text-gray-600">
          이제 배송을 시작할 수 있습니다
        </p>
      </div>

      {/* 배송하기 버튼 */}
      <button
        onClick={() => router.push('/send/complete')}
        className="w-full py-4 bg-accent text-white rounded-lg hover:bg-opacity-90 transition-all"
      >
          배송하기
      </button>
    </main>
  );
}


