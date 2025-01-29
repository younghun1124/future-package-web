import { Center } from "@chakra-ui/react";
// import RotatingImage from "./RotatingImage";
import MeteredImg from "./MeteredImg"

export default function ValueMeterMeasuring({ message = "측정 중...", imgfile }) {
    return (
        <div className="intermittent-vibration relative w-[265px]">
            <style jsx>{`
                @keyframes intermittentVibration {
                    0%, 30% { transform: translateX(0); } /* 멈춘 상태 */
                    35% { transform: translateX(-2px); } /* 진동 시작 */
                    40% { transform: translateX(2px); }
                    45% { transform: translateX(-1px); }
                    50% { transform: translateX(1px); }
                    55% { transform: translateX(0); } /* 진동 종료 */
                    100% { transform: translateX(0); } /* 멈춘 상태 유지 */
                }

                .intermittent-vibration {
                    animation: intermittentVibration 3s ease-in-out infinite;
                }
            `}</style>
            
            
            
            {/* <RotatingImage className='absolute translate-x-1/2 top-[-40px]' imgUrl={imgUrl}/> */}
            <MeteredImg className='absolute translate-x-[72px] translate-y-[-60px] top-0 left-0' imgfile={imgfile}/>
            <img
                src="https://storage.googleapis.com/future-box-cdn-public/futureitem/valuemeter/valuemeter_measuring_2x.webp"
                alt="Measuring Machine"
            />
            <div className="absolute top-[42%] w-full">
                <Center>{message}</Center>
            </div>
        </div>
    );
}
