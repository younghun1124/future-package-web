'use client'
import { DialogHeader, DialogTitle } from '@chakra-ui/react';
import { useState, useRef } from 'react';
import DoodleButton from '@ui/buttons/DoodleButton';
export default function FutureHologramEdit({ dataRef ,handleInsertWithData,setModalState}) {    
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);
    const [phase, setPhase] = useState('uploadImg');
    
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('image', file);
                
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('이미지 업로드에 실패했습니다.');
                }

                const data = await response.json();
                setPreviewUrl(data.imageUrl);
                dataRef.current = {
                    imageUrl: data.filePath
                };

            } catch (error) {
                console.error('이미지 업로드 오류:', error);
                alert('이미지 업로드 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full">
           
                <DialogTitle className="text-2xl  text-white">
                    홀로그램
                </DialogTitle>
                <p className="text-white">
                    과거로 보내고 싶은 사진. 하나쯤은 있을걸?
                </p>

            {/* 미리보기 영역 */}
            <div className="relative w-[280px] aspect-[255/170] rounded-lg overflow-hidden mx-auto">
                {previewUrl ? (
                    <img 
                        src={previewUrl} 
                        alt="미리보기" 
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        <img src="https://storage.googleapis.com/future-box-cdn-public/futureitem/hologram/hologram_skeleton_2x.webp" alt="미리보기" className="w-full h-full object-contain"/>
                    </div>
                )}
            </div>

            {/* 버튼 영역 */}
            <div className="flex justify-center w-full">
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
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
            </div>
            <DoodleButton 
                onClick={() => setModalState('insertPreview')}
                disabled={!previewUrl}
            >
                골랐어요
            </DoodleButton>
        </div>
    );
} 