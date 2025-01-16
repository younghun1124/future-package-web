'use client'
import { useEffect, useRef, useState } from 'react';
import { DialogHeader, DialogTitle } from '@chakra-ui/react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

export default function FutureFaceMirrorEdit({ dataRef }) {    
    const [strokeWidth, setStrokeWidth] = useState(4);
    const [strokeColor, setStrokeColor] = useState("#000000");
    const [isEraser, setIsEraser] = useState(false);
    const canvasRef = useRef(null);

    // modalState가 변경될 때마다 캔버스 초기화 및 데이터 로드
    useEffect(() => {
        if (!canvasRef.current) return;
        
        const initCanvas = async () => {
            try {
                // 캔버스 초기화
                await canvasRef.current.clearCanvas();
                
                // edit 모드이거나 이전 데이터가 있을 때 로드
                if (dataRef.current?.svgData) {
                    const savedPaths = dataRef.current.svgData;
                    await canvasRef.current.loadPaths(savedPaths);
                }
            } catch (error) {
                console.error("Canvas initialization error:", error);
            }
        };

        initCanvas();
    }, []);

    // 캔버스 상태 변경 처리
    const handleCanvasChange = async () => {
        if (!canvasRef.current) return;
    
        try {
            const newPaths = await canvasRef.current.exportPaths();
            const svgImage = await canvasRef.current.exportSvg();
            
            
            dataRef.current = {
                svgData: newPaths,
                svgImage:svgImage
            };
            console.log(dataRef.current)
        } catch (error) {
            console.error('Canvas change error:', error);
        }
    };

    // 전체 지우기 버튼 핸들러
    const handleClearCanvas = async () => {
        if (!canvasRef.current) return;
        
        await canvasRef.current.clearCanvas();
        setPaths([]);
        dataRef.current = {
            svgData: [],
            svgImage: null
        };
    };

    const handleSave = async () => {
        if (!canvasRef.current) return;
        
        try {
            setPaths([]);
            const svgData = await canvasRef.current.getSvgXML();
            const formData = new FormData();
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
            formData.append('image', svgBlob, `mirror-${Date.now()}.svg`);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('이미지 업로드에 실패했습니다.');
            }

            const data = await response.json();
            dataRef.current = {
                imageUrl: data.filePath
            };

        } catch (error) {
            console.error('저장 중 오류 발생:', error);
            alert('저장 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <DialogHeader>
                <DialogTitle className="text-2xl text-center py-4 text-white">
                    미래의 거울
                </DialogTitle>
                <p className="text-white">
                    미래는 어떤 모습일까요? 미래의 모습을 그려 선물해보세요.
                </p>
            </DialogHeader>

            {/* 도구 섹션 */}
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <input 
                        type="color" 
                        value={strokeColor}
                        onChange={(e) => setStrokeColor(e.target.value)}
                        className={`w-8 h-8 ${isEraser ? 'opacity-50' : ''}`}
                        disabled={isEraser}
                    />
                    <input 
                        type="range" 
                        min="1" 
                        max="10" 
                        value={strokeWidth}
                        onChange={(e) => setStrokeWidth(Number(e.target.value))}
                        className="w-32"
                    />
                    <button
                        onClick={() => {
                            setIsEraser(false);
                            canvasRef.current?.eraseMode(false);
                        }}
                        className={`px-3 py-1 border rounded ${
                            isEraser ? 'bg-white' : 'bg-accent text-white'
                        }`}
                    >
                        그리기 모드
                    </button>
                    <button
                        onClick={() => {
                            setIsEraser(true);
                            canvasRef.current?.eraseMode(true);
                        }}
                        className={`px-3 py-1 border rounded ${
                            isEraser ? 'bg-accent text-white' : 'bg-white'
                        }`}
                    >
                        지우개 모드
                    </button>
                </div>

                {/* 작업 취소 및 다시 실행 */}
                <div className="flex gap-2">
                        {/* <button
                        onClick={() => {
                            if (!canvasRef.current) {
                                console.warn("Canvas reference is null.");
                                return;
                            }
                            canvasRef.current.undo();
                            handleCanvasChange();
                        }}
                        className="px-3 py-1 border rounded"
                    >
                        실행취소
                    </button>
                    <button 
                        onClick={() => {
                            canvasRef.current?.redo();
                            handleCanvasChange();
                        }}
                        className="px-3 py-1 border rounded"
                    >
                        다시실행
                    </button> */}
                    <button 
                        onClick={() => {
                            canvasRef.current?.clearCanvas();
                            handleCanvasChange();
                        }}
                        className="px-3 py-1 border rounded"
                    >
                        전체 지우기
                    </button>
                </div>
            </div>

            {/* 캔버스 */}
            <ReactSketchCanvas
                ref={canvasRef}
                width="100%"
                height="100%"
                style={{ aspectRatio: '255/170' }}
                onChange={handleCanvasChange}
                strokeWidth={strokeWidth}
                strokeColor={isEraser ? "#ffffff" : strokeColor}                
                exportWithBackgroundImage={false}
            />
        </div>
    );
}
