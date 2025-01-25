import FutureGifticonEdit from "./FutureGifticonEdit";
import FutureGifticonView from "./FutureGifticonView";
import FutureGifticonPreview from "./FutureGifticonPreview";
import FutureGifticonInsertPreview from "./FutureGifticonInsertPreview";
export default function FutureGifticon({modalState, dataRef, setModalState, handleInsertWithData, onDelete}) {
    return (
        <>
            {(() => {
                switch (modalState) {
                    case 'edit':
                        return <FutureGifticonEdit dataRef={dataRef} setModalState={setModalState} handleInsertWithData={handleInsertWithData}/>;
                    case 'insertPreview':
                        return <FutureGifticonInsertPreview dataRef={dataRef} setModalState={setModalState} handleInsertWithData={handleInsertWithData}/>;
                    case 'preview':
                        return <FutureGifticonPreview onDelete={onDelete} dataRef={dataRef} setModalState={setModalState} handleInsertWithData={handleInsertWithData}/>;
                    case 'view':
                        return <FutureGifticonView dataRef={dataRef}/>;
                    default:
                        return null;
                }
            })()}
        </>
    );
} 