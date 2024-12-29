'use client';
import { useRouter } from 'next/navigation';

export default function SendLayout({ children }) {
  const router = useRouter();

  return (
    <div>
      {/* 네비게이션 버튼 */}
      <nav className="mb-8 flex items-center relative">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-accent transition-colors absolute left-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className="w-5 h-5 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>          
        </button>
        <h1 className="text-white text-lg font-light flex-1 text-center">
          2047년에서 온 택배
        </h1>        
      </nav>

      {children}
    </div>
  );
}
