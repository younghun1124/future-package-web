'use client';
import { useRouter } from 'next/navigation';

export default function SendLayout({ children }) {
  const router = useRouter();

  return (
    <div>
      {/* 네비게이션 버튼 */}
      <nav className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-accent transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          이전으로
        </button>
      </nav>

      {children}
    </div>
  );
}
