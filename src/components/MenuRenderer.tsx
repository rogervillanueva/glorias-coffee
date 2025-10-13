import type { MenuData, MenuSection, MenuItem, Money } from "@/types/menu";

function fmt(amount: number) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export default function MenuRenderer({ data }: { data: MenuData }) {
  return (
    <div className="mx-auto max-w-5xl p-6 space-y-10">
      {data.sections.map((sec: MenuSection) => (
        <section key={sec.title}>
          <h2 className="text-xl font-semibold mb-4">{sec.title}</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {sec.items.map((it: MenuItem) => (
              <li key={it.id} className="rounded-lg border bg-white p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium">{it.name}</h3>
                    {it.desc && <p className="text-sm text-stone-600 mt-1">{it.desc}</p>}
                    {it.tags?.length ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {it.tags.map((t: string) => (
                          <span key={t} className="text-xs rounded-full bg-stone-100 px-2 py-0.5">
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <div className="text-right text-sm">
                    {it.prices.map((p: Money) => (
                      <div key={p.size}>
                        <span className="text-stone-600">{p.size}</span> • <span>{fmt(p.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
