import FutureMovieTicketEdit from "./FutureMovieTicketEdit";
import FutureMovieTicketView from "./FutureMovieTicketView";

export default function FutureMovieTicket({modalState, dataRef}) {
    return (
        modalState==='edit'?
        <FutureMovieTicketEdit dataRef={dataRef}/>:
        <FutureMovieTicketView dataRef={dataRef}/>
    );
} 