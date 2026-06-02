"use client";

import { useEffect, useState, useCallback, createContext, useContext } from "react";

type Toast = {
  id: string;
  message: string;
  type: "success" | "error" | "info";
};

type ToastContextType = {
  addToast: (message: string, type?: Toast["type"]) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within Toaster");
  return ctx;
}

let globalAddToast: ToastContextType["addToast"] | null = null;

export function toast(message: string, type: Toast["type"] = "info") {
  globalAddToast?.(message, type);
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (message: string, type: Toast["type"] = "info") => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { id, message, type }]);
    },
    []
  );

  useEffect(() => {
    globalAddToast = addToast;
    return () => {
      globalAddToast = null;
    };
  }, [addToast]);

  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 4000);
    return () => clearTimeout(timer);
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-3 rounded-xl text-sm shadow-lg border border-border animate-in slide-in-from-bottom-2 ${
              t.type === "error"
                ? "bg-red-900/80 text-red-100"
                : t.type === "success"
                  ? "bg-green-900/80 text-green-100"
                  : "bg-card text-foreground"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
