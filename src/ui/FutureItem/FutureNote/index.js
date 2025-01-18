'use client'
import dynamic from 'next/dynamic'
import FutureNoteView from "./FutureNoteView";
import DoodleButton from '@ui/buttons/DoodleButton';
// 동적 임포트로 클라이언트 컴포넌트만 로드
const FutureNoteEdit = dynamic(() => import("./FutureNoteEdit"), {
    ssr: false
});

export default function FutureNote({modalState, dataRef}) {
    return (
        <div>
            {modalState === 'edit' ? (
                <FutureNoteEdit dataRef={dataRef}/>
            ) : (
                <FutureNoteView dataRef={dataRef}/>
            )}
        </div>
    );
}


