export default function MeteredImg({ className, imgfile }) {
   
    return (
        <div className={className}>
            <img
                src={URL.createObjectURL(imgfile)}
                // src='https://avatars.githubusercontent.com/u/9395362?u=2be660ce6ddfb3536aec8ab82cfb9d182829b2b0&v=4&size=80'
                alt="측정 이미지"
                className="w-[120px] h-[120px] object-cover rounded-lg"
            />
        </div>
    );
}
