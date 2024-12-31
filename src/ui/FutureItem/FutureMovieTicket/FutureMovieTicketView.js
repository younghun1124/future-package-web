import { DialogHeader, DialogTitle } from '@chakra-ui/react';

export default function FutureMovieTicketView({ data, dataRef }) {    
    const movieData = dataRef?.current || data;

    if (!movieData) {
        return <div>선택된 영화 데이터 없음</div>
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <DialogHeader>
                <DialogTitle className="text-white text-2xl font-bold text-center py-4">
                    미래 영화 티켓
                </DialogTitle>
            </DialogHeader>
            
            <div className="flex flex-col items-center text-white justify-center w-full">
                <img 
                    src={movieData.detailImageUrl}
                    alt="영화 티켓"
                    className="w-[240px]"
                />
                <h3 className="text-xl font-bold text-center mt-4">{movieData.name}</h3>
                <p className="text-center text-gray-200">{movieData.description}</p>
            </div>
        </div>
    );
} 