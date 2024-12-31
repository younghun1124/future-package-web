import Image from "next/image";

export default function FutureLottoView({ data }) {    
    return (
        <div className="relative">
            <div className="relative">
                <Image 
                    src="/futurelotto_detail.png" 
                    alt="Future Lotto Detail" 
                    width={320} 
                    height={320} 
                    priority={true}
                    className="mx-auto" 
                />
                <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex gap-2 justify-center w-full">
                    {data?.numbers?.map((number, index) => (
                        <div key={index} className="w-5 h-5 bg-black rounded-full text-white flex items-center justify-center font-bold">
                            {number}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

