type QA = { q: string; a: string };

export default function FAQList({ items }: { items: QA[] }) {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold mb-6">FAQs</h1>
      <ul className="space-y-4">
        {items.map((qa) => (
          <li key={qa.q} className="rounded-lg border bg-white p-4">
            <p className="font-medium">{qa.q}</p>
            <p className="text-stone-700 mt-1">{qa.a}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
