import Link from "next/link";
import { notFound } from "next/navigation";
import { recipes } from "@/data/recipes";
import { AddRecipeButton } from "@/components/AddRecipeButton";
import { IngredientsList } from "@/components/IngredientsList";

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
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-lg font-semibold">Ingredientes</h2>
          <p className="text-xs text-stone-700">Pulsa + para añadir al carro</p>
        </div>
        <IngredientsList ingredients={recipe.ingredients} />
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
