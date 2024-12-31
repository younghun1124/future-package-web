'use client'
import { DialogHeader, DialogTitle } from '@chakra-ui/react';
import { useState, useRef } from 'react';

export default function FutureHologramEdit({ dataRef }) {    
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

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
                    imageUrl: data.imageUrl
                };

            } catch (error) {
                console.error('이미지 업로드 오류:', error);
                alert('이미지 업로드 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full">
            <DialogHeader className="w-full text-center">
                <DialogTitle className="text-2xl font-bold py-4 text-white">
                    홀로그램
                </DialogTitle>
                <p className="text-white">
                    홀로그램으로 만들 사진을 선택해주세요!
                </p>
            </DialogHeader>

            {/* 미리보기 영역 */}
            <div className="relative w-[280px] aspect-[255/170] bg-gray-100 rounded-lg overflow-hidden mx-auto">
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
        </div>
    );
} 