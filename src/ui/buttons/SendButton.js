import Link from 'next/link';
export default function SendButton({ className = '' }) {
  return (
    <Link
      href="/send/form"
      className={`w-full py-4 border-2 border-accent text-accent rounded-lg hover:bg-accent hover:text-white transition-all text-center ${className}`}
    >
      택배 보내기
    </Link>
  );
} 