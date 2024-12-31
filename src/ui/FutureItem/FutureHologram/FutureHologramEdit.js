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
                // FormData 생성
                const formData = new FormData();
                formData.append('image', file);
                
                // API 호출
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('이미지 업로드에 실패했습니다.');
                }

                const data = await response.json();
                
                // 미리보기 URL 설정
                setPreviewUrl(data.imageUrl);
                
                // dataRef 업데이트
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
        <div className="flex flex-col gap-4">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center py-4 text-white">
                    홀로그램
                </DialogTitle>
                <p className="text-white text-center">
                    홀로그램으로 만들 사진을 선택해주세요!
                </p>
            </DialogHeader>

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
            </div>
        </div>
    );
} 