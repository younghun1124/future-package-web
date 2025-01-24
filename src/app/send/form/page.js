'use client';
import { useRouter } from 'next/navigation';
import DoodleButton from '@/ui/buttons/DoodleButton';
import { useState } from 'react';

const ReceiverPage = () => {
  const router = useRouter();
  const [receiver, setReceiver] = useState('');
  const [sender, setSender] = useState('');
  
  const wrapperStyle = "relative h-14 bg-[url('https://storage.googleapis.com/future-box-cdn-public/static/assets/doodlebox/doodlebox_white_2x.webp')] bg-no-repeat bg-center";
  const inputStyle = "w-[200px] h-full px-4 bg-transparent focus:outline-none absolute left-1/2 -translate-x-1/2 inset-0";
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!receiver || !sender) return;
    router.push(`/send/itemselection?receiver=${receiver}&sender=${sender}`);
  };
  
  const isFormValid = receiver.trim() && sender.trim();
  
  return (
    <main className="flex flex-col gap-8 items-center text-3xl justify-center min-h-[calc(100vh-80px)]">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="receiver" className="text-center text-white">{new Date().getFullYear()}년의..</label>
          <div className={wrapperStyle}>
            <input 
              type="text"
              id="receiver"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              className={inputStyle}
              placeholder="받는사람 이름"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="sender" className="text-center text-white">2047년의..</label>
          <div className={wrapperStyle}>
            <input 
              type="text"
              id="sender"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className={inputStyle}
              placeholder="보내는사람 이름"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <DoodleButton 
            color="black"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}
          >
            다음
          </DoodleButton>
        </div>
      </form>
    </main>
  );
};

export default ReceiverPage;