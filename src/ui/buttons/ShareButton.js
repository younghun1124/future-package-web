'use client';
import {shareWebsite} from "../../utils/share";

export default function ShareButton({ className = '' }) {
  return (
    <button
      onClick={shareWebsite}
      className={`w-full py-4 bg-accent text-white rounded-lg hover:bg-opacity-90 transition-all ${className}`}
    >
      친구에게 요청하기
    </button>
  );
} 