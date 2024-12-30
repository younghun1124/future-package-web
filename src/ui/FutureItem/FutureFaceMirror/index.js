import FutureFaceMirrorEdit from "./FutureFaceMirrorEdit";
import FutureFaceMirrorView from "./FutureFaceMirrorView";

export default function FutureFaceMirror({modalState,dataRef}) {
    return (
        modalState==='edit'?
        <FutureFaceMirrorEdit dataRef={dataRef}/>:
        <FutureFaceMirrorView dataRef={dataRef}/>
    );
}


