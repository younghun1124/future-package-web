'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import ItemCustomModal from '../../../ui/ItemCustomModal'
//테스트 주석
const FUTURE_ITEMS = [
  { id: 'movie', name: '미래 영화 티켓' },
  { id: 'note', name: '미래에서 온 편지' },
  { id: 'lotto', name: '미래 로또 번호' },
  { id: 'invention', name: '미래의 발명품' },
  { id: 'hologram', name: '홀로그램 메시지' },
];

export default function ItemSelectionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedItems, setSelectedItems] = useState([]);
  const [modalItem, setModalItem] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const receiver = searchParams.get('receiver');
  const sender = searchParams.get('sender');

  const handleItemClick = (item) => {
    setModalItem(item);
    setIsEdit(false);
  };

  const handleEditItem = (item) => {
    setModalItem(item);
    setIsEdit(true);
  };

  const handleSaveItem = (customData) => {
    if (isEdit) {
      setSelectedItems(selectedItems.map(item => 
        item.id === modalItem.id ? { ...item, ...customData } : item
      ));
    } else {
      setSelectedItems([...selectedItems, { ...modalItem, ...customData }]);
    }
    setModalItem(null);
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
          items: selectedItems,
        }),
      });

     
      if (response.ok) {
        router.push('/send/delivery');
      } else {
        alert('아이템 저장에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      router.push('/send/delivery');
    //   console.error('Error:', error);
    //   alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <main className="flex flex-col gap-8 items-center justify-between min-h-[calc(100vh-80px)] py-8">
      {/* 아이템 선택 박스 */}
      <div className="w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4 text-center">미래의 선물 상자</h2>
        <div className="grid grid-cols-2 gap-4">
          {FUTURE_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedItems.find(i => i.id === item.id)
                  ? 'border-accent bg-accent/10'
                  : 'border-gray-200 hover:border-accent/50'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* 선택된 아이템 목록 */}
      <div className="w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4 text-center">담은 선물</h2>
        {selectedItems.length === 0 ? (
          <p className="text-center text-gray-500">선물을 선택해주세요</p>
        ) : (
          <ul className="space-y-2">
            {selectedItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <span onClick={() => handleEditItem(item)}>{item.name}</span>
                <button
                  onClick={() => setSelectedItems(selectedItems.filter(i => i.id !== item.id))}
                  className="text-sm text-red-500"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
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

      {/* 커스텀 모달 */}
      {modalItem && (
        <ItemCustomModal
          item={modalItem}
          isEdit={isEdit}
          onSave={handleSaveItem}
          onClose={() => setModalItem(null)}
        />
      )}
    </main>
  );
}
