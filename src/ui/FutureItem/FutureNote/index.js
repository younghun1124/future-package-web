'use client'
import dynamic from 'next/dynamic'
import FutureNoteView from "./FutureNoteView";
import FutureNoteEdit from "./FutureNoteEdit";
import DoodleButton from '@ui/buttons/DoodleButton';
// 동적 임포트로 클라이언트 컴포넌트만 로드

export default function FutureNote({modalState,isInbox, onDelete, setModalState, dataRef,handleInsertWithData}) {
    return (
        <div>
            {modalState === 'edit' ? (
                <FutureNoteEdit setModalState={setModalState} handleInsertWithData={handleInsertWithData} dataRef={dataRef}/>
            ) : (
                <FutureNoteView handleInsertWithData={handleInsertWithData} onDelete={onDelete} setModalState={setModalState} isInbox={isInbox} dataRef={dataRef}/>
            )}
        </div>
    );
}


