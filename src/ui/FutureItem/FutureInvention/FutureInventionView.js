import { DialogHeader, DialogTitle } from '@chakra-ui/react';

export default function FutureInventionView({ dataRef ,data}) {    
    const selectedInvention = dataRef?.current||data;

    if (!selectedInvention) {
        return null;
    }

    return (
        <div className="flex flex-col text-white  items-center gap-4">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center py-4">
                    미래 발명품
                </DialogTitle>
            </DialogHeader>
            
            <div className="w-full max-w-sm">
                <img 
                    src={selectedInvention.imageUrl}
                    alt={selectedInvention.name}
                    className="w-full h-auto"
                />
                <h3 className="text-xl font-bold text-center mt-4">{selectedInvention.name}</h3>
                <p className="text-center text-gray-400">{selectedInvention.description}</p>
            </div>
        </div>
    );
} 