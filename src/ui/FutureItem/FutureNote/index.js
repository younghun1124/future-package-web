'use client'
import dynamic from 'next/dynamic'
import FutureNoteView from "./FutureNoteView";
import FutureNoteEdit from "./FutureNoteEdit";
import DoodleButton from '@ui/buttons/DoodleButton';

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


