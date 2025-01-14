import Link from 'next/link';

export default function Modal({ children }) {
  return (
    <>
      <Link 
        href="/send/itemselection"
        className="fixed inset-0 bg-black/60 z-40"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div className="bg-[#585858] rounded-lg p-6 max-w-[90%] max-h-[90vh] overflow-y-auto pointer-events-auto">
          {children}
        </div>
      </div>
    </>
  );
}