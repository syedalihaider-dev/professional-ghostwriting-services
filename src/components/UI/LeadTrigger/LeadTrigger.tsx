"use client";

import { leadStore } from "@/lib/leadStore";

/** A bare button that opens the enquiry dialog; styling comes from the caller. */
export default function LeadTrigger({ className, label, cursor }: { className?: string; label: string; cursor?: string }) {
  return (
    <button type="button" className={className} onClick={() => leadStore.open()} aria-haspopup="dialog" data-cursor={cursor}>
      <span>{label}</span>
      <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
        <path d="M3 10h13M11 4.5 16.5 10 11 15.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </button>
  );
}
