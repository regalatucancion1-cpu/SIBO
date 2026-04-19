"use client";

import { useLocalStorage } from "./storage";
import type { ShoppingItem, FoodCategory } from "./types";
import { foodsById } from "@/data/foods";
import { recipes } from "@/data/recipes";

const SHOPPING_KEY = "sibo.shopping";
const FAVORITES_KEY = "sibo.favorites";

export function useShoppingList() {
  const [items, setItems, hydrated] = useLocalStorage<ShoppingItem[]>(
    SHOPPING_KEY,
    []
  );

  function addFood(foodId: string, quantity: string = "1") {
    const food = foodsById[foodId];
    if (!food) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.foodId === foodId && !i.checked);
      if (existing) return prev;
      const next: ShoppingItem = {
        id: crypto.randomUUID(),
        foodId,
        quantity,
        checked: false,
        category: food.category,
      };
      return [...prev, next];
    });
  }

  function addManual(name: string, quantity: string = "1") {
    if (!name.trim()) return;
    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        manualName: name.trim(),
        quantity,
        checked: false,
        category: "Manual",
      },
    ]);
  }

  function addFromRecipe(recipeId: string) {
    const recipe = recipes.find((r) => r.id === recipeId);
    if (!recipe) return;
    recipe.ingredients.forEach((ing) => {
      const food = foodsById[ing.foodId];
      if (!food) return;
      setItems((prev) => {
        if (prev.some((i) => i.foodId === ing.foodId && !i.checked)) {
          return prev;
        }
        return [
          ...prev,
          {
            id: crypto.randomUUID(),
            foodId: ing.foodId,
            quantity: ing.quantity,
            checked: false,
            category: food.category,
          },
        ];
      });
    });
  }

  function toggleItem(id: string) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i))
    );
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function clearChecked() {
    setItems((prev) => prev.filter((i) => !i.checked));
  }

  function clearAll() {
    setItems([]);
  }

  const grouped: Record<string, ShoppingItem[]> = {};
  items.forEach((item) => {
    const key = item.category as string;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  });

  return {
    items,
    grouped,
    hydrated,
    addFood,
    addManual,
    addFromRecipe,
    toggleItem,
    removeItem,
    clearChecked,
    clearAll,
  };
}

export function useFavorites() {
  const [favorites, setFavorites, hydrated] = useLocalStorage<string[]>(
    FAVORITES_KEY,
    []
  );

  function toggle(id: string) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function isFavorite(id: string) {
    return favorites.includes(id);
  }

  return { favorites, toggle, isFavorite, hydrated };
}

export const categoryOrder: (FoodCategory | "Manual")[] = [
  "Frutas",
  "Verduras",
  "Proteína animal",
  "Lácteos",
  "Cereales y pan",
  "Legumbres",
  "Frutos secos",
  "Aceites y condimentos",
  "Bebidas",
  "Dulces y otros",
  "Manual",
];
