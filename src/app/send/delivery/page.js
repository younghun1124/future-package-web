import Image from 'next/image';
import NavigateButton from '@/ui/buttons/NavigateButton';

export default function DeliveryPage() {
  return (
    <main className="flex flex-col gap-8 items-center justify-between min-h-[calc(100vh-80px)] py-8">
      {/* 택배 박스 애니메이션 */}
      <div className="flex-1 w-full flex items-center justify-center">
        <div>
          <Image 
            src='/future_package.svg'
            alt="미래 택배 상자"
            width={300}
            height={300}
            priority
          />      
        </div>
      </div>

      {/* 배송하기 버튼 */}
      <div className="w-full flex justify-center">
        <NavigateButton href="/send/complete">
          배송하기
        </NavigateButton>
      </div>
    </main>
  );
}




