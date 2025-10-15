"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type Toast = {
  id: string;
  title?: string;
  description: string;
  duration?: number;
};

type ToastContextValue = {
  showToast: (toast: Omit<Toast, "id">) => void;
  dismissToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const DEFAULT_DURATION = 4000;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    ({ title, description, duration }: Omit<Toast, "id">) => {
      const id = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36);
      setToasts((current) => [...current, { id, title, description, duration }]);

      const timeout = duration ?? DEFAULT_DURATION;
      if (timeout > 0) {
        window.setTimeout(() => dismissToast(id), timeout);
      }
    },
    [dismissToast],
  );

  const value = useMemo(() => ({ showToast, dismissToast }), [showToast, dismissToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[200] flex flex-col items-center gap-3 px-4 sm:inset-x-auto sm:right-4 sm:items-end">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto w-full max-w-sm rounded-2xl border border-stone-200 bg-white/95 p-4 shadow-lg shadow-[rgba(27,15,10,0.18)] backdrop-blur"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                {toast.title ? <p className="text-sm font-semibold text-[var(--color-deep)]">{toast.title}</p> : null}
                <p className="mt-1 text-sm text-[var(--color-ink)]/80">{toast.description}</p>
              </div>
              <button
                type="button"
                aria-label="Dismiss notification"
                onClick={() => dismissToast(toast.id)}
                className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-stone-300 text-xs text-stone-500 transition hover:border-stone-400 hover:text-stone-700"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
