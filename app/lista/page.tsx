"use client";

import { useState } from "react";
import { useShoppingList, categoryOrder } from "@/lib/hooks";
import { foodsById } from "@/data/foods";

export default function ListPage() {
  const {
    items,
    grouped,
    addManual,
    toggleItem,
    removeItem,
    clearChecked,
    clearAll,
    hydrated,
  } = useShoppingList();

  const [manualInput, setManualInput] = useState("");

  function handleAddManual(e: React.FormEvent) {
    e.preventDefault();
    addManual(manualInput);
    setManualInput("");
  }

  const totalItems = items.length;
  const checkedItems = items.filter((i) => i.checked).length;

  if (!hydrated) {
    return (
      <div className="text-center py-12 text-stone-400">Cargando lista...</div>
    );
  }

  return (
    <div className="space-y-5">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Lista de la compra</h1>
          <p className="text-sm text-stone-500 mt-1">
            {totalItems === 0
              ? "Aún no tienes nada en la lista"
              : `${checkedItems} de ${totalItems} comprados`}
          </p>
        </div>
        {totalItems > 0 && (
          <div className="flex flex-col gap-1">
            {checkedItems > 0 && (
              <button
                type="button"
                onClick={clearChecked}
                className="text-xs text-stone-500 underline"
              >
                Quitar comprados
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                if (confirm("¿Vaciar toda la lista?")) clearAll();
              }}
              className="text-xs text-red-600 underline"
            >
              Vaciar todo
            </button>
          </div>
        )}
      </header>

      <form onSubmit={handleAddManual} className="flex gap-2">
        <input
          type="text"
          value={manualInput}
          onChange={(e) => setManualInput(e.target.value)}
          placeholder="Añadir producto manual..."
          className="flex-1 px-4 py-3 bg-white rounded-xl border border-stone-200 focus:border-stone-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!manualInput.trim()}
          className="px-5 py-3 bg-stone-900 text-white rounded-xl font-semibold disabled:opacity-40"
        >
          +
        </button>
      </form>

      {totalItems === 0 ? (
        <div className="text-center py-16 text-stone-500">
          <p className="text-4xl mb-3">🛒</p>
          <p className="font-medium">La lista está vacía</p>
          <p className="text-xs mt-2">
            Añade productos desde el buscador o desde una receta.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {categoryOrder.map((category) => {
            const catItems = grouped[category];
            if (!catItems || catItems.length === 0) return null;
            return (
              <section key={category}>
                <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-2">
                  {category}
                </h2>
                <ul className="space-y-1">
                  {catItems.map((item) => {
                    const food = item.foodId ? foodsById[item.foodId] : null;
                    const name = food?.name ?? item.manualName ?? "?";
                    return (
                      <li
                        key={item.id}
                        className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200"
                      >
                        <button
                          type="button"
                          onClick={() => toggleItem(item.id)}
                          className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 ${
                            item.checked
                              ? "bg-green-600 border-green-600 text-white"
                              : "border-stone-300"
                          }`}
                          aria-label="Marcar comprado"
                        >
                          {item.checked && "✓"}
                        </button>
                        <div
                          className={`flex-1 min-w-0 ${
                            item.checked
                              ? "line-through text-stone-400"
                              : ""
                          }`}
                        >
                          <p className="font-medium truncate">{name}</p>
                          <p className="text-xs text-stone-500">
                            {item.quantity}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-stone-400 hover:text-red-600 text-lg shrink-0"
                          aria-label="Eliminar"
                        >
                          ✕
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
