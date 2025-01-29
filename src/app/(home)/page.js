import DoodleButton from '@/ui/buttons/DoodleButton';
import Link from 'next/link';
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center relative">
      {/* 배경 이미지 */}
      <div 
        className="absolute inset-0 z-0 bg-[url('https://storage.googleapis.com/future-box-cdn-public/static/assets/home/home_img_1_5x.webp')] 
        bg-cover bg-center bg-no-repeat"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center w-full h-screen">
        {/* 상단 텍스트 */}
        <div className="text-center mt-16 relative">
          <h1 className="text-4xl font-bold mb-4 absolute inset-0" style={{ WebkitTextStroke: '8px white', color: 'transparent' }}>
            2047에서 온 <span>선물</span>
          </h1>
          <h1 className="text-4xl font-bold mb-4 relative">
            2047에서 온 <span className="text-accent">선물</span>
          </h1>
        </div>

        {/* 하단 버튼 */}
        <div className="mt-auto mb-[100px]">
        <Link href="/intro">
          <DoodleButton 
            width="160px"
            className="px-8 py-3"
          >
            시작하기
          </DoodleButton>
          </Link>
        </div>
      </div>
    </main>
  );
}
