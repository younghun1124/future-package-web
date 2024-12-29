'use client';
import Link from 'next/link';
import DoodleButton from './DoodleButton';

export default function NavigateButton({ href, children }) {
  return (
    <Link href={href}>
      <DoodleButton>
        {children}
      </DoodleButton>
    </Link>
  );
} 