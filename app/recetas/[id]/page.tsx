import Link from "next/link";
import { notFound } from "next/navigation";
import { recipes } from "@/data/recipes";
import { foodsById } from "@/data/foods";
import { AddRecipeButton } from "@/components/AddRecipeButton";

export function generateStaticParams() {
  return recipes.map((r) => ({ id: r.id }));
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = recipes.find((r) => r.id === id);
  if (!recipe) notFound();

  return (
    <div className="space-y-6">
      <Link
        href="/recetas"
        className="inline-flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900"
      >
        ← Recetas
      </Link>

      <header>
        <h1 className="text-2xl font-bold">{recipe.name}</h1>
        <p className="text-stone-600 mt-2">{recipe.description}</p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-stone-600">
          <span>⏱ {recipe.prepTimeMin} min</span>
          <span>👥 {recipe.servings} raciones</span>
          <span>💶 {recipe.priceTotal.toFixed(2)}€ total</span>
          <span>💶 {recipe.pricePerServing.toFixed(2)}€/ración</span>
        </div>
      </header>

      <AddRecipeButton recipeId={recipe.id} />

      <section>
        <h2 className="text-lg font-semibold mb-3">Ingredientes</h2>
        <ul className="space-y-2">
          {recipe.ingredients.map((ing, idx) => {
            const food = foodsById[ing.foodId];
            return (
              <li
                key={idx}
                className="flex items-center justify-between gap-3 p-3 bg-white rounded-xl border border-stone-200"
              >
                <div>
                  <p className="font-medium">{food?.name ?? ing.foodId}</p>
                  <p className="text-xs text-stone-500">
                    {ing.quantity}
                    {ing.optional ? " · opcional" : ""}
                  </p>
                </div>
                <span className="text-xl">
                  {food?.status === "permitido"
                    ? "🟢"
                    : food?.status === "depende"
                      ? "🟡"
                      : "🔴"}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Pasos</h2>
        <ol className="space-y-3">
          {recipe.steps.map((step, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-stone-900 text-white text-sm font-bold flex items-center justify-center">
                {idx + 1}
              </span>
              <p className="pt-0.5">{step}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
