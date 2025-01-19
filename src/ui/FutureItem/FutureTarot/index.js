'use client'

import FutureTarotView from "./FutureTarotView";
import FutureTarotEdit from "./FutureTarotEdit"
import DoodleButton from "@/ui/buttons/DoodleButton"
// 동적 임포트로 클라이언트 컴포넌트만 로드


export default function FutureNote({modalState, dataRef}) {
    return (
        <div>
            {(() => {
                switch (modalState) {
                    case 'edit':
                        return (
                            <>
                                <FutureTarotEdit dataRef={dataRef}/>
                                {/* <DoodleButton onClick={handleComplete}>완료</DoodleButton> */}
                            </>
                        );
                    case 'view':
                        return <FutureTarotView dataRef={dataRef}/>;
                }
            })()}
        </div>
    );
}


