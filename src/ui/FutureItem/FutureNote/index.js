import FutureNoteEdit from "./FutureNoteEdit";
import FutureNoteView from "./FutureNoteView";

export default function FutureNote({modalState,dataRef}) {
    return (
        modalState==='edit'?
        <FutureNoteEdit dataRef={dataRef}/>:
        <FutureNoteView dataRef={dataRef}/>
    );
}


