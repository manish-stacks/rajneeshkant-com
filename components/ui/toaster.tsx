"use client";

export function Toaster() {
  // Using a simple implementation. In production, connect to a toast library.
  return <div id="toast-container" className="fixed bottom-4 right-4 z-50 flex flex-col gap-2" />;
}
