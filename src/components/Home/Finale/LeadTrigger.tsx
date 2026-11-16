"use client";

import { leadStore } from "@/lib/leadStore";

/** A bare button that opens the Begin-your-book dialog (styling supplied by the caller). */
export default function LeadTrigger({ className, label }: { className?: string; label: string }) {
  return (
    <button type="button" className={className} onClick={() => leadStore.open()} aria-haspopup="dialog" data-cursor="Write">
      <span>{label}</span>
      <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
        <path d="M3 10h13M11 4.5 16.5 10 11 15.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    </button>
  );
}
