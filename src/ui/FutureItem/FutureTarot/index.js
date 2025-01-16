'use client'

import FutureTarotView from "./FutureTarotView";
import FutureTarotEdit from "./FutureTarotEdit"
// 동적 임포트로 클라이언트 컴포넌트만 로드


export default function FutureNote({modalState, dataRef}) {
    return (
        <div>
            {modalState === 'edit' ? (
                <FutureTarotEdit dataRef={dataRef}/>
            ) : (
                <FutureTarotView dataRef={dataRef}/>
            )}
        </div>
    );
}


