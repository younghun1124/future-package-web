import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col gap-8 items-center justify-center min-h-[calc(100vh-80px)]">
      <h1 className="text-accent text-3xl font-bold mb-8">2047년에서 온 택배</h1>
      <div className="flex flex-col gap-4 w-full">
        <a
          href="/request"
          className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-opacity-90 transition-all text-center"
        >
          친구에게 요청하기
        </a>
        <a
          href="/send/receivername"
          className="px-6 py-3 border-2 border-accent text-accent rounded-lg hover:bg-accent hover:text-white transition-all text-center"
        >
          택배 보내기
        </a>
      </div>
    </main>
  );
}
