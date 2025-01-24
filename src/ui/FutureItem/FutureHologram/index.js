import FutureHologramEdit from "./FutureHologramEdit";
import FutureHologramView from "./FutureHologramView";
import FutureHologramPreview from "./FutureHologramPreview";
export default function FutureHologram({modalState,isInbox, onDelete, setModalState, dataRef,handleInsertWithData}) {
    return (
        <>
            {(() => {
                switch (modalState) {
                    case 'edit':
                        return <FutureHologramEdit setModalState={setModalState} handleInsertWithData={handleInsertWithData} dataRef={dataRef} />;
                    case 'preview':
                        return <FutureHologramPreview setModalState={setModalState} handleInsertWithData={handleInsertWithData} onDelete={onDelete} isInbox={isInbox} dataRef={dataRef}  />;
                    case 'view':
                        return <FutureHologramView handleInsertWithData={handleInsertWithData} onDelete={onDelete} setModalState={setModalState} isInbox={isInbox} dataRef={dataRef} />;
                    default:
                        return "해당 모달이 없습니다.";
                }
            })()}
        </>
    );
} 