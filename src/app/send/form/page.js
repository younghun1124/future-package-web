'use client';
import { useRouter } from 'next/navigation';
import DoodleButton from '@/ui/buttons/DoodleButton';

const ReceiverPage = () => {
  const router = useRouter();
  
  const wrapperStyle = "relative  h-14 bg-[url('/doodlebox_white.svg')] bg-[length:100%_100%] bg-no-repeat bg-center";
  const inputStyle = "w-full h-full px-4 bg-transparent focus:outline-none absolute inset-0";
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const receiver = document.getElementById('receiver').value;
    const sender = document.getElementById('sender').value;
    router.push(`/send/itemselection?receiver=${receiver}&sender=${sender}`);
  };
  
  return (
    <main className="flex flex-col gap-8 items-center justify-center min-h-[calc(100vh-80px)]">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="receiver" className="text-sm text-gray-600">받는 사람 별명</label>
          <div className={wrapperStyle}>
            <input 
              type="text"
              id="receiver"
              className={inputStyle}
              placeholder="받는 사람의 별명을 입력하세요"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="sender" className="text-sm text-gray-600">보내는 사람 별명</label>
          <div className={wrapperStyle}>
            <input 
              type="text"
              id="sender"
              className={inputStyle}
              placeholder="보내는 사람의 별명을 입력하세요"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <DoodleButton 
            color="black"                    
            type="submit"
          >다음으로</DoodleButton>
        </div>
      </form>
    </main>
  );
};

export default ReceiverPage;