'use client';
import { useEffect } from 'react';
import RequestButton from '../ui/buttons/RequestButton'
import SendButton from '../ui/buttons/SendButton';
import ChannelService from '../ChannelService';

export default function Home() {
  useEffect(() => {
    try {
      ChannelService.loadScript();
      ChannelService.boot({
        pluginKey: process.env.NEXT_PUBLIC_CHANNEL_IO_KEY,
      });

      return () => {
        ChannelService.shutdown();
      };
    } catch (error) {
      console.error('ChannelIO initialization error:', error);
    }
  }, []);

  return (
    <main className="flex flex-col gap-8 items-center justify-center ">
      <h1 className="text-accent text-3xl font-bold mb-8">2047년에서 온 택배</h1>
      <div className="flex flex-col gap-4 w-full">
        <RequestButton/>
        <SendButton/>
      </div>
    </main>
  );
}
