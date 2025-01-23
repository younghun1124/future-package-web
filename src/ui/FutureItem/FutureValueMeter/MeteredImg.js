export default function MeteredImg({ className, imgfile }) {
    if (!imgfile) return null;

    return (
        <div className={className}>
            <img
                src={URL.createObjectURL(imgfile)}
                alt="측정 이미지"
                className="w-[120px] h-[120px] object-cover rounded-lg"
            />
        </div>
    );
}
