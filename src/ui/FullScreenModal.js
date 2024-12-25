'use client';

export default function FullScreenModal({children}) {
  //요소를 받아서 full screenmodal로 띄워주는 컴포넌트
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full h-full bg-white">
        {/* children은 React.ReactNode 타입으로 단일 요소나 여러 요소를 모두 렌더링할 수 있습니다 */}
        {children}
      </div>
    </div>
  );
} 