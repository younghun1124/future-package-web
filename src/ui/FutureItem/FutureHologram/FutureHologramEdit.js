import { DialogHeader, DialogTitle } from '@chakra-ui/react';
import { useState, useRef } from 'react';

export default function FutureHologramEdit({ dataRef }) {    
    const [previewUrl, setPreviewUrl] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const streamRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
                dataRef.current = {
                    imageUrl: reader.result
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' } // 후면 카메라 사용
            });
            videoRef.current.srcObject = stream;
            streamRef.current = stream;
            setShowCamera(true);
        } catch (err) {
            console.error("카메라 접근 실패:", err);
            alert("카메라를 사용할 수 없습니다.");
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setShowCamera(false);
    };

    const capturePhoto = () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
        
        const imageUrl = canvas.toDataURL('image/jpeg');
        setPreviewUrl(imageUrl);
        dataRef.current = {
            imageUrl: imageUrl
        };
        
        stopCamera();
    };

    return (
        <div className="flex flex-col gap-4">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center py-4 text-white">
                    홀로그램
                </DialogTitle>
                <p className="text-white text-center">
                    홀로그램으로 만들 사진을 선택하거나 촬영해주세요!
                </p>
            </DialogHeader>

            {/* 카메라 뷰 */}
            {showCamera ? (
                <div className="relative w-full aspect-[255/170]">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                        <button
                            onClick={capturePhoto}
                            className="px-4 py-2 bg-white rounded-lg text-black"
                        >
                            촬영하기
                        </button>
                        <button
                            onClick={stopCamera}
                            className="px-4 py-2 bg-red-500 rounded-lg text-white"
                        >
                            취소
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    {/* 미리보기 영역 */}
                    <div className="relative w-full aspect-[255/170] bg-gray-100 rounded-lg overflow-hidden">
                        {previewUrl ? (
                            <img 
                                src={previewUrl} 
                                alt="미리보기" 
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                                이미지를 선택해주세요
                            </div>
                        )}
                    </div>

                    {/* 버튼 영역 */}
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20"
                        >
                            갤러리에서 선택
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <button
                            onClick={startCamera}
                            className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20"
                        >
                            사진 촬영하기
                        </button>
                    </div>
                </>
            )}
        </div>
    );
} 