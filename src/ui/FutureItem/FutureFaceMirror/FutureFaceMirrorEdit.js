'use client'
import { useEffect, useRef, useState } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import DoodleButton from '@ui/buttons/DoodleButton';
import { DialogTitle } from '@chakra-ui/react';
import { Center } from '@chakra-ui/react';
export default function FutureFaceMirrorEdit({ dataRef,receiver }) {    
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
            
                <DialogTitle className="text-2xl text-white text-center">
                    {receiver}님의 미래를 비추는 거울
                </DialogTitle>
                <div className="text-white text-center">
                    <p className="text-white">
                        2047년을 보여주자. 발전된 세상, 나이 든 친구 얼굴..
                    </p>
                </div>
                <Center>
                    <ReactSketchCanvas
                    ref={canvasRef}
                    width="235px"
                    height="360px"
                    onChange={handleCanvasChange}
                    strokeWidth={strokeWidth}
                    strokeColor={strokeColor}
                    exportWithBackgroundImage={false}
                />
                </Center>
            {/* 도구 섹션 */}
            <div className="flex flex-col justify-between items-center">
                <div className="flex w-[235px] gap-2 justify-between">
                    <input 
                        type="color" 
                        value={strokeColor}
                        onChange={(e) => {
                            setStrokeColor(e.target.value);
                            setIsEraser(false)
                            canvasRef.current?.eraseMode(false);
                        }}
                        className={`w-8 h-8`}
                        
                    />
                    
                    <button
                        onClick={() => {
                            setIsEraser(false);
                            canvasRef.current?.eraseMode(false);
                        }}
                        className={` rounded`}
                    >
                         <img src="https://storage.googleapis.com/future-box-cdn-public/futureitem/mirror/pen_white_2x.webp" alt="지우개" className={`w-8 h-8 ${!isEraser&& "hidden"}`} />
                         <img src="https://storage.googleapis.com/future-box-cdn-public/futureitem/mirror/pen_active_2x.webp" alt="지우개" className={`w-8 h-8 ${isEraser&& "hidden"}`} />
                    </button>
                    <button
                        onClick={() => {
                            setIsEraser(true);
                            canvasRef.current?.eraseMode(true);
                        }}
                        className={` rounded `}
                    >
                        <img src="https://storage.googleapis.com/future-box-cdn-public/futureitem/mirror/eraser_white_2x.webp" alt="지우개" className={`w-8 h-8 ${isEraser&& "hidden"}`} />
                        <img src="https://storage.googleapis.com/future-box-cdn-public/futureitem/mirror/eraser_active_2x.webp" alt="지우개" className={`w-8 h-8 ${!isEraser&& "hidden"}`} />
                    </button>
                    <button 
                        onClick={() => {
                            canvasRef.current?.clearCanvas();
                            handleCanvasChange();
                        }}
                        className="p-1 w-[38.60px] text-xs h-[37.82px] text-white bg-[#d9d9d9]/50 rounded-[9px]"
                    >
                        전체<br></br>지우기
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
                    <input 
                        type="range" 
                        min="1" 
                        max="40" 
                        value={strokeWidth}
                        onChange={(e) => setStrokeWidth(Number(e.target.value))}
                        className={`w-32 accent-[#44e8af]`}
                    />
                   
                </div>
            </div>

            {/* 캔버스 */}
            
        </div>
    );
}
