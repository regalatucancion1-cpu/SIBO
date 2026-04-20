import Link from "next/link";
import { recipes } from "@/data/recipes";
import { foods } from "@/data/foods";

export default function HomePage() {
  const permitidos = foods.filter((f) => f.status === "permitido").length;
  const prohibidos = foods.filter((f) => f.status === "prohibido").length;
  const depende = foods.filter((f) => f.status === "depende").length;
  const featured = recipes.slice(0, 3);

  return (
    <div className="space-y-8">
      <header>
        <p className="text-base text-stone-800 font-semibold">Hola MOCHITO 👋</p>
        <h1 className="text-3xl font-bold mt-1 text-stone-900">¿Qué comemos hoy?</h1>
      </header>

      <Link
        href="/buscar"
        className="block p-4 bg-white rounded-2xl border border-stone-200 hover:border-stone-400 transition"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔍</span>
          <div>
            <p className="font-semibold">Buscar un alimento</p>
            <p className="text-sm text-stone-800">
              Mira si es apto antes de comprar o cocinar
            </p>
          </div>
        </div>
      </Link>

      <section className="grid grid-cols-3 gap-3">
        <StatCard label="Permitidos" value={permitidos} color="text-green-700" />
        <StatCard label="Según porción" value={depende} color="text-amber-700" />
        <StatCard label="Evitar" value={prohibidos} color="text-red-700" />
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">Recetas destacadas</h2>
          <Link
            href="/recetas"
            className="text-sm text-green-700 font-semibold"
          >
            Ver todas
          </Link>
        </div>
        <ul className="space-y-3">
          {featured.map((r) => (
            <li key={r.id}>
              <Link
                href={`/recetas/${r.id}`}
                className="block p-4 bg-white rounded-2xl border border-stone-200 hover:border-stone-400 transition"
              >
                <p className="font-semibold">{r.name}</p>
                <p className="text-sm text-stone-800 mt-1">
                  ⏱ {r.prepTimeMin} min · 👥 {r.servings} raciones · 💶{" "}
                  {r.pricePerServing.toFixed(2)}€/ración
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="p-4 bg-green-50 rounded-2xl border border-green-200">
        <h3 className="font-semibold text-green-800">Tip del día</h3>
        <p className="text-sm text-green-900 mt-1">
          Evita la cebolla y el ajo directo. Si quieres ese sabor, usa aceite
          de oliva infusionado (calentar con un diente de ajo y retirarlo
          antes de cocinar).
        </p>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="p-3 bg-white rounded-xl border border-stone-200 text-center">
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-stone-800 mt-1 leading-tight">{label}</p>
    </div>
  );
}
