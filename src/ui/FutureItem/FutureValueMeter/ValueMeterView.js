'use client'
import { useState } from 'react';
import { Center } from '@chakra-ui/react';
import DoodleButton from '@/ui/buttons/DoodleButton';
import Image from 'next/image';
import ValueMeterOffline from './ValueMeterOffline';
import ValueMeterMeasuring from './ValueMeterMeasuring';
import ValueMeterDone from './ValueMeterDone';
import Report from './Report';
export default function ValueMeterView({ onSave ,receiver, handleInsertWithData}) {
    const [selectedCards, setSelectedCards] = useState([]);
    const [phase, setPhase] = useState('uploadImg');
    const [description, setDescription] = useState('');
    const [isReportOpen, setisReportOpen]=useState(false)

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

    const renderPhaseContent = () => {
        switch (phase) {
            case 'uploadImg':
                return (
                    <>
                        <ValueMeterOffline/>
                        <div className="flex justify-around">
                            <DoodleButton
                                onClick={() => setPhase('measuring')}
                            >
                                측정할래요
                            </DoodleButton>
                        </div>
                    </>
                );

            case 'measuring':
                setTimeout(() => {
                    setPhase('done');
                }, 2000);
                return (
                    
                        <ValueMeterMeasuring/>
                    
                );
            case 'done':
                return(
                    <>
                        <button onClick={()=>setisReportOpen((prev)=>!prev)}><ValueMeterDone /></button>
                        {isReportOpen && <Report className='absolute top-0' />}
                    </>
                    
                )
            default:
                return null;
        }
    };

    return (
            renderPhaseContent()
    );
}
