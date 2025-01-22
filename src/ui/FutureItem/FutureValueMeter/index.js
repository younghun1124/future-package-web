'use client'
import Report from './Report';
import ValueMeterDone from './ValueMeterDone';
import { useState,useEffect } from 'react';
import ValueMeterView from './ValueMeterView';
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
        <div className='relative'>
            {modalState === 'edit' ? (
                <ValueMeterView setModalState={setModalState} handleInsertWithData={handleInsertWithData} dataRef={dataRef}/>
            ) : (
                <Report handleInsertWithData={handleInsertWithData} onDelete={onDelete} setModalState={setModalState} isInbox={isInbox} dataRef={dataRef}/>
            )}
        </div>
    );
}


