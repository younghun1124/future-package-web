'use client';
import Link from 'next/link';
import DoodleButton from './DoodleButton';

export default function NavigateButton({ href, children,className ,...props}) {
  return (
    <Link href={href}>
      <DoodleButton className={className} {...props}>
        {children}
      </DoodleButton>
    </Link>
  );
} 