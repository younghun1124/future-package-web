import { Center } from "@chakra-ui/react";
import { useState } from "react";
import Report from "./Report";

export default function ValueMeterDone() {

    return (      
            <div className='relative w-[265px]'>
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


