'use client'
import { useState } from 'react';
import { Center } from '@chakra-ui/react';
import DoodleButton from '@/ui/buttons/DoodleButton';
import Image from 'next/image';
import ValueMeterOffline from './ValueMeterOffline';
import ValueMeterMeasuring from './ValueMeterMeasuring';
import ValueMeterDone from './ValueMeterDone';
import ValueMeterReport from './ValueMeterReport';
import Report from './Report';

export default function ValueMeterPreview({ onSave, receiver, handleInsertWithData, setModalState, dataRef, onDelete }) {
    const [phase, setPhase] = useState('uploadImg');
    const [measureData, setMeasureData] = useState(null);
    const [formData, setFormData] = useState(new FormData());
    const [isMeasuring, setIsMeasuring] = useState(false);

    const handleImageUpload = async (file) => {
        setPhase('measuring');
        
        const newFormData = new FormData();
        newFormData.append('image', file);
        setFormData(newFormData);

        try {
            const response = await fetch('/api/valuemeter', {
                method: 'POST',
                body: newFormData
            });

            if (!response.ok) {
                throw new Error('가치 측정 실패');
            }

            const data = await response.json();
            setMeasureData(data.predictions);
            console.log(data.predictions);
            setPhase('done');
        } catch (error) {
            console.error('가치 측정 중 오류:', error);
            alert('가치 측정에 실패했습니다. 다시 시도해주세요.');
            setPhase('uploadImg');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsMeasuring(true);
        // ... 기존의 submit 로직 ...
    };



    return (
        <>
        <ValueMeterOffline onImageSelect={handleImageUpload} />
        <Center>
            <DoodleButton variant='white'
                    onClick={onDelete}
                >
             뺄래요
             </DoodleButton>
            <DoodleButton 
                    onClick={()=>setModalState('view')}
                >
             다시 해볼래요
             </DoodleButton>
        </Center>
        
    </>
       
    );
}
