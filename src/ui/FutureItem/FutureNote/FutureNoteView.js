import Image from "next/image";

export default function FutureNoteView({dataRef}) {    
    return (
        <div className="relative">
        <h2 className="text-3xl text-center font-bold text-white mb-2">쪽지</h2>
            <div className="relative">
                <Image 
                    src="/futurenote_detail.svg" 
                    alt="Future Note Detail" 
                    width={320} 
                    height={320} 
                    priority={true}
                    className="mx-auto" 
                />
                <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] text-center overflow-y-auto">
                    <p className="text-black text-lg whitespace-pre-wrap break-words p-4">
                        {dataRef.current?.text || ''}
                    </p>
                </div>
            </div>
        </div>
    );
};

