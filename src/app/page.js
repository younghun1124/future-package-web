'use client'
import { useEffect } from 'react';

import ChannelService from '../ChannelService';
import DoodleButton from '@/ui/buttons/DoodleButton'
import Link from 'next/link';

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
      <div className="flex flex-col gap-4 text-white w-full">
          <Link href='/send/form'>보낼래요</Link>
      </div>
    </main>
  );
}
