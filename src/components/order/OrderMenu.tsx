"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { MenuData, MenuItem, ModifierGroup, ModifierOption } from "@/types/menu";
import { computeLineTotal, isModifierAvailableForSize } from "@/types/order";
import type { SelectedModifier } from "@/types/order";
import { useOrder } from "./OrderProvider";
import { useToast } from "../ui/ToastProvider";

function formatCurrency(amount: number) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

type OrderMenuProps = {
  data: MenuData;
};

export function OrderMenu({ data }: OrderMenuProps) {
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);

  return (
    <div className="relative min-h-screen bg-[var(--color-page-bg)] pb-24">
      <section className="bg-[var(--color-deep)]/95 py-16 text-[var(--color-cream)]">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 text-center sm:text-left">
          <p className="text-xs uppercase tracking-[0.5em] text-[var(--color-accent-soft)]">Order Online</p>
          <h1 className="text-4xl font-bold sm:text-5xl">Your barista-crafted favorites, ready when you are.</h1>
          <p className="text-base text-[var(--color-cream)]/80 sm:max-w-2xl">
            Build each drink exactly how your guests enjoy it. Choose size, espresso style, alternative milks, sweeteners, and
            more—then send it all to the bar with one tap.
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-12 pt-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-12">
            {data.sections.map((section) => (
              <section key={section.title} className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-accent)]">{section.title}</p>
                  <h2 className="mt-2 text-3xl font-bold text-[var(--color-deep)]">{section.title}</h2>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {section.items.map((item) => (
                    <article
                      key={item.id}
                      className="flex h-full flex-col justify-between rounded-3xl border border-white/60 bg-white/90 p-6 shadow-[0_18px_40px_rgba(27,15,10,0.08)] backdrop-blur transition hover:-translate-y-0.5 hover:shadow-[0_30px_50px_rgba(27,15,10,0.12)]"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-xl font-semibold text-[var(--color-deep)]">{item.name}</h3>
                            {item.desc ? <p className="mt-1 text-sm text-[var(--color-ink)]/70">{item.desc}</p> : null}
                          </div>
                          <div className="text-right text-sm font-semibold text-[var(--color-deep)]">
                            From {formatCurrency(Math.min(...item.prices.map((price) => price.amount)))}
                          </div>
                        </div>
                        {item.tags?.length ? (
                          <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]/80">
                            {item.tags.map((tag) => (
                              <span key={tag} className="rounded-full border border-[var(--color-accent)]/40 px-3 py-1">
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : null}
                        {item.modifiers?.length ? (
                          <ul className="space-y-1 text-xs text-[var(--color-ink)]/60">
                            {item.modifiers.map((group) => (
                              <li key={group.id}>
                                {group.name}
                                {group.required ? <span className="text-[var(--color-accent)]"> *</span> : null}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs text-[var(--color-ink)]/60">No modifiers available for this item.</p>
                        )}
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <div className="text-sm text-[var(--color-ink)]/70">
                          {item.prices.map((price) => (
                            <div key={price.size}>
                              {price.size} · {formatCurrency(price.amount)}
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveItem(item)}
                          className="rounded-full bg-[var(--color-accent)] px-5 py-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-cream)] shadow-lg shadow-[rgba(166,101,63,0.35)] transition hover:-translate-y-0.5"
                        >
                          Customize
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <CartSidebar />
        </div>
      </div>

      <CartFloatingButton />

      {activeItem ? <ItemConfigurator key={activeItem.id} item={activeItem} onClose={() => setActiveItem(null)} /> : null}
    </div>
  );
}

type CartSidebarProps = {
  className?: string;
};

function CartSidebar({ className }: CartSidebarProps) {
  const { items, totals } = useOrder();

  return (
    <aside className={className ?? "hidden lg:block"}>
      <div className="sticky top-32 space-y-4">
        <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-[0_20px_40px_rgba(27,15,10,0.08)] backdrop-blur">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-semibold text-[var(--color-deep)]">Current order</h2>
            <span className="text-sm text-[var(--color-ink)]/60">{totals.itemCount} item{totals.itemCount === 1 ? "" : "s"}</span>
          </div>
          <div className="mt-4 space-y-4">
            {items.length === 0 ? (
              <p className="text-sm text-[var(--color-ink)]/70">Add items to see them here.</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="rounded-2xl bg-[var(--color-page-bg)]/60 p-3">
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="font-semibold text-[var(--color-deep)]">{item.quantity} × {item.name}</span>
                    <span className="text-[var(--color-ink)]/70">{formatCurrency(computeLineTotal(item))}</span>
                  </div>
                  <p className="text-xs text-[var(--color-ink)]/60">{item.size}</p>
                  {item.modifiers.length ? (
                    <ul className="mt-2 space-y-1 text-xs text-[var(--color-ink)]/70">
                      {item.modifiers.map((modifier) => (
                        <li key={`${item.id}-${modifier.groupId}-${modifier.optionId}`}>
                          {modifier.groupName}: {modifier.optionLabel}
                          {modifier.priceDelta ? ` (+${formatCurrency(modifier.priceDelta)})` : ""}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))
            )}
          </div>
          <div className="mt-6 flex items-center justify-between text-sm font-semibold text-[var(--color-deep)]">
            <span>Subtotal</span>
            <span>{formatCurrency(totals.subtotal)}</span>
          </div>
          <Link
            href="/checkout"
            className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-cream)] shadow-lg shadow-[rgba(166,101,63,0.35)] transition hover:-translate-y-0.5"
          >
            Go to checkout
          </Link>
        </div>
      </div>
    </aside>
  );
}

function CartFloatingButton() {
  const { totals } = useOrder();

  if (totals.itemCount === 0) {
    return null;
  }

  return (
    <Link
      href="/checkout"
      className="fixed bottom-6 right-6 z-[150] inline-flex items-center gap-3 rounded-full bg-[var(--color-deep)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-cream)] shadow-[0_14px_30px_rgba(27,15,10,0.25)] transition hover:-translate-y-0.5"
    >
      <span>{totals.itemCount} item{totals.itemCount === 1 ? "" : "s"}</span>
      <span className="text-[var(--color-accent-soft)]">{formatCurrency(totals.subtotal)}</span>
    </Link>
  );
}

type ItemConfiguratorProps = {
  item: MenuItem;
  onClose: () => void;
};

function ItemConfigurator({ item, onClose }: ItemConfiguratorProps) {
  const { addItem } = useOrder();
  const { showToast } = useToast();

  const defaultIndex = useMemo(() => {
    const index = item.prices.findIndex((price) => price.default);
    return index >= 0 ? index : 0;
  }, [item.prices]);

  const [sizeIndex, setSizeIndex] = useState(defaultIndex);
  const [quantity, setQuantity] = useState(1);

  const selectedPrice = item.prices[sizeIndex] ?? item.prices[0];

  const activeGroups = useMemo(
    () => item.modifiers?.filter((group) => isModifierAvailableForSize(group, selectedPrice.size)) ?? [],
    [item.modifiers, selectedPrice.size],
  );

  const [selectedModifiers, setSelectedModifiers] = useState<Record<string, string[]>>(() =>
    buildInitialSelection(item, item.prices[defaultIndex]?.size ?? item.prices[0].size),
  );

  const sanitizeSelection = useMemo(() => createSanitizer(activeGroups), [activeGroups]);

  useEffect(() => {
    const baseSize = item.prices[defaultIndex]?.size ?? item.prices[0].size;
    setSizeIndex(defaultIndex);
    setQuantity(1);
    setSelectedModifiers(buildInitialSelection(item, baseSize));
  }, [item, defaultIndex]);

  useEffect(() => {
    setSelectedModifiers((current) => sanitizeSelection(current));
  }, [sanitizeSelection]);

  const handleSizeChange = (index: number) => {
    setSizeIndex(index);
  };

  const handleSingleSelect = (group: ModifierGroup, optionId: string) => {
    setSelectedModifiers((current) => ({ ...current, [group.id]: [optionId] }));
  };

  const handleMultiToggle = (group: ModifierGroup, optionId: string) => {
    setSelectedModifiers((current) => {
      const existing = new Set(current[group.id] ?? []);
      if (existing.has(optionId)) {
        existing.delete(optionId);
      } else {
        if (group.max && existing.size >= group.max) {
          const arr = Array.from(existing);
          arr.shift();
          arr.push(optionId);
          return { ...current, [group.id]: arr };
        }
        existing.add(optionId);
      }
      return { ...current, [group.id]: Array.from(existing) };
    });
  };

  const modifierDetails = useMemo(() => {
    return activeGroups.flatMap((group) => {
      const selected = selectedModifiers[group.id] ?? [];
      return selected
        .map((optionId) => group.options.find((option) => option.id === optionId))
        .filter((option): option is ModifierOption => Boolean(option))
        .map((option) => ({ group, option }));
    });
  }, [activeGroups, selectedModifiers]);

  const modifiersTotal = modifierDetails.reduce((sum, detail) => sum + (detail.option.priceDelta ?? 0), 0);

  const unitPrice = selectedPrice.amount + modifiersTotal;
  const totalPrice = unitPrice * quantity;

  const meetsRequirements = activeGroups.every((group) => {
    const selected = selectedModifiers[group.id] ?? [];
    if (!group.required) return true;
    return group.type === "single" ? selected.length === 1 : selected.length > 0;
  });

  const selectedModifierPayload: SelectedModifier[] = modifierDetails.map((detail) => ({
    groupId: detail.group.id,
    groupName: detail.group.name,
    optionId: detail.option.id,
    optionLabel: detail.option.label,
    priceDelta: detail.option.priceDelta ?? 0,
  }));

  const handleAddToCart = () => {
    if (!meetsRequirements) return;

    addItem({ item, price: selectedPrice, modifiers: selectedModifierPayload, quantity });

    const modifierSummary = selectedModifierPayload.map((modifier) => modifier.optionLabel).join(", ");
    showToast({
      title: "Cart updated",
      description: `${quantity} × ${item.name} (${selectedPrice.size}) added${modifierSummary ? ` • ${modifierSummary}` : ""}.`,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[180] flex items-center justify-center bg-[rgba(27,15,10,0.55)] px-4 py-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl border border-white/80 bg-white/95 p-6 shadow-[0_30px_60px_rgba(27,15,10,0.25)] backdrop-blur"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 text-sm text-[var(--color-ink)]/70 transition hover:border-stone-300 hover:text-[var(--color-deep)]"
          aria-label="Close"
        >
          ×
        </button>
        <div className="space-y-6">
          <header>
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-accent)]">Customize</p>
            <h2 className="mt-2 text-3xl font-bold text-[var(--color-deep)]">{item.name}</h2>
            {item.desc ? <p className="mt-2 text-sm text-[var(--color-ink)]/70">{item.desc}</p> : null}
          </header>

          <div className="space-y-4">
            <section>
              <h3 className="text-sm font-semibold text-[var(--color-deep)]">Choose a size</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {item.prices.map((price, index) => (
                  <button
                    key={price.size}
                    type="button"
                    onClick={() => handleSizeChange(index)}
                    className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                      index === sizeIndex
                        ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-deep)]"
                        : "border-stone-200 text-[var(--color-ink)]/70 hover:border-[var(--color-accent)]/60"
                    }`}
                  >
                    <span className="block">{price.size}</span>
                    <span className="text-xs font-normal text-[var(--color-ink)]/60">{formatCurrency(price.amount)}</span>
                  </button>
                ))}
              </div>
            </section>

            {activeGroups.length ? (
              <section className="space-y-4">
                {activeGroups.map((group) => (
                  <div key={group.id} className="rounded-2xl border border-white/60 bg-white/80 p-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-sm font-semibold text-[var(--color-deep)]">
                        {group.name}
                        {group.required ? <span className="text-[var(--color-accent)]"> *</span> : null}
                      </h3>
                      <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-ink)]/50">{describeGroup(group)}</span>
                    </div>
                    {group.description ? (
                      <p className="mt-2 text-xs text-[var(--color-ink)]/60">{group.description}</p>
                    ) : null}
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {group.options.map((option) => (
                        <label
                          key={option.id}
                          className={`flex cursor-pointer items-center justify-between rounded-2xl border px-3 py-2 text-sm transition ${
                            (selectedModifiers[group.id] ?? []).includes(option.id)
                              ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-deep)]"
                              : "border-stone-200 text-[var(--color-ink)]/80 hover:border-[var(--color-accent)]/60"
                          }`}
                        >
                          <span className="flex flex-col">
                            <span>{option.label}</span>
                            {option.description ? (
                              <span className="text-xs font-normal text-[var(--color-ink)]/60">{option.description}</span>
                            ) : null}
                          </span>
                          <span className="ml-2 text-xs font-semibold text-[var(--color-ink)]/60">
                            {option.priceDelta ? `+${formatCurrency(option.priceDelta)}` : "Included"}
                          </span>
                          <input
                            type={group.type === "single" ? "radio" : "checkbox"}
                            name={group.id}
                            value={option.id}
                            checked={(selectedModifiers[group.id] ?? []).includes(option.id)}
                            onChange={() =>
                              group.type === "single"
                                ? handleSingleSelect(group, option.id)
                                : handleMultiToggle(group, option.id)
                            }
                            className="hidden"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            ) : null}
          </div>

          <footer className="flex flex-col gap-4 border-t border-stone-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-full border border-stone-200 bg-white/80">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  className="h-10 w-10 text-lg text-[var(--color-deep)] transition hover:text-[var(--color-accent)]"
                >
                  −
                </button>
                <span className="w-12 text-center text-sm font-semibold text-[var(--color-deep)]">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                  className="h-10 w-10 text-lg text-[var(--color-deep)] transition hover:text-[var(--color-accent)]"
                >
                  +
                </button>
              </div>
              <div className="text-sm text-[var(--color-ink)]/70">
                <div>Each: {formatCurrency(unitPrice)}</div>
                <div>Total: {formatCurrency(totalPrice)}</div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!meetsRequirements}
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-cream)] shadow-lg shadow-[rgba(166,101,63,0.35)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500 disabled:shadow-none"
            >
              Add to cart · {formatCurrency(totalPrice)}
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}

function describeGroup(group: ModifierGroup) {
  if (group.type === "single") {
    return "Pick one";
  }
  if (group.max) {
    return `Pick up to ${group.max}`;
  }
  return "Mix & match";
}

function buildInitialSelection(item: MenuItem, size: string) {
  const result: Record<string, string[]> = {};
  (item.modifiers ?? []).forEach((group) => {
    if (!isModifierAvailableForSize(group, size)) return;
    if (group.type === "single" && group.required && group.options.length > 0) {
      result[group.id] = [group.options[0].id];
    }
  });
  return result;
}

function createSanitizer(groups: ModifierGroup[]) {
  return (current: Record<string, string[]>) => {
    const next: Record<string, string[]> = {};

    groups.forEach((group) => {
      const allowedOptionIds = new Set(group.options.map((option) => option.id));
      const selected = current[group.id] ?? [];
      const validSelections = selected.filter((optionId) => allowedOptionIds.has(optionId));

      if (group.type === "single") {
        if (validSelections.length > 0) {
          next[group.id] = [validSelections[validSelections.length - 1]];
        } else if (group.required && group.options.length > 0) {
          next[group.id] = [group.options[0].id];
        }
      } else {
        let deduplicated = Array.from(new Set(validSelections));
        if (group.max && deduplicated.length > group.max) {
          deduplicated = deduplicated.slice(deduplicated.length - group.max);
        }
        if (deduplicated.length > 0) {
          next[group.id] = deduplicated;
        } else if (group.required && group.options.length > 0) {
          next[group.id] = [group.options[0].id];
        }
      }
    });

    return next;
  };
}
