'use client'
import Report from './Report';
import ValueMeterDone from './ValueMeterDone';
import { useState,useEffect } from 'react';
import ValueMeterView from './ValueMeterView';
import ValueMeterMeasuring from './ValueMeterMeasuring';
import { DialogTitle } from '@chakra-ui/react';

export default function FutureValueMeter({modalState,isInbox, onDelete, setModalState, dataRef,handleInsertWithData}) {
    
    useEffect(() => {
        const imgUrls = [
            'https://storage.googleapis.com/future-box-cdn-public/futureitem/valuemeter/valuemeter_measuring_2x.webp',
            'https://storage.googleapis.com/future-box-cdn-public/futureitem/valuemeter/valuemeter_done_2x.webp',
            'https://storage.googleapis.com/future-box-cdn-public/futureitem/valuemeter/valuemeter_offline_2x.webp'
        ];
        
        const fetchImages = async () => {
            await Promise.all(imgUrls.map(url => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = url;
                    img.onload = resolve;
                });
            }));
        };

        fetchImages();
    }, []);

    return (
        <div className='flex flex-col items-center min-h-[450px]'>
                <div className=' '>
                    <DialogTitle className="text-2xl text-center text-white">
                        미래 가치 측정기
                    </DialogTitle>
                    <p className="text-white text-center mb-[100px]">
                        네가 지금 가지고 있는 것들.. 미래에는 얼마일지 궁금하지 않아?
                    </p>
                </div>
            {modalState === 'edit' ? (
                <ValueMeterView setModalState={setModalState} handleInsertWithData={handleInsertWithData} dataRef={dataRef}/>
            ) : (
                null
            )}
        </div>
    );
}


