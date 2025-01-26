'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import FutureItem from '@/ui/FutureItem';
import { 
    FUTURE_MOVIE_TYPES,
    FUTURE_GIFTICON_TYPES,
    FUTURE_INVENTION_TYPES 
} from '@/constants/futureItems';
import NavigateButton from '@/ui/buttons/NavigateButton';
import { dummyItems } from '@/mocks/items';

export default function ItemsPage() {
    const { uuid } = useParams();
    const [boxData, setBoxData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBoxData = async () => {
            try {
                const response = await fetch(`/api/boxes/${uuid}`);
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
        const { futureItems, futureGifticonType, futureMovieType, futureInventionType } = boxData;

        // dummyItems에서 아이콘 매핑 생성
        const icons = Object.fromEntries(
            dummyItems.map(item => [item.type, item.icon])
        );

        // 각 아이템 타입별 위치 매핑
        const positions = {
            FutureNote: 'top-[20%] left-[40%] rotate-[0deg]',
            FutureFaceMirror: 'top-[35%] left-[50%] rotate-[30deg]',
            FutureHologram: 'top-[0%] left-[40%] rotate-[-50deg]',
            FutureLotto: 'top-[10%] left-[70%] rotate-[-20deg]',
            FutureMovieTicket: 'top-[35%] left-[35%] rotate-[78.76deg]',
            FutureGifticon: 'top-[45%] left-[65%]',
            FutureInvention: 'top-[35%] left-[75%]',
            FutureTarot: 'top-[25%] left-[55%] rotate-[15deg]',
            FuturePerfume: 'top-[30%] left-[45%] rotate-[-10deg]'
        };

        // futureItems 배열 처리
        if (futureItems?.length) {
            items.push(...futureItems.map(item => ({
                id: `${item.type}_${Date.now()}`,
                type: item.type,
                name: getItemName(item.type),
                icon: icons[item.type],
                position: positions[item.type],
                content: item.content
            })));
        }

        // 고정 아이템 타입 처리 (영화, 기프티콘, 발명품)
        if (futureMovieType) {
            const movieData = Object.values(FUTURE_MOVIE_TYPES).find(
                movie => movie.id === futureMovieType
            );
            if (movieData) {
                items.push({
                    id: `movie_${movieData.id}`,
                    type: 'FutureMovieTicket',
                    name: '영화 티켓',
                    icon: icons.FutureMovieTicket,
                    position: positions.FutureMovieTicket,
                    content: movieData
                });
            }
        }

        if (futureGifticonType) {
            const gifticonData = Object.values(FUTURE_GIFTICON_TYPES).find(
                gifticon => gifticon.id === futureGifticonType
            );
            if (gifticonData) {
                items.push({
                    id: `gifticon_${gifticonData.id}`,
                    type: 'FutureGifticon',
                    name: '기프티콘',
                    icon: icons.FutureGifticon,
                    position: positions.FutureGifticon,
                    content: gifticonData
                });
            }
        }

        if (futureInventionType) {
            const inventionData = Object.values(FUTURE_INVENTION_TYPES).find(
                invention => invention.id === futureInventionType
            );
            if (inventionData) {
                items.push({
                    id: `invention_${inventionData.id}`,
                    type: 'FutureInvention',
                    name: '미래 발명품',
                    icon: icons.FutureInvention,
                    position: positions.FutureInvention,
                    content: inventionData
                });
            }
        }

        return items;
    };

    // 아이템 이름 반환 함수
    const getItemName = (type) => {
        const names = {
            FutureNote: '쪽지',
            FutureFaceMirror: '미래를 비추는 거울',
            FutureHologram: '홀로그램 장치',
            FutureLotto: '로또',
            FutureMovieTicket: '영화 티켓',
            FutureGifticon: '기프티콘',
            FutureInvention: '미래 발명품',
            FutureTarot: '타로 카드',
            FuturePerfume: '기억의 향수'
        };
        return names[type] || type;
    };

    return (
        <main className=" flex flex-col items-center p-4 pt-0">
            <h1 className="text-xl text-white text-center mb-8">
                터치해서 선물을 열어보세요!
            </h1>

            <div className="relative w-full max-w-md aspect-[4/5]">
                <div className="relative h-full">
                    <div className="absolute inset-0 bg-[url('/futurebox_inside.svg')] bg-cover bg-center  bg-no-repeat" />
                    {renderItems().map((item) => (
                        <div 
                            key={item.type}
                            className={`absolute ${item.position} transform -translate-x-1/2 -translate-y-1/2`}
                        >
                            <FutureItem
                                isReceive={true} 
                                isInBox={true}
                                initialModalState={'view'}
                                item={{
                                    ...item,
                                    data: item.content
                                }}
                            />
                        </div>
                    ))}
                    <div className="absolute pointer-events-none inset-0 bg-[url('/futurebox_outside.svg')] bg-cover bg-center bg-no-repeat" />
                </div>
            </div>
            <NavigateButton className='w-[300px]' href='/send/form'>
                       나도 보내기
                    </NavigateButton>
        </main>
    );
} 