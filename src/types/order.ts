import type { MenuItem, Money, ModifierGroup, ModifierOption } from "./menu";

export type SelectedModifier = {
  groupId: string;
  groupName: string;
  optionId: string;
  optionLabel: string;
  priceDelta: number;
};

export type CartItem = {
  id: string;
  menuItemId: string;
  name: string;
  size: string;
  basePrice: number;
  modifiers: SelectedModifier[];
  quantity: number;
  notes?: string;
};

export type OrderTotals = {
  itemCount: number;
  subtotal: number;
};

export type AddItemPayload = {
  item: MenuItem;
  price: Money;
  modifiers: SelectedModifier[];
  quantity: number;
  notes?: string;
};

export const STORAGE_KEY = "glorias-coffee-cart";

export function computeModifierPrice(modifiers: SelectedModifier[]) {
  return modifiers.reduce((total, current) => total + current.priceDelta, 0);
}

export function computeUnitPrice(cartItem: CartItem) {
  return cartItem.basePrice + computeModifierPrice(cartItem.modifiers);
}

export function computeLineTotal(cartItem: CartItem) {
  return computeUnitPrice(cartItem) * cartItem.quantity;
}

export function isModifierAvailableForSize(group: ModifierGroup, size: string) {
  if (!group.appliesTo || group.appliesTo.length === 0) {
    return true;
  }
  return group.appliesTo.includes(size);
}

export function formatMenuItemForCheckout(cartItem: CartItem) {
  return {
    itemId: cartItem.menuItemId,
    name: cartItem.name,
    size: cartItem.size,
    quantity: cartItem.quantity,
    modifiers: cartItem.modifiers.map((mod) => ({
      id: mod.optionId,
      label: mod.optionLabel,
      priceDelta: mod.priceDelta,
      groupId: mod.groupId,
      groupName: mod.groupName,
    })),
    notes: cartItem.notes,
    unitPrice: computeUnitPrice(cartItem),
    lineTotal: computeLineTotal(cartItem),
  };
}

export function normalizePrice(price: Money | undefined, fallback: Money): Money {
  if (!price) return fallback;
  return { ...fallback, ...price };
}

export function findDefaultPrice(prices: Money[]): Money {
  if (prices.length === 0) {
    throw new Error("Menu item must include at least one price");
  }
  const explicitDefault = prices.find((price) => price.default);
  return explicitDefault ?? prices[0];
}

export function ensureModifierOption(option: ModifierOption | undefined, group: ModifierGroup) {
  if (!option) {
    throw new Error(`Missing modifier option for group ${group.id}`);
  }
  return option;
}
