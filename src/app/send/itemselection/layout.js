'use client'
import Link from "next/link";

export default function ItemSelectionLayout({ children, itemmodal }) {
  return (
    <div>
      {children}
      {itemmodal}
    </div>
  );
} 