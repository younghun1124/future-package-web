import FuturePerfumeView from "./FuturePerfumeView";
import FuturePerfumePreview from "./FuturePerfumePreview";

import Perfume from "./Perfume";
import FuturePerfumeEdit from "./FuturePerfumeEdit";
import FuturePerfumeInsertPreview from "./FuturePerfumeInsertPreview";
export default function FuturePerfume({modalState, isInbox, onDelete, setModalState,sender,dataRef, handleInsertWithData}) {
    return (
        <>
            {(() => {
                switch (modalState) {
                    case 'edit':
                        return <FuturePerfumeEdit setModalState={setModalState} handleInsertWithData={handleInsertWithData} dataRef={dataRef} />;
                    case 'insertPreview':
                        return <FuturePerfumeInsertPreview setModalState={setModalState} handleInsertWithData={handleInsertWithData} dataRef={dataRef} />;
                    case 'preview':
                        return <FuturePerfumePreview setModalState={setModalState} handleInsertWithData={handleInsertWithData} onDelete={onDelete} isInbox={isInbox} dataRef={dataRef} />;
                    case 'view':
                        return <FuturePerfumeView 
                            setModalState={setModalState} sender={sender} handleInsertWithData={handleInsertWithData} onDelete={onDelete} isInbox={isInbox} dataRef={dataRef}
                        />;
                    default:
                        return "해당 모달이 없습니다.";
                }
            })()}
        </>
    );
}