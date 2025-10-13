import FAQList from "@/components/FAQList";
import items from "@/data/faqs.en.json";

export default function Page() {
  return <FAQList items={items as { q: string; a: string }[]} />;
}
