'use client';
import { useRouter } from 'next/navigation';

export default function ReceiverPage() {
  const router = useRouter();
  
  return (
    <main className="flex flex-col gap-8 items-center justify-center min-h-[calc(100vh-80px)]">      
      <form className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="receiver" className="text-sm text-gray-600">받는 사람 별명</label>
          <input 
            type="text"
            id="receiver"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
            placeholder="받는 사람의 별명을 입력하세요"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="sender" className="text-sm text-gray-600">보내는 사람 별명</label>
          <input 
            type="text"
            id="sender"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
            placeholder="보내는 사람의 별명을 입력하세요"
          />
        </div>
        <button 
          type="button"
          onClick={() => {
            const receiver = document.getElementById('receiver').value;
            const sender = document.getElementById('sender').value;
            router.push(`/send/itemselection?receiver=${receiver}&sender=${sender}`);
          }}
          className="mt-4 px-6 py-3 bg-accent text-white rounded-lg hover:bg-opacity-90 transition-all"
        >
          다음으로
        </button>
      </form>
    </main>
  );
}