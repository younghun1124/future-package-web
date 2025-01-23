import { Center } from "@chakra-ui/react";
import { useState } from "react";
import Report from "./Report";
import MeteredImg from "./MeteredImg";

export default function ValueMeterDone({imgfile}) {

    return (      
            <div className='relative w-[265px]'>
             <Center><MeteredImg className='absolute translate-x-1/2 top-[-40px]' imgfile={imgfile}/></Center>
                <img 
                    src='https://storage.googleapis.com/future-box-cdn-public/futureitem/valuemeter/valuemeter_done_2x.webp' 
                    alt="Value Meter Done"
                    width={555}
                />
                <div className="absolute top-[65%] w-full">
                    <Center>분석본 보기</Center>
                </div>
            </div>
    );
}


