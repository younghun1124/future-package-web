import Navbar from "../../ui/Navbar";

export default function ReceiveLayout({ children }) {
  return (
    <>
      {/* 네비게이션 버튼 */}
      <Navbar />
      {children}
    </>
  );
}
