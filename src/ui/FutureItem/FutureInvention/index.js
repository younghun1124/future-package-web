import FutureInventionEdit from "./FutureInventionEdit";
import FutureInventionView from "./FutureInventionView";

export default function FutureInvention({modalState, dataRef}) {
    return (
        modalState==='edit'?
        <FutureInventionEdit dataRef={dataRef}/>:
        <FutureInventionView dataRef={dataRef}/>
    );
} 