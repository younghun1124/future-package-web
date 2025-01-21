'use client';
import FutureTarotView from "./FutureTarotView";
import FutureTarotEdit from "./FutureTarotEdit";
import DoodleButton from "@/ui/buttons/DoodleButton";
import FutureTarotPreview from "./FutureTarotPreview";
export default function FutureTarot({ 
    modalState, 
    receiver, 
    dataRef, 
    handleInsertWithData, 
    setModalState, 
    onDelete, 
    isInbox 
}) {
    const renderButtons = () => {
        switch (modalState) {
            case 'edit':
                return null;
            case 'preview':
                return (
                    <div className="flex justify-center">
                        <DoodleButton onClick={handleInsertWithData}>
                            담을래요
                        </DoodleButton>
                    </div>
                );
            case 'view':
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
                            바꿀래요
                        </DoodleButton>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-[27.5px] text-white text-center">
                {receiver || '익명의 친구'}의 미래를 보여주는 카드
            </h2>
            
            {modalState === 'edit' && (
                <FutureTarotEdit 
                    handleInsertWithData={handleInsertWithData}
                    onSave={(data) => {
                        dataRef.current = data;
                        handleInsertWithData();
                    }}
                    receiver={receiver}
                />
            )}
            
            {modalState === 'view'  && (
                <FutureTarotPreview 
                    data={dataRef?.current}
                    receiver={receiver}
                />
            )}
            

            {renderButtons()}
        </div>
    );
}


