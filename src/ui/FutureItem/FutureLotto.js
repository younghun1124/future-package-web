import { useEffect, useRef, useState } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

export default function FutureFaceMirror({ item, dataRef, }) {    

    const dataRef = useRef(null);

    useEffect(() => {
        const loadSavedData = async () => {
                await canvasRef.current.loadPaths(item.content.svgData);
        };
        
        loadSavedData();
    }, [item]);
    
    const handleDataChange = async () => {
        if (!canvasRef.current) return;
        
        try {
            dataRef.current={    
            }
        } catch (error) {
            console.error('Canvas change error:', error);
        }
    };


    return (
        
    );
}
