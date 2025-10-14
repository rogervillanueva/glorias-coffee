import data from "@/data/menu.en.json";
import { OrderMenu } from "@/components/order/OrderMenu";
import type { MenuData } from "@/types/menu";

export const metadata = {
  title: "Order Online | Gloria's Coffee Bar",
  description: "Customize Gloria's Coffee drinks, pastries, and more before checkout.",
};

export default function OrderPage() {
  return <OrderMenu data={data as MenuData} />;
}
