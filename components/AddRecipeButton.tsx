"use client";

import { useState } from "react";
import { useShoppingList } from "@/lib/hooks";

export function AddRecipeButton({ recipeId }: { recipeId: string }) {
  const { addFromRecipe } = useShoppingList();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addFromRecipe(recipeId);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-full py-4 rounded-2xl font-semibold transition active:scale-95 ${
        added
          ? "bg-green-600 text-white"
          : "bg-stone-900 text-white hover:bg-stone-800"
      }`}
    >
      {added ? "✓ Añadido a la lista" : "+ Añadir ingredientes a la lista"}
    </button>
  );
}
