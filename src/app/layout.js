import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "2047년에서 온 택배",
  description: "미래에서 보내는 특별한 선물",
};

export default function RootLayout({ children }) {
  return (
    <html lang='ko' suppressHydrationWarning>
    
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-primary text-base`}
      >
        <Provider>
          <div className="min-h-screen">
            <header className="w-full max-w-[393px] mx-auto px-5 py-4">
              {/* <nav>
                <Link href="/" className="text-accent font-bold">
                  Future Box
                </Link>
              </nav> */}
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