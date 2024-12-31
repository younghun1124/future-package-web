'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import FutureItem from '@/ui/FutureItem';
import Image from 'next/image';

export default function ItemsPage() {
    const { uuid } = useParams();
    const [boxData, setBoxData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBoxData = async () => {
            try {
                const response = await fetch(`/api/items/${uuid}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch box data');
                }
                const data = await response.json();
                console.log('Fetched data:', data);
                setBoxData(data);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBoxData();
    }, [uuid]);

    if (isLoading) return <div className="text-white text-xl text-center">로딩중...</div>;
    if (error) return <div className="text-white text-xl text-center">에러가 발생했습니다: {error}</div>;
    if (!boxData) return <div className="text-white text-xl text-center">박스를 찾을 수 없습니다.</div>;

    // 아이템 데이터 변환
    const renderItems = () => {
        const items = [];
        const { futureNotes, futureLottos, futureHolograms, futureFaceMirrors } = boxData.items;

        // 아이템 타입별 아이콘 매핑
        const icons = {
            FutureNote: '/futurenote.svg',
            FutureFaceMirror: '/futurefacemirror.svg',
            FutureHologram: '/futurehologram.svg',
            FutureLotto: '/futurelotto.svg',
            FutureMovieTicket: '/futuremovieticket.svg',
            FutureGifticon: '/futuregifticon.svg',
            FutureInvention: '/futureinvention.svg',
        };

        // 각 아이템 타입별 위치 매핑
        const positions = {
            FutureNote: 'top-[20%] left-[30%]',
            FutureFaceMirror: 'top-[15%] left-[50%]',
            FutureHologram: 'top-[15%] right-[5%]',
            FutureLotto: 'top-[45%] left-[20%]',
            FutureMovieTicket: 'top-[45%] rotate-[78.76deg] left-[40%]',
            FutureGifticon: 'top-[45%] right-[12%]',
            FutureInvention: 'top-[45%] left-[80%]',
        };

        // 각 아이템 타입별 처리
        if (futureNotes) {
            items.push(...futureNotes.map(item => ({
                id: item.id,
                type: 'FutureNote',
                name: '쪽지',
                icon: icons.FutureNote,
                position: positions.FutureNote,
                content: { text: item.message }
            })));
        }
        if (futureLottos) {
            items.push(...futureLottos.map(item => ({
                id: item.id,
                type: 'FutureLotto',
                name: '로또',
                icon: icons.FutureLotto,
                position: positions.FutureLotto,
                content: { numbers: item.numbers }
            })));
        }
        if (futureHolograms) {
            items.push(...futureHolograms.map(item => ({
                id: item.id,
                type: 'FutureHologram',
                name: '홀로그램',
                icon: icons.FutureHologram,
                position: positions.FutureHologram,
                content: { imageUrl: item.imageUrl }
            })));
        }
        if (futureFaceMirrors) {
            items.push(...futureFaceMirrors.map(item => ({
                id: item.id,
                type: 'FutureFaceMirror',
                name: '미래얼굴',
                icon: icons.FutureFaceMirror,
                position: positions.FutureFaceMirror,
                content: { 
                    year: item.year,
                    imageUrl: item.imageUrl 
                }
            })));
        }

        return items;
    };

    return (
        <main className="min-h-screen flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold text-white text-center mb-8">
                터치해서 선물을 열어보세요!
            </h1>

            {/* 상자 이미지와 아이템들 */}
            <div className="relative w-full max-w-md aspect-[4/5]">
                {/* 상자 배경 이미지 */}
                <div className="absolute inset-0 bg-[url('/emptybox.svg')] bg-contain bg-center bg-no-repeat" />
                
                {/* 아이템들 */}
                <div className="relative h-full">
                    {renderItems().map((item) => (
                        <div 
                            key={item.id}
                            className={`absolute ${item.position} transform -translate-x-1/2 -translate-y-1/2`}
                        >
                            <FutureItem 
                                item={item}
                                isSelected={true}
                                modalState="view"
                                isinBox={true}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
} 