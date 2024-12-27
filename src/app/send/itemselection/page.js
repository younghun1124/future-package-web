'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import FutureItem from '@ui/FutureItem';
import { dummyItems } from '@/mocks/items';

export default function ItemSelectionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedItems, setSelectedItems] = useState([]);

  const receiver = searchParams.get('receiver');
  const sender = searchParams.get('sender');

  const handleInsertClick = (item,contentData) => {
    const newItem = {
      ...item,
      id: item['type'],
      content: contentData
    };
    
    console.log(newItem)
    setSelectedItems([...selectedItems, newItem]);
  };
  
  const handleUpdateClick = (item,data) => {
    const newItem = {      
      ...item,
      id: item['type'],
      content:data
    };
    
    
    // selectedItems 배열을 순회하면서 
    // 업데이트할 아이템의 type과 일치하는 경우 newItem으로 교체하고
    // 일치하지 않는 경우 기존 item을 유지
    const updatedItems = selectedItems.map(item => 
      item.type === newItem.type ? newItem : item
    );    
    setSelectedItems(updatedItems);
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
                items: selectedItems.map(item => ({
                    ...item,
                    ...(item.svgData && { svgData: item.svgData }),
                    ...(item.svgImage && { svgImage: item.svgImage })
                }))
            }),
        });        
        if (response.ok) {
            router.push('/send/delivery');
        } else {
            alert('아이템 저장에 실패했습니다. 다시 시도해주세요.');
        }
    } catch (error) {
        router.push('/send/delivery');
    }
  };
  console.log("선택된 아이템")
  console.log(selectedItems)
  console.log("===========")
  return (
    <main className="flex flex-col gap-8 items-center justify-between min-h-[calc(100vh-80px)] py-8">
      {/* 아이템 선택 박스 */}
      <div className="w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4 text-center">선물 리스트</h2>
        <div className="grid grid-cols-2 gap-4">
          {dummyItems.map((item) => (
            <FutureItem 
              key={`template_${item.id}`}
              item={item} 
              handleInsertClick={handleInsertClick}
              // 현재 아이템이 이미 선택되었는지 확인
              // selectedItems 배열을 순회하면서 
              // 1. selectedItem의 type이 현재 item의 type과 일치하고
              // 2. selectedItem의 id가 현재 item의 type을 포함하는지 체크
              isSelected={selectedItems.some(selectedItem => 
                selectedItem.type === item.type && selectedItem.id.includes(item.type)
              )}
              isEdit={false}
            />            
          ))}
        </div>
      </div>

      {/* 선택된 아이템 목록 */}
      <div className="w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4 text-center">담은 선물</h2>
        {selectedItems.length === 0 ? (
          <p className="text-center text-gray-500">선물을 선택해주세요</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {selectedItems.map((item) => (              
              <div key={`selected_${item.type}`} className="relative">
                <FutureItem 
                  key={`selected_${item.type}`}
                  item={item}
                  handleUpdateClick={handleUpdateClick}    
                  isSelected={true}
                  isEdit={true}
                />
                <button
                  // 선택된 아이템 목록에서 현재 아이템을 제거
                  // selectedItems 배열에서 현재 item.id와 다른 아이템들만 필터링하여 새로운 배열 생성
                  onClick={() => setSelectedItems(selectedItems.filter(i => i.id !== item.id))}
                  className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full text-sm hover:bg-red-600"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 포장하기 버튼 */}
      <button
        onClick={handleSubmit}
        disabled={selectedItems.length === 0}
        className={`w-full py-4 rounded-lg text-white transition-all ${
          selectedItems.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-accent hover:bg-opacity-90'
        }`}
      >
        포장하기
      </button>
    </main>
  );
}
