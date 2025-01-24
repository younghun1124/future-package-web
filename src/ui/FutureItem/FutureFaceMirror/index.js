'use client';
import FutureFaceMirrorView from "./FutureFaceMirrorView";
import FutureFaceMirrorEdit from "./FutureFaceMirrorEdit";
import DoodleButton from "@/ui/buttons/DoodleButton";
import { useEffect } from "react";
export default function FutureFaceMirror({ 
    modalState, 
    receiver, 
    dataRef, 
    handleInsertWithData, 
    setModalState, 
    onDelete, 
    isInbox 
}) {
    useEffect(()=>{
        const img = new Image();
        img.src = "https://storage.googleapis.com/future-box-cdn-public/futureitem/mirror/mirror_frame_vertical_2x.webp";
    },[])
    const renderButtons = () => {
        switch (modalState) {
            case 'edit':
                return ( <div className="flex justify-center">
                    <DoodleButton onClick={()=>setModalState('insertPreview')}>
                        다 그렸어요
                    </DoodleButton>
                </div>); // 편집 모드의 버튼은 Edit 컴포넌트 내부에서 처리
            case 'insertPreview':
                return (
                    <div className="flex justify-center">
                        <DoodleButton onClick={handleInsertWithData}>
                            담을래요
                        </DoodleButton>
                    </div>
                );
            case 'preview':
                return (
                    <div className="flex justify-center gap-4">
                        <DoodleButton
                            variant="white"
                            width={130}
                            onClick={onDelete}
                        >
                            뺄래요
                        </DoodleButton>
                        <DoodleButton
                            width={130}
                            onClick={() => setModalState('edit')}
                        >
                            다시 그릴래요
                        </DoodleButton>
                    </div>
                );
            case 'view':
                return (
                    <div className="flex justify-center">
                        <DoodleButton variant='white' disabled>
                            이미지 저장
                        </DoodleButton>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col gap-6">
            {modalState === 'edit' && (
                <FutureFaceMirrorEdit 
                    onSave={(data) => {
                        dataRef.current = data;
                        setModalState('preview');
                    }}
                    receiver={receiver}
                    dataRef={dataRef}
                />
            )}
            
            {(modalState === 'insertPreview'|| modalState==='preview'|| modalState === 'view') && (
                <FutureFaceMirrorView 
                    data={dataRef?.current}
                    dataRef={dataRef}
                    receiver={receiver}
                />
            )}

            {renderButtons()}
        </div>
    );
}


