'use client'
import { useEffect, useState } from 'react';
import FutureItem from '@ui/FutureItem';

export default function BoxContent({ uuid }) {
    const [boxData, setBoxData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const fetchBoxData = async () => {
            try {
                const response = await fetch(`/api/boxes/${uuid}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch box data');
                }
                const data = await response.json();
                setBoxData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBoxData();
    }, [uuid]);

    // 서버사이드 렌더링 시 기본 상태 반환
    if (!isMounted) {
        return <div className="min-h-screen flex items-center justify-center">
            <div className="text-white text-xl">선물 상자를 불러오는 중...</div>
        </div>;
    }

    if (isLoading) return <div className="text-white text-xl">로딩중...</div>;
    if (error) return <div className="text-white text-xl">에러가 발생했습니다: {error}</div>;
    if (!boxData) return <div className="text-white text-xl">박스를 찾을 수 없습니다.</div>;

    return (
        <main className="flex min-h-screen flex-col items-center p-4">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold text-white text-center mb-8">
                    2047년에서 온 선물
                </h1>
                <div className="grid grid-cols-2 gap-4">
                    {boxData.futureItems.map((item) => (
                        <FutureItem
                            key={item.id}
                            item={item}
                            isSelected={true}
                            modalState="view"
                        />
                    ))}
                </div>
            </div>
        </main>
    );
} 