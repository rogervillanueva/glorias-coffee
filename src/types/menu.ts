export type Money = { size: string; amount: number; default?: boolean };

export type ModifierOption = {
  id: string;
  label: string;
  priceDelta?: number;
  description?: string;
};

export type ModifierGroup = {
  id: string;
  name: string;
  description?: string;
  type: "single" | "multiple";
  required?: boolean;
  max?: number;
  appliesTo?: string[];
  options: ModifierOption[];
};

export type MenuItem = {
  id: string;
  name: string;
  desc?: string;
  prices: Money[];
  tags?: string[];
  modifiers?: ModifierGroup[];
};

export type MenuSection = {
  title: string;
  items: MenuItem[];
};

export type MenuData = {
  sections: MenuSection[];
};
