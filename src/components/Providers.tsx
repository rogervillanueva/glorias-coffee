"use client";

import { OrderProvider } from "./order/OrderProvider";
import { ToastProvider } from "./ui/ToastProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <OrderProvider>{children}</OrderProvider>
    </ToastProvider>
  );
}
