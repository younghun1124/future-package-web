import { Center } from "@chakra-ui/react";
import { useState } from "react";
import Report from "./Report";
import MeteredImg from "./MeteredImg";

export default function ValueMeterDone({imgfile,value=10000}) {

    return (      
            <div className='relative w-[265px]'>
             <MeteredImg className='absolute translate-x-[72px] translate-y-[-60px] top-0 left-0' imgfile={imgfile}/>
                <img 
                    src='https://storage.googleapis.com/future-box-cdn-public/futureitem/valuemeter/valuemeter_done_2x.webp' 
                    alt="Value Meter Done"
                    width={555}
                />
                <div className="absolute top-[40%] w-full">
                    <Center className="text-xl">{value}₩</Center>
                </div>
                <div className="absolute top-[65%] w-full">
                    <Center className="text-xl">분석본 보기</Center>
                </div>
            </div>
    );
}


