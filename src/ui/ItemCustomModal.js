'use client';

export default function ItemCustomModal({ item, isEdit, onSave, onClose }) {
  const getCustomFields = () => {
    switch (item.id) {
      case 'movie':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">영화 장르</label>
              <select 
                className="w-full p-2 border rounded-lg"
                defaultValue={item.genre || ''}
              >
                <option value="action">액션</option>
                <option value="romance">로맨스</option>
                <option value="sf">SF</option>
                <option value="comedy">코미디</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">관람 인원</label>
              <input 
                type="number" 
                min="1" 
                max="4"
                defaultValue={item.people || 1}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
        );
      
      case 'note':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">메시지</label>
            <textarea 
              className="w-full p-2 border rounded-lg h-32"
              placeholder="미래에서 보낼 메시지를 입력하세요"
              defaultValue={item.message || ''}
            />
          </div>
        );

      case 'lotto':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">행운의 메시지</label>
            <input 
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="행운을 비는 메시지를 입력하세요"
              defaultValue={item.message || ''}
            />
          </div>
        );

      // 다른 아이템들의 커스텀 필드도 여기에 추가
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-bold mb-4">
          {isEdit ? '선물 수정하기' : '선물 담기'}
        </h3>
        <div className="mb-6">
          {getCustomFields()}
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            취소
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-opacity-90"
          >
            {isEdit ? '수정하기' : '담기'}
          </button>
        </div>
      </div>
    </div>
  );
} 