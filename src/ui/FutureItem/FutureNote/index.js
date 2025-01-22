'use client'
import dynamic from 'next/dynamic'
import FutureNoteView from "./FutureNoteView";
import FutureNoteEdit from "./FutureNoteEdit";
import FutureNotePreview from "./FutureNotePreview";
import DoodleButton from '@ui/buttons/DoodleButton';

export default function FutureNote({modalState,isInbox, onDelete, setModalState, dataRef,handleInsertWithData}) {
    
    return (
        <div>
            {(() => {
                switch (modalState) {
                    case 'edit':
                        return <FutureNoteEdit setModalState={setModalState} handleInsertWithData={handleInsertWithData} dataRef={dataRef} />;
                    case 'preview':
                        return <FutureNotePreview handleInsertWithData={handleInsertWithData} onDelete={onDelete} setModalState={setModalState} isInbox={isInbox} dataRef={dataRef} />;
                    case 'view':
                        return <FutureNoteView handleInsertWithData={handleInsertWithData} onDelete={onDelete} setModalState={setModalState} isInbox={isInbox} dataRef={dataRef} />;
                    default:
                        return null;
                }
            })()}
        </div>
    );
}


