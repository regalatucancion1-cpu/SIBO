import Link from "next/link";
import { recipes } from "@/data/recipes";

export default function RecipesPage() {
  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold">Recetas</h1>
        <p className="text-sm text-stone-800 mt-1">
          Todas las recetas usan solo ingredientes aptos para SIBO.
        </p>
      </header>

      <ul className="space-y-3">
        {recipes.map((r) => (
          <li key={r.id}>
            <Link
              href={`/recetas/${r.id}`}
              className="block p-4 bg-white rounded-2xl border border-stone-200 hover:border-stone-400 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="font-semibold">{r.name}</h2>
                  <p className="text-sm text-stone-800 mt-1 line-clamp-2">
                    {r.description}
                  </p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-stone-100 shrink-0">
                  {r.difficulty}
                </span>
              </div>
              <div className="flex gap-4 mt-3 text-sm text-stone-800">
                <span>⏱ {r.prepTimeMin} min</span>
                <span>👥 {r.servings}</span>
                <span>💶 {r.pricePerServing.toFixed(2)}€/ración</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
