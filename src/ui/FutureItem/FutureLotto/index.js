import FutureLottoEdit from "./FutureLottoEdit";
import FutureLottoView from "./FutureLottoView";

export default function FutureLotto({modalState,dataRef}) {
    return (
        modalState==='edit'?
        <FutureLottoEdit dataRef={dataRef}/>:
        <FutureLottoView dataRef={dataRef}/>
    );
}


