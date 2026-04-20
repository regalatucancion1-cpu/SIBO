"use client";

import { useMemo, useState } from "react";
import { foods } from "@/data/foods";
import { FoodCard } from "@/components/FoodCard";
import type { FoodStatus } from "@/lib/types";

const filters: { label: string; value: "todos" | FoodStatus; icon: string }[] = [
  { label: "Todos", value: "todos", icon: "•" },
  { label: "Permitidos", value: "permitido", icon: "🟢" },
  { label: "Según porción", value: "depende", icon: "🟡" },
  { label: "Evitar", value: "prohibido", icon: "🔴" },
];

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"todos" | FoodStatus>("todos");

  const results = useMemo(() => {
    const q = normalize(query);
    return foods.filter((f) => {
      const matchesQuery =
        q === "" ||
        normalize(f.name).includes(q) ||
        normalize(f.category).includes(q);
      const matchesFilter = filter === "todos" || f.status === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  const topResult = results[0];
  const rest = results.slice(1, 40);

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold">Buscar alimento</h1>
        <p className="text-sm text-stone-800 mt-1">
          Escribe el nombre y mira si es apto, según porción o evitar.
        </p>
      </header>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ej: plátano, yogur, pan..."
          className="w-full px-4 py-4 text-base bg-white rounded-2xl border border-stone-200 focus:border-stone-500 focus:outline-none pr-12"
          autoFocus
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-800 hover:text-stone-800 text-xl"
            aria-label="Limpiar"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition ${
              filter === f.value
                ? "bg-stone-900 text-white border-stone-900"
                : "bg-white text-stone-800 border-stone-200"
            }`}
          >
            {f.icon} {f.label}
          </button>
        ))}
      </div>

      {topResult ? (
        <>
          <FoodCard food={topResult} />
          {rest.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-sm font-semibold text-stone-800 uppercase tracking-wide mt-4">
                Más resultados ({rest.length})
              </h2>
              <ul className="space-y-2">
                {rest.map((f) => (
                  <li key={f.id}>
                    <FoodCard food={f} compact />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      ) : (
        <div className="text-center py-12 text-stone-800">
          <p className="text-4xl mb-3">🤷‍♀️</p>
          <p>No hay resultados para "{query}"</p>
          <p className="text-xs mt-2">Prueba con otro nombre o quita filtros.</p>
        </div>
      )}
    </div>
  );
}
