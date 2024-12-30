import FutureGifticonEdit from "./FutureGifticonEdit";
import FutureGifticonView from "./FutureGifticonView";

export default function FutureGifticon({modalState, dataRef}) {
    return (
        modalState==='edit'?
        <FutureGifticonEdit dataRef={dataRef}/>:
        <FutureGifticonView dataRef={dataRef}/>
    );
} 