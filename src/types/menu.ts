export type Money = { size: string; amount: number };

export type MenuItem = {
  id: string;
  name: string;
  desc?: string;
  prices: Money[];
  tags?: string[];
};

export type MenuSection = {
  title: string;
  items: MenuItem[];
};

export type MenuData = {
  sections: MenuSection[];
};
