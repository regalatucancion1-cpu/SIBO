"use client";

import type { Food } from "@/lib/types";
import { useShoppingList } from "@/lib/hooks";

const statusColor: Record<Food["status"], string> = {
  permitido: "bg-green-100 text-green-800 border-green-300",
  prohibido: "bg-red-100 text-red-800 border-red-300",
  depende: "bg-amber-100 text-amber-800 border-amber-300",
};

const statusEmoji: Record<Food["status"], string> = {
  permitido: "🟢",
  prohibido: "🔴",
  depende: "🟡",
};

const statusLabel: Record<Food["status"], string> = {
  permitido: "Permitido",
  prohibido: "Evitar",
  depende: "Según porción",
};

export function FoodCard({
  food,
  compact = false,
}: {
  food: Food;
  compact?: boolean;
}) {
  const { addFood } = useShoppingList();

  if (compact) {
    return (
      <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-xl border border-stone-200">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xl shrink-0">{statusEmoji[food.status]}</span>
          <div className="min-w-0">
            <p className="font-medium truncate">{food.name}</p>
            <p className="text-xs text-stone-700 truncate">{food.category}</p>
          </div>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full border ${statusColor[food.status]}`}
        >
          {statusLabel[food.status]}
        </span>
      </div>
    );
  }

  return (
    <article
      className={`rounded-2xl border-2 p-5 ${statusColor[food.status]}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm opacity-80">{food.category}</p>
          <h2 className="text-xl font-bold">{food.name}</h2>
        </div>
        <span className="text-3xl">{statusEmoji[food.status]}</span>
      </div>

      <p className="mt-3 text-sm font-semibold uppercase tracking-wide">
        {statusLabel[food.status]}
      </p>

      <dl className="mt-4 space-y-2 text-sm">
        <div>
          <dt className="font-semibold">Porción segura</dt>
          <dd>{food.portion}</dd>
        </div>
        <div>
          <dt className="font-semibold">¿Por qué?</dt>
          <dd>{food.reason}</dd>
        </div>
      </dl>

      {food.status !== "prohibido" && (
        <button
          type="button"
          onClick={() => addFood(food.id)}
          className="mt-5 w-full py-3 bg-stone-900 text-white rounded-xl font-semibold text-sm hover:bg-stone-800 active:scale-95 transition"
        >
          + Añadir a la lista de la compra
        </button>
      )}
    </article>
  );
}
