import { Gaegu } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider"

const gaegu = Gaegu({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-gaegu',
});

// 배경 이미지 URL을 가져오는 함수
const getBackgroundImageUrl = () => {
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL;
  const bgImage = process.env.NEXT_PUBLIC_BG_IMAGE;
  
  // CDN URL이 설정되어 있으면 CDN에서, 아니면 로컬에서 로드
  return cdnUrl ? `${cdnUrl}${bgImage}` : bgImage;
};

export const metadata = {
  title: "2047년에서 온 택배",
  description: "미래에서 보내는 특별한 선물",
};

export default function RootLayout({ children }) {
  const bgImageUrl = getBackgroundImageUrl();

  return (
    <html lang='ko' suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href={bgImageUrl}
          as="image"
        />
      </head>
      <body
        className={`${gaegu.variable} font-gaegu antialiased text-base animate-fadeIn`}
        style={{
          backgroundImage: "url('/bgdark.png')",
          backgroundRepeat: 'repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <Provider>
          <div className="min-h-screen">
            <header className="w-full max-w-[393px] mx-auto px-5 py-4">
            </header>
            <div className="w-full max-w-[393px] mx-auto px-5">
              {children}
            </div>
          </div>
        </Provider>
      </body>        
    </html>
  );
}