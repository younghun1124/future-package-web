'use client';
import { useRouter } from 'next/navigation';
import DoodleButton from '@/ui/buttons/DoodleButton';

const ReceiverPage = () => {
  const router = useRouter();
  
  const wrapperStyle = "relative h-14 bg-[url('https://storage.googleapis.com/future-box-cdn-public/static/assets/doodlebox/doodlebox_white_2x.webp')] bg-no-repeat bg-center";
  const inputStyle = "w-[200px] h-full px-4 bg-transparent focus:outline-none absolute left-1/2 -translate-x-1/2 inset-0";
  
  const handleSubmit = () => {
    const receiver = document.getElementById('receiver').value;
    const sender = document.getElementById('sender').value;
    router.push(`/send/itemselection?receiver=${receiver}&sender=${sender}`);
  };
  
  return (
    <main className="flex flex-col gap-8 items-center  text-3xl justify-center min-h-[calc(100vh-80px)]">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2 ">
          <label htmlFor="receiver" className="text-center text-white">{new Date().getFullYear()}년의..</label>
          <div className={wrapperStyle}>
            <input 
              type="text"
              id="receiver"
              className={inputStyle}
              placeholder="수신자 별명"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="sender" className=" text-center  text-white">2047년의..</label>
          <div className={wrapperStyle}>
            <input 
              type="text"
              id="sender"
              className={inputStyle}
              placeholder="보내는사람 별명"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <DoodleButton 
            color="black"
            onClick={handleSubmit}
          >다음</DoodleButton>
        </div>
      </form>
    </main>
  );
};

export default ReceiverPage;