'use client'
import dynamic from 'next/dynamic'
import Report from './Report';
import DoodleButton from '@ui/buttons/DoodleButton';
import ValueMeterMeasuring from './ValueMeterMeasuring';
import ValueMeterOffline from './ValueMeterOffline';
import ValueMeterDone from './ValueMeterDone';
import { useState } from 'react';
export default function FutureValueMeter({modalState,isInbox, onDelete, setModalState, dataRef,handleInsertWithData}) {
    const [isReportOpen, setisReportOpen]=useState(false)
    return (
        <div className='relative'>
            <ValueMeterOffline/ >
            <ValueMeterMeasuring message='측정 중...'/>
            <button onClick={()=>setisReportOpen((prev)=>!prev)}><ValueMeterDone /></button>
            {isReportOpen && <Report className='absolute top-0' />}
            {/* {modalState === 'edit' ? (
                <Report setModalState={setModalState} handleInsertWithData={handleInsertWithData} dataRef={dataRef}/>
            ) : (
                <Report handleInsertWithData={handleInsertWithData} onDelete={onDelete} setModalState={setModalState} isInbox={isInbox} dataRef={dataRef}/>
            )} */}
        </div>
    );
}


