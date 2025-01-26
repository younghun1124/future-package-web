'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import FutureItem from '@ui/FutureItem';
import { dummyItems } from '@/mocks/items';
import DoodleButton from '@/ui/buttons/DoodleButton';
import LoadingPage from '@ui/LoadingPage';

function ItemSelectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  
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
    setIsLoading(true);
    try {
      // 이미지 업로드가 필요한 아이템들 처리
      const processedItems = await Promise.all(selectedItems.map(async (item) => {
        if (item.type === 'FutureFaceMirror' && item.content.svgImage) {
          try {
            const formData = new FormData();
            const file = new File([item.content.svgImage], 'face.svg', { type: 'image/svg+xml' });
            formData.append('image', file);

            const response = await fetch('/api/upload', {
              method: 'POST',
              body: formData,
            });

            if (!response.ok) {
              throw new Error('이미지 업로드에 실패했습니다.');
            }

            const data = await response.json();
            
            return {
              type: item.type,
              content: {
                imageUrl: data.filePath,
                year: 2047
              }
            };
          } catch (error) {
            console.error('이미지 업로드 오류:', error);
            throw new Error('이미지 업로드 중 오류가 발생했습니다.');
          }
        } else if (item.type === 'FutureTarot') {
          // FutureTarot의 content를 API 스펙에 맞게 가공
          return {
            type: item.type,
            content: {
              cardIndexes: item.content.cards.map(card => card.numid),
              description: item.content.description
            }
          };
        }
        
        return item;
      }));

      const response = await fetch('/api/boxes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "receiver": receiver,
          "sender": sender,
          "futureItems": processedItems,
        }),
      });
      
      if (!response.ok) {
        throw new Error('박스 생성에 실패했습니다.');
      }

      const data = await response.json();
      router.push(`/send/delivery?uuid=${data.uuid}&receiver=${receiver}&sender=${sender}`);
    } catch (error) {
      console.error('박스 생성 오류:', error);
      alert('박스 생성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleItemClick = (item) => {
    setCurrentItemType(item.type);
    setIsModalOpen(true);
  };

  console.log("선택된 아이템")
  console.log(selectedItems)
  console.log("===========")

  if (isLoading) {
    return <LoadingPage />;
  }

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
          <span className="text-white/70 text-sm">입고 예정</span>
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
                        FutureNote: 'top-0 left-0 translate-x-[20px] translate-y-[0px]',
                        FutureFaceMirror: 'top-0 left-0 translate-x-[80px] translate-y-[-10px]',
                        FutureHologram: 'top-0 left-0 translate-x-[140px] translate-y-[0px]',
                        FutureTarot: 'top-[45%]  rotate-[-4deg] left-[20%]',
                        FuturePerfume: 'top-[45%] rotate-[3deg] left-[40%]',
                        FutureGifticon: 'top-[45%] right-[7%]',
                        FutureValueMeter: 'top-[45%] left-[80%]',
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
            다 담았어요
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
                    <div className="text-white text-xl">외계인 기다리는 중...</div>
                </div>
            }>
                <ItemSelectionContent />
            </Suspense>
        </main>
    );
}
