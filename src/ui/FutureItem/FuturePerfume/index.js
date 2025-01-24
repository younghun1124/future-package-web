import FuturePerfumeView from "./FuturePerfumeView";
import FuturePerfumePreview from "./FuturePerfumePreview";

import Perfume from "./Perfume";
import FuturePerfumeEdit from "./FuturePerfumeEdit";
// import FuturePerfumePreview from "./FuturePerfumePreview";
export default function FuturePerfume({modalState, isInbox, onDelete, setModalState, dataRef, handleInsertWithData}) {
    return (
        <>
            {(() => {
                switch (modalState) {
                    case 'edit':
                        return <FuturePerfumeEdit setModalState={setModalState} handleInsertWithData={handleInsertWithData} dataRef={dataRef} />;
                    case 'preview':
                        return <FuturePerfumePreview setModalState={setModalState} handleInsertWithData={handleInsertWithData} onDelete={onDelete} isInbox={isInbox} dataRef={dataRef} />;
                    case 'view':
                        return <Perfume caseId={dataRef.current?.caseId} colorId={dataRef.current?.colorId} />;
                    default:
                        return "해당 모달이 없습니다.";
                }
            })()}
        </>
    );
} 