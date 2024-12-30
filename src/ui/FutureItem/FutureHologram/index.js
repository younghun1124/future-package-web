import FutureHologramEdit from "./FutureHologramEdit";
import FutureHologramView from "./FutureHologramView";

export default function FutureHologram({modalState, dataRef}) {
    return (
        modalState==='edit'?
        <FutureHologramEdit dataRef={dataRef}/>:
        <FutureHologramView dataRef={dataRef}/>
    );
} 