'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Page({ params }) {
    const router = useRouter();
    const { boxid } = params;

    const handleOpenBox = () => {
        router.push(`/receive/${boxid}/items`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="mb-8">
                <Image
                    src="/images/box.png"
                    alt="Gift Box"
                    width={200}
                    height={200}
                    priority
                />
            </div>
            
            <button
                onClick={handleOpenBox}
                className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
            >
                상자 열기
            </button>
        </div>
    );
}