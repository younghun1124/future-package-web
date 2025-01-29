export default function GifticonDetail({imageUrl}) {
    
    return (
        <div className="relative flex justify-center items-center w-full">
                <img 
                    src={imageUrl} 
                    alt="기프티콘 이미지"
                    className=" h-[250px]"
                />
            </div>
    );
}


