'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import FutureItem from '@ui/FutureItem';
import { dummyItems } from '@/mocks/items';
import Image from 'next/image';

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
  
  const handleDeleteClick= (item)=>{
    setSelectedItems(selectedItems.filter(i => i.id !== item.id))
  }

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
    <main className="flex flex-col h-full">
      <h2 className="text-2xl font-normal text-white text-center py-4">친구에게 보낼 선물을 담아보세요!</h2>
      
      {/* 아이템 선택 영역 - 고정 높이 */}
      <div className="h-[280px]">
        <div className="grid grid-cols-4 grid-rows-2 gap-4 place-items-center h-full">
          {dummyItems.map((item) => (
            <FutureItem 
              
              key={item.id}
              item={item} 
              handleInsertClick={handleInsertClick}
              isSelected={selectedItems.some(selectedItem => 
                selectedItem.type === item.type && selectedItem.id.includes(item.type)
              )}
              isEdit={false}
            />  
          ))}
          
          <div className='flex-col place-items-center'>
            <Image 
              src="/questionmark_icon.svg"
              alt="입고 예정" 
              width={75} 
              height={75}   
              priority={true}
            />
            <div className='text-white text-sm mt-1'>입고 예정</div>
          </div>
        </div>
      </div>

      {/* 선택된 아이템 목록 - 남은 공간 채우기 */}
      <div className="flex-1 overflow-y-auto min-h-[200px] p-6">
        <h2 className="text-lg font-bold mb-4 text-center text-white">담은 선물</h2>
        {selectedItems.length === 0 ? (
          <p className="text-center text-white">선물을 선택해주세요</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {selectedItems.map((item) => (              
              <div key={`selected_${item.type}`} className="relative">
                <FutureItem 
                  key={`selected_${item.type}`}
                  item={item}
                  handleDeleteClick={handleDeleteClick}
                  handleUpdateClick={handleUpdateClick}    
                  isSelected={true}
                  isinBox={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 포장하기 버튼 - 하단 고정 */}
      <div className="p-4">
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
      </div>
    </main>
  );
}
