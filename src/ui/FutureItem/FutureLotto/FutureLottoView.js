import Image from "next/image";
export default function FutureLottoView({dataRef}) {
    
    return (
        <div className="relative">
            <div className="relative">
                <Image 
                    src="/futurelotto_detail.svg" 
                    alt="Future Lotto Detail" 
                    width={320} 
                    height={320} 
                    priority={true}
                    className="mx-auto" 
                />
                <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex gap-4 justify-center w-full">
                    {dataRef.current?.numbers?.map((number, index) => (
                        <div key={index} className="w-4 h-8 rounded-full bg-white flex items-center justify-center font-bold">
                            {number}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

