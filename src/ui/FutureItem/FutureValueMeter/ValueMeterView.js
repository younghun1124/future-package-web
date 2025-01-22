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

export default function ValueMeterView({ onSave, receiver, handleInsertWithData }) {
    const [selectedCards, setSelectedCards] = useState([]);
    const [phase, setPhase] = useState('uploadImg');
    const [description, setDescription] = useState('');
    const [isReportOpen, setIsReportOpen] = useState(false);
    const [measureData, setMeasureData] = useState(null);

    const handleCardSelect = (card) => {
        setSelectedCards(prev => {
            if (prev.some(c => c.id === card.id)) {
                return prev.filter(c => c.id !== card.id);
            }
            if (prev.length < 3) {
                return [...prev, card];
            }
            return prev;
        });
    };

    const handleSave = () => {
        if (selectedCards.length !== 3 || !description) return;
        onSave({
            cards: selectedCards,
            description: description
        });
    };

    const handleImageUpload = async (file) => {
        setPhase('measuring');
        
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('/api/valuemeter', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('가치 측정 실패');
            }

            const data = await response.json();
            setMeasureData(data.predictions);
            setPhase('done');
        } catch (error) {
            console.error('가치 측정 중 오류:', error);
            alert('가치 측정에 실패했습니다. 다시 시도해주세요.');
            setPhase('uploadImg');
        }
    };

    const renderPhaseContent = () => {
        switch (phase) {
            case 'uploadImg':
                return (
                    <>
                        <ValueMeterOffline onImageSelect={handleImageUpload} />
                        <div className="flex justify-around">
                            <input 
                                type="file" 
                                id="imageUpload"
                                accept="image/*"
                                capture="environment"
                                className="hidden"
                                onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                        handleImageUpload(e.target.files[0]);
                                    }
                                }}
                            />
                            <DoodleButton
                                onClick={() => document.getElementById('imageUpload').click()}
                            >
                                측정할래요
                            </DoodleButton>
                        </div>
                    </>
                );

            case 'measuring':
                return <ValueMeterMeasuring />;

            case 'done':
                return <ValueMeterReport data={measureData} />;

            default:
                return null;
        }
    };

    return renderPhaseContent();
}
