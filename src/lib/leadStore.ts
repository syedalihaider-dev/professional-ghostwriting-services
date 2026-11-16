"use client";

import { useSyncExternalStore } from "react";

/** Global state for the "Begin your book" dialog (opened from many CTAs). */
type LeadState = { open: boolean; service: string };

let state: LeadState = { open: false, service: "" };
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const leadStore = {
  open(service = "") {
    state = { open: true, service };
    emit();
  },
  close() {
    state = { ...state, open: false };
    emit();
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  get: () => state,
};

const serverState: LeadState = { open: false, service: "" };

export function useLeadState() {
  return useSyncExternalStore(leadStore.subscribe, leadStore.get, () => serverState);
}
