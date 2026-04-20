"use client";

import { useState } from "react";
import { useShoppingList } from "@/lib/hooks";
import { foodsById } from "@/data/foods";
import type { RecipeIngredient } from "@/lib/types";

const statusEmoji = {
  permitido: "🟢",
  prohibido: "🔴",
  depende: "🟡",
} as const;

export function IngredientsList({
  ingredients,
}: {
  ingredients: RecipeIngredient[];
}) {
  const { addFood } = useShoppingList();
  const [added, setAdded] = useState<Record<string, boolean>>({});

  function handleAdd(foodId: string, quantity: string) {
    addFood(foodId, quantity);
    setAdded((prev) => ({ ...prev, [foodId]: true }));
    setTimeout(() => {
      setAdded((prev) => {
        const next = { ...prev };
        delete next[foodId];
        return next;
      });
    }, 2000);
  }

  return (
    <ul className="space-y-2">
      {ingredients.map((ing, idx) => {
        const food = foodsById[ing.foodId];
        const isAdded = added[ing.foodId];
        return (
          <li
            key={idx}
            className="flex items-center justify-between gap-3 p-3 bg-white rounded-xl border border-stone-200"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xl shrink-0">
                {food ? statusEmoji[food.status] : "❔"}
              </span>
              <div className="min-w-0">
                <p className="font-medium truncate">
                  {food?.name ?? ing.foodId}
                </p>
                <p className="text-xs text-stone-800">
                  {ing.quantity}
                  {ing.optional ? " · opcional" : ""}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleAdd(ing.foodId, ing.quantity)}
              className={`shrink-0 w-10 h-10 rounded-full font-bold text-lg transition active:scale-90 ${
                isAdded
                  ? "bg-green-600 text-white"
                  : "bg-stone-900 text-white hover:bg-stone-800"
              }`}
              aria-label={
                isAdded
                  ? "Añadido a la lista"
                  : `Añadir ${food?.name ?? ing.foodId} a la lista`
              }
            >
              {isAdded ? "✓" : "+"}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
