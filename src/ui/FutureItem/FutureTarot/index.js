import FutureTarotView from "./FutureTarotView";
import FutureTarotEdit from "./FutureTarotEdit"

export default function FutureNote({modalState, receiver, dataRef}) {
    modalState='view'
    return (
        <div>
        <div className="flex flex-col text-white  text-center gap-6">
                <h2 className="text-[27.5px] text-center">
                    {receiver || '익명의 친구'}의 미래를 보여주는 카드
                </h2>
                {(() => {

                switch (modalState) {
                    case 'edit':
                        return <FutureTarotEdit dataRef={dataRef}/>
                    
                    case 'view':
                        return <FutureTarotView dataRef={dataRef}/>
                }
                })()}
        </div>
            
        </div>
    );
}


