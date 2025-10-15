"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import type { AddItemPayload, CartItem, OrderTotals } from "@/types/order";
import { STORAGE_KEY, computeLineTotal, formatMenuItemForCheckout } from "@/types/order";

export type OrderContextValue = {
  items: CartItem[];
  totals: OrderTotals;
  isHydrated: boolean;
  addItem: (payload: AddItemPayload) => string;
  updateItemQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getCheckoutDraft: () => {
    items: ReturnType<typeof formatMenuItemForCheckout>[];
    totals: OrderTotals;
  };
};

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        setItems(parsed);
      }
    } catch (error) {
      console.error("Failed to load stored cart", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Failed to persist cart", error);
    }
  }, [items, isHydrated]);

  const addItem = useCallback(({ item, price, modifiers, quantity, notes }: AddItemPayload) => {
    const id = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36);

    const entry: CartItem = {
      id,
      menuItemId: item.id,
      name: item.name,
      size: price.size,
      basePrice: price.amount,
      modifiers,
      quantity,
      notes,
    };

    setItems((current) => [...current, entry]);
    return id;
  }, []);

  const updateItemQuantity = useCallback((id: string, quantity: number) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, quantity),
            }
          : item,
      ),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totals = useMemo<OrderTotals>(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + computeLineTotal(item), 0);
    return { itemCount, subtotal };
  }, [items]);

  const value = useMemo<OrderContextValue>(
    () => ({
      items,
      totals,
      isHydrated,
      addItem,
      updateItemQuantity,
      removeItem,
      clearCart,
      getCheckoutDraft: () => ({
        items: items.map(formatMenuItemForCheckout),
        totals,
      }),
    }),
    [addItem, clearCart, isHydrated, items, removeItem, totals, updateItemQuantity],
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}
