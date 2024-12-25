import ShareButton from '@/ui/buttons/ShareButton';
import SendButton from '@/ui/buttons/SendButton';

export default function Home() {
  return (
    <main className="flex flex-col gap-8 items-center justify-center min-h-[calc(100vh-80px)]">
      <h1 className="text-accent text-3xl font-bold mb-8">2047년에서 온 택배</h1>
      <div className="flex flex-col gap-4 w-full">
        <ShareButton/>
        <SendButton/>        
      </div>
    </main>
  );
}
