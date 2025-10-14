"use client";

import Link from "next/link";
import { useState } from "react";

import { useOrder } from "./OrderProvider";
import { useToast } from "../ui/ToastProvider";
import { computeLineTotal, computeUnitPrice } from "@/types/order";

function formatCurrency(amount: number) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function CheckoutView() {
  const { items, totals, updateItemQuantity, removeItem, getCheckoutDraft } = useOrder();
  const { showToast } = useToast();
  const [pendingRemovalId, setPendingRemovalId] = useState<string | null>(null);

  const handleDecrease = (id: string) => {
    const item = items.find((entry) => entry.id === id);
    if (!item) return;
    if (item.quantity === 1) {
      setPendingRemovalId(id);
      return;
    }
    updateItemQuantity(id, item.quantity - 1);
  };

  const handleIncrease = (id: string) => {
    const item = items.find((entry) => entry.id === id);
    if (!item) return;
    updateItemQuantity(id, item.quantity + 1);
  };

  const confirmRemoval = () => {
    if (!pendingRemovalId) return;
    removeItem(pendingRemovalId);
    setPendingRemovalId(null);
  };

  const cancelRemoval = () => {
    setPendingRemovalId(null);
  };

  const handleCheckout = () => {
    const draft = getCheckoutDraft();

    // When integrating with Square, send `draft` to a Next.js API route that calls the Square Orders API:
    // https://developer.squareup.com/reference/square/orders-api/create-order
    // From that API route you can generate payment links, fire webhooks, or create tickets for the POS.

    console.info("Checkout draft", draft);
    showToast({
      title: "Checkout preview ready",
      description: `${draft.items.length} item${draft.items.length === 1 ? "" : "s"} queued. See console for payload.`,
    });
  };

  const pendingRemovalItem = pendingRemovalId ? items.find((entry) => entry.id === pendingRemovalId) : undefined;

  return (
    <div className="min-h-screen bg-[var(--color-page-bg)] pb-24">
      <section className="bg-[var(--color-deep)]/95 py-14 text-[var(--color-cream)]">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6">
          <p className="text-xs uppercase tracking-[0.5em] text-[var(--color-accent-soft)]">Checkout</p>
          <h1 className="text-4xl font-bold sm:text-5xl">Review and send your order.</h1>
          <p className="text-base text-[var(--color-cream)]/80 sm:max-w-2xl">
            Adjust quantities, double-check modifiers, and submit when ready. Baristas will receive your order instantly.
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-5xl px-6 pt-10">
        {items.length === 0 ? (
          <div className="rounded-3xl border border-white/70 bg-white/90 p-12 text-center shadow-[0_20px_40px_rgba(27,15,10,0.08)] backdrop-blur">
            <p className="text-lg font-semibold text-[var(--color-deep)]">Your cart is empty.</p>
            <p className="mt-2 text-sm text-[var(--color-ink)]/70">Add a few drinks or pastries to start checkout.</p>
            <Link
              href="/order"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-cream)] shadow-lg shadow-[rgba(166,101,63,0.35)] transition hover:-translate-y-0.5"
            >
              Back to menu
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="rounded-3xl border border-white/70 bg-white/95 p-6 shadow-[0_20px_40px_rgba(27,15,10,0.08)] backdrop-blur">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-baseline justify-between gap-3">
                        <h2 className="text-xl font-semibold text-[var(--color-deep)]">{item.name}</h2>
                        <span className="text-sm font-semibold text-[var(--color-ink)]/80">{formatCurrency(computeUnitPrice(item))} ea</span>
                      </div>
                      <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-ink)]/50">{item.size}</p>
                      {item.modifiers.length ? (
                        <ul className="mt-3 space-y-1 text-sm text-[var(--color-ink)]/80">
                          {item.modifiers.map((modifier) => (
                            <li key={`${item.id}-${modifier.groupId}-${modifier.optionId}`}>
                              <span className="font-medium text-[var(--color-deep)]">{modifier.groupName}:</span> {modifier.optionLabel}
                              {modifier.priceDelta ? ` (+${formatCurrency(modifier.priceDelta)})` : ""}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-3 text-sm text-[var(--color-ink)]/70">No modifiers selected.</p>
                      )}
                    </div>
                    <div className="flex flex-shrink-0 flex-col items-stretch gap-3">
                      <div className="flex items-center justify-between gap-3 rounded-full border border-stone-200 bg-white/80 px-3 py-2">
                        <button
                          type="button"
                          onClick={() => handleDecrease(item.id)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-lg text-[var(--color-deep)] transition hover:text-[var(--color-accent)]"
                          aria-label={`Decrease ${item.name}`}
                        >
                          −
                        </button>
                        <span className="min-w-[2ch] text-center text-sm font-semibold text-[var(--color-deep)]">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleIncrease(item.id)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-lg text-[var(--color-deep)] transition hover:text-[var(--color-accent)]"
                          aria-label={`Increase ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPendingRemovalId(item.id)}
                        className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-ink)]/60 transition hover:text-[var(--color-deep)]"
                      >
                        Remove item
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-stone-200 pt-3 text-sm font-semibold text-[var(--color-deep)]">
                    <span>Line total</span>
                    <span>{formatCurrency(computeLineTotal(item))}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-white/70 bg-white/95 p-6 shadow-[0_20px_40px_rgba(27,15,10,0.08)] backdrop-blur">
              <div className="flex items-center justify-between text-base font-semibold text-[var(--color-deep)]">
                <span>Subtotal</span>
                <span>{formatCurrency(totals.subtotal)}</span>
              </div>
              <p className="mt-2 text-sm text-[var(--color-ink)]/70">Taxes and tips are calculated at pickup.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
                <Link
                  href="/order"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--color-deep)]/20 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-deep)] transition hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]"
                >
                  Keep browsing
                </Link>
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-cream)] shadow-lg shadow-[rgba(166,101,63,0.35)] transition hover:-translate-y-0.5"
                >
                  Submit order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {pendingRemovalItem ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(27,15,10,0.55)] px-4 py-8"
          onClick={cancelRemoval}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-white/80 bg-white/95 p-6 text-center shadow-[0_30px_60px_rgba(27,15,10,0.25)] backdrop-blur"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-[var(--color-deep)]">Remove item from cart?</h2>
            <p className="mt-2 text-sm text-[var(--color-ink)]/70">
              Remove {pendingRemovalItem.name} ({pendingRemovalItem.size}) from the order?
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={cancelRemoval}
                className="inline-flex items-center justify-center rounded-full border border-stone-200 bg-white px-5 py-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-deep)] transition hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]"
              >
                Keep item
              </button>
              <button
                type="button"
                onClick={confirmRemoval}
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-deep)] px-5 py-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-cream)] shadow-[0_12px_30px_rgba(27,15,10,0.3)] transition hover:-translate-y-0.5"
              >
                Remove it
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
