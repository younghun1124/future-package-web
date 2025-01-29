'use client';
import { useRouter } from 'next/navigation';
export default function Navbar() {
    const router = useRouter();
    return (
      <nav className="mb-2 pt-6 relative flex items-center justify-center">
        <button
          className="absolute left-0 flex items-center text-gray-600"
          onClick={() => router.back()}
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
        <h1 className="text-white text-lg font-light">
          2047년에서 온 선물
        </h1>
      </nav>

    
    );
}

