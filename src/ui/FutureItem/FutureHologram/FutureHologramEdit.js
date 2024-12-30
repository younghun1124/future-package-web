import { useEffect, useRef, useState } from 'react';
import { DialogHeader, DialogTitle } from '@chakra-ui/react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

export default function FutureHologramEdit({ dataRef }) {    
    const [strokeWidth, setStrokeWidth] = useState(4);
    const [strokeColor, setStrokeColor] = useState("#000000");
    const [isEraser, setIsEraser] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        
        const initCanvas = async () => {
            try {
                await canvasRef.current.clearCanvas();
                if (dataRef.current?.svgData) {
                    await canvasRef.current.loadPaths(dataRef.current.svgData);
                }
            } catch (error) {
                console.error("Canvas initialization error:", error);
            }
        };

        initCanvas();
    }, []);

    const handleCanvasChange = async () => {
        if (!canvasRef.current) return;
    
        try {
            const newPaths = await canvasRef.current.exportPaths();
            const svgImage = await canvasRef.current.exportSvg();
            
            dataRef.current = {
                svgData: newPaths,
                svgImage: svgImage
            };
        } catch (error) {
            console.error('Canvas change error:', error);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center py-4 text-white">
                    홀로그램
                </DialogTitle>
                <p className="text-white">
                    미래의 홀로그램에 그림을 그려보세요!
                </p>
            </DialogHeader>

            <div className="flex justify-between items-center">
                {/* 도구 컨트롤 */}
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
                            isEraser ? 'bg-white' : 'bg-blue-500 text-white'
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
                            isEraser ? 'bg-blue-500 text-white' : 'bg-white'
                        }`}
                    >
                        지우개 모드
                    </button>
                </div>

                {/* 작업 취소 및 다시 실행 */}
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            canvasRef.current?.undo();
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
                    </button>
                    <button 
                        onClick={() => {
                            canvasRef.current?.clearCanvas();
                            handleCanvasChange();
                        }}
                        className="px-3 py-1 border rounded"
                    >
                        전체지우기
                    </button>
                </div>
            </div>

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