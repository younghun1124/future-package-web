import Image from "next/image";
import DoodleButton from "@ui/buttons/DoodleButton"
export default function FutureNoteView({dataRef,data, isInbox,setModalState,onDelete, handleInsertWithData}) {
    const text = dataRef?.current.text || data?.text;
    return (
        <div className="relative">
            <h2 className="text-3xl text-center font-bold text-white mt-3 mb-2">쪽지</h2>
            <div className="relative">
                <Image 
                    src="/futurenote_detail.svg" 
                    alt="Future Note Detail" 
                    width={330} 
                    height={330} 
                    priority={true}
                    className="mx-auto" 
                />
                <div className="absolute top-[70%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] text-center overflow-y-auto">
                    <p className="text-black text-xl whitespace-pre-wrap break-words p-4">
                        {text || ''}
                    </p>
                </div>
                <div className="flex flex-col">
                {isInbox ? 
                <div className="flex justify-between">
                    <DoodleButton variant='white' className='self-center' onClick={()=>onDelete()}>뺄래요</DoodleButton>
                    <DoodleButton className='self-center' onClick={()=>setModalState('edit')}>수정할래요</DoodleButton>
                </div>
                :<DoodleButton className='self-center' onClick={()=>handleInsertWithData()}>담을래요</DoodleButton>
                }
                
                </div>
            </div>
        </div>
    );
};

