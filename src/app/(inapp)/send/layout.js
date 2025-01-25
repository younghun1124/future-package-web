"use client"
import Navbar from "@/ui/Navbar";

export default function SendLayout({ children }) {
  

  return (
    <>
      {/* 네비게이션 버튼 */}
      <Navbar/>
      {children}
    </>
  );
}
