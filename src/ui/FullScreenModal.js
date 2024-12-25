'use client';

export default function FullScreenModal({children,isOpen,onClose}) {
  //요소를 받아서 full screenmodal로 띄워주는 컴포넌트
  if (!isOpen) return null;
  return (
    <div className="absolute bg-white w-full h-screen z-50 ">          
            
        <div className="p-6">
          {children}
        </div>
        <button
          onClick={onClose}
          className="top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          닫기
        </button>
      </div>
    
  );
} 