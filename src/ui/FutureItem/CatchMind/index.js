import CatchMindEdit from "./CatchMindEdit";
import CatchMindView from "./CatchMindView";

export default function CatchMind({modalState,dataRef}) {
    return (
        modalState==='edit'?
        <CatchMindEdit dataRef={dataRef}/>:
        <CatchMindView dataRef={dataRef}/>
    );
}


