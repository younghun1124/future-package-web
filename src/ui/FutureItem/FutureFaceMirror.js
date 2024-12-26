import { useEffect, useRef, useState } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

export default function FutureFaceMirror({ item, isEdit, dataRef, onDataChange }) {    
    const [strokeWidth, setStrokeWidth] = useState(4);
    const [strokeColor, setStrokeColor] = useState("#000000");
    const [isEraser, setIsEraser] = useState(false);
    const canvasRef = useRef(null);
    
    useEffect(() => {
        const loadSavedPaths = async () => {
            if (canvasRef.current && item.svgData) {
                // 캔버스 초기화 후 저장된 경로 로드
                await canvasRef.current.clearCanvas();
                await canvasRef.current.loadPaths(item.svgData);
            }
        };
        
        loadSavedPaths();
    }, [item.svgData, item]);
    
    const handleCanvasChange = async () => {
        if (!canvasRef.current) return;
        
        try {
            const paths = await canvasRef.current.exportPaths();
            const svgImage = await canvasRef.current.exportSvg();
            
            console.log('Canvas changed:', { paths, svgImage });
            
            dataRef.current={
                // 상태 업데이트를 위해 새로운 객체 생성
                // 기존 item의 svgData와 svgImage를 새로운 값으로 덮어씁니다
                // spread 연산자(...item)로 기존 item의 모든 속성을 복사한 후
                // svgData와 svgImage를 새로운 값으로 업데이트합니다
                ...item, // 기존 item의 모든 속성 복사
                svgData: paths, // 새로운 paths로 svgData 덮어쓰기
                svgImage: svgImage // 새로운 svgImage로 덮어쓰기
            }
        } catch (error) {
            console.error('Canvas change error:', error);
        }
    };

    const toggleEraser = () => {
        setIsEraser(!isEraser);
        if (canvasRef.current) {
            if (!isEraser) {
                // 지우개 모드로 전환
                canvasRef.current.eraseMode(true);
            } else {
                // 그리기 모드로 전환
                canvasRef.current.eraseMode(false);
            }
        }
    };

    return (
        <div className="flex flex-col gap-4">
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
                        onClick={toggleEraser}
                        className={`px-3 py-1 border rounded ${
                            isEraser ? 'bg-blue-500 text-white' : 'bg-white'
                        }`}
                    >
                        {isEraser ? '지우개 모드' : '그리기 모드'}
                    </button>
                </div>
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
                height="400px"
                onChange={handleCanvasChange}
                strokeWidth={strokeWidth}
                strokeColor={isEraser ? "#ffffff" : strokeColor}                
                exportWithBackgroundImage={true}                          
            />
        </div>
    );
}
