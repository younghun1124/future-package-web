'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import FutureItem from '@ui/FutureItem';
import { dummyItems } from '@/mocks/items';
import DoodleButton from '@/ui/buttons/DoodleButton';

function ItemSelectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedItems, setSelectedItems] = useState([]);

  
  // 쿼리파라미터 값 받아오기
  const receiver = searchParams.get('receiver') || '익명의 친구';
  const sender = searchParams.get('sender') || '기본 발신자';

  const handleInsertClick = (item, contentData) => {
    const newItem = {
        ...item,
        id: item['type'],
        content: {
            ...contentData
        }
    };
    setSelectedItems(prevItems => [...prevItems, newItem]);
  };
  
  const handleDeleteClick= (item)=>{
    setSelectedItems(selectedItems.filter(i => i.id !== item.id))
  }

  const handleUpdateClick = (item, data) => {
    const newItem = {
        ...item,
        id: item['type'],
        content: data
    };
    console.log("이전 아이템 정보")
    console.log(item)
    console.log("이후 아이템 정보")
    console.log(newItem)
    setSelectedItems(prevItems => 
        prevItems.map(prevItem => 
            prevItem.type === newItem.type ? {...newItem} : prevItem
        )
    );
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

  const handleItemClick = (item) => {
    setCurrentItemType(item.type);
    setIsModalOpen(true);
  };

  console.log("선택된 아이템")
  console.log(selectedItems)
  console.log("===========")
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-normal text-white text-center py-4">{receiver}에게 무슨 선물을 보낼까?</h2>
      
      {/* 아이템 선택 영역 - 고정 높이 */}
      <div className="h-[280px]">
        <div className="grid grid-cols-4 grid-rows-2 gap-4 place-items-center h-full">
          {dummyItems.map((item) => (
            <div key={item.id}>
              <FutureItem 
                item={item} 
                handleInsertClick={handleInsertClick}
                isSelected={selectedItems.some(selectedItem => 
                  selectedItem.type === item.type
                )}
                
                isEdit={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 선택된 아이템 목록 - 상자 안에 고정 위치로 배치 */}
      <div className="min-h-[250px] relative">
        <div className="bg-[url('/emptybox.svg')] h-[250px] w-[250px] bg-center bg-no-repeat bg-contain"></div>
        <div className="absolute top-0 left-0 w-full h-full">
            <div className="relative h-full">
                {/* 각 아이템의 고정 위치 */}
                {selectedItems.map((item) => {
                    // 아이템 타입별 위치 매핑
                    const positions = {
                        FutureNote: 'top-[20%] left-[30%]',
                        FutureFaceMirror: 'top-[15%] left-[50%]',
                        FutureHologram: 'top-[15%] right-[5%]',
                        FutureLotto: 'top-[45%] left-[20%]',
                        FutureMovieTicket: 'top-[45%] rotate-[78.76deg] left-[40%]',
                        FutureGifticon: 'top-[45%] right-[12%]',
                        FutureInvention: 'top-[45%] left-[80%]',
                    };

                    return (
                        <div 
                            key={`selected_${item.type}`}
                            className={`absolute ${positions[item.type]} transform -translate-x-1/2 -translate-y-1/2`}
                        >
                            <FutureItem 
                                item={item}
                                handleDeleteClick={handleDeleteClick}
                                handleUpdateClick={handleUpdateClick}    
                                isSelected={true}
                                isInBox={true}
                            />
                        </div>
                    );
                })}
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
            <Suspense fallback={
                <div className="flex items-center justify-center">
                    <div className="text-white text-xl">Loading...</div>
                </div>
            }>
                <ItemSelectionContent />
            </Suspense>
        </main>
    );
}
