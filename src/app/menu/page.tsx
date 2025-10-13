import MenuRenderer from "@/components/MenuRenderer";
import type { MenuData } from "@/types/menu";
import data from "@/data/menu.en.json";

export default function Page() {
  return <MenuRenderer data={data as MenuData} />;
}
