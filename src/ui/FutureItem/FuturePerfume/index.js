// import FuturePerfumeEdit from "./FuturePerfumeEdit";
// import FuturePerfumeView from "./FuturePerfumeView";

import Perfume from "./Perfume";
import FuturePerfumeEdit from "./FuturePerfumeEdit";
// import FuturePerfumePreview from "./FuturePerfumePreview";
export default function FuturePerfume({modalState,isInbox, onDelete, setModalState, dataRef,handleInsertWithData}) {
    return (
        <>
            {(() => {
                switch (modalState) {
                    case 'edit':
                        return <FuturePerfumeEdit caseId={2} colorId={null} setModalState={setModalState} handleInsertWithData={handleInsertWithData} dataRef={dataRef} />;
                    case 'preview':
                        return <Perfume caseId={1} colorId={1} setModalState={setModalState} handleInsertWithData={handleInsertWithData}  onDelete={onDelete} isInbox={isInbox} dataRef={dataRef}  />;
                    case 'view':
                        return <Perfume handleInsertWithData={handleInsertWithData} onDelete={onDelete} setModalState={setModalState} isInbox={isInbox} dataRef={dataRef} />;
                    default:
                        return "해당 모달이 없습니다.";
                }
            })()}
        </>
    );
} 