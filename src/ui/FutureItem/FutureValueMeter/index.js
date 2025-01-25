'use client'
import { useState,useEffect } from 'react';
import ValueMeterView from './ValueMeterView';
import DoodleButton from '@/ui/buttons/DoodleButton';

import ValueMeterPreview from './ValueMeterPreview';
import { DialogTitle } from '@chakra-ui/react';
import ValueMeterEdit from './ValueMeterEdit';
export default function FutureValueMeter({modalState,isInbox, onDelete,isReceive, setModalState, dataRef,handleInsertWithData}) {
    
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
            {(() => {
                switch(modalState) {
                    case 'edit':
                        return <ValueMeterEdit 
                            setModalState={setModalState} 
                            handleInsertWithData={handleInsertWithData} 
                            dataRef={dataRef}
                        />;
                    case 'preview':
                        return <ValueMeterPreview 
                            setModalState={setModalState} 
                            handleInsertWithData={handleInsertWithData} 
                            dataRef={dataRef}
                            onDelete={onDelete}
                        />;
                    default:
                        return <ValueMeterView 
                            setModalState={setModalState} 
                            handleInsertWithData={handleInsertWithData} 
                            dataRef={dataRef}
                        >
                            {!isInbox && 
                                <DoodleButton   
                                    onClick={handleInsertWithData} 
                                >
                                    담을래요
                                </DoodleButton>
                            }
                            {isReceive&&<DoodleButton variant='white' >이미지 저장</DoodleButton>}
                        </ValueMeterView>;
                }
            })()}
        </div>
    );
}


