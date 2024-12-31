import Image from 'next/image';
import Link from 'next/link';
import DoodleButton from '@/ui/buttons/DoodleButton';

// params로 boxid를 받아옵니다
export default function DeliveryPage ({params}) {
    const { boxid } = params;

    return (
        <main className="flex flex-col gap-8 items-center justify-between py-8">
           
            <div className="flex-1 w-full flex items-center justify-center">
                <div>
                    <Image 
                        src='/ufo.svg'
                        alt="배달 ufo" 
                        width={150}
                        height={130}
                        className='ml-auto'
                    />   
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
                <Link href={`/receive/${boxid}/items`}>
                    <DoodleButton color="black">
                        상자 열기
                    </DoodleButton>
                </Link>
            </div>
        </main>
    );
};






