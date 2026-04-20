"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Inicio", icon: "🏠" },
  { href: "/buscar", label: "Buscar", icon: "🔍" },
  { href: "/recetas", label: "Recetas", icon: "🍳" },
  { href: "/lista", label: "Lista", icon: "🛒" },
];

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 border-t border-stone-200 bg-white/95 backdrop-blur z-50">
      <ul className="max-w-2xl mx-auto grid grid-cols-4">
        {tabs.map((tab) => {
          const active =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href);
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={`flex flex-col items-center gap-1 py-3 text-xs transition-colors ${
                  active
                    ? "text-green-700 font-semibold"
                    : "text-stone-600 hover:text-stone-800"
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span>{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
