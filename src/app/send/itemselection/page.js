'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import FutureItem from '@ui/FutureItem';
import { dummyItems } from '@/mocks/items';
import DoodleButton from '@/ui/buttons/DoodleButton';
import useItemStore from '@/store/useItemStore';

function ItemSelectionContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { selectedItems, setModalOpen, setCurrentItemType } = useItemStore();

    const receiver = searchParams.get('receiver') || '익명의 친구';
    const sender = searchParams.get('sender') || '기본 발신자';

    const handleItemClick = (item) => {
        setCurrentItemType(item.type);
        setModalOpen(true);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    receiver,
                    sender,
                    futureItems: selectedItems
                }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                router.push(`/send/delivery?uuid=${data.uuid}&receiver=${receiver}&sender=${sender}`);
            } else {
                alert('아이템 저장에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('Error saving items:', error);
            alert('아이템 저장 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-normal text-white text-center py-4">
                {receiver}에게 무슨 선물을 보낼까?
            </h2>
            
            {/* 아이템 선택 영역 */}
            <div className="h-[220px]">
                <div className="grid grid-cols-4 grid-rows-2 gap-1 place-items-center h-full">
                    {dummyItems.map((item) => (
                        <div key={item.id} onClick={() => handleItemClick(item)}>
                            <FutureItem 
                                item={item}
                                isSelected={selectedItems.some(selectedItem => 
                                    selectedItem.type === item.type
                                )}
                                isEdit={false}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* 선택된 아이템 목록 */}
            <div className="min-h-[250px] mt-3 relative">
                <div className="bg-[url('/emptybox.svg')] h-[270px] w-[280px] bg-center bg-no-repeat bg-cover"></div>
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="relative h-full">
                        {selectedItems.map((item) => (
                            <div 
                                key={`selected_${item.type}`}
                                className={`absolute ${positions[item.type]} transform -translate-x-1/2 -translate-y-1/2`}
                            >
                                <FutureItem 
                                    item={item}
                                    isSelected={true}
                                    isinBox={true}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 포장하기 버튼 */}
            <div className="flex justify-center w-full">
                <DoodleButton 
                    className='w-[85%]'
                    onClick={handleSubmit}
                    disabled={selectedItems.length === 0}
                >
                    포장하기
                </DoodleButton>
            </div>
        </div>
    );
}

export default function ItemSelectionPage() {
    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <ItemSelectionContent />
            </Suspense>
        </main>
    );
}
