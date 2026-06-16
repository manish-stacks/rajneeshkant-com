"use client";

import { useState, useCallback } from "react";

type ToastType = "success" | "error";
interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

let counter = 0;

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const push = useCallback((message: string, type: ToastType = "success") => {
    const id = ++counter;
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3000);
  }, []);

  const ToastContainer = () => (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white shadow-lg animate-fade-in ${
            t.type === "success" ? "bg-emerald-500" : "bg-rose-500"
          }`}
        >
          {t.type === "success" ? "✓" : "✕"} {t.message}
        </div>
      ))}
    </div>
  );

  return { push, ToastContainer };
}
