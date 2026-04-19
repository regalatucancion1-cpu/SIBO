export type FoodStatus = "permitido" | "prohibido" | "depende";

export type FoodCategory =
  | "Frutas"
  | "Verduras"
  | "Proteína animal"
  | "Lácteos"
  | "Cereales y pan"
  | "Legumbres"
  | "Frutos secos"
  | "Aceites y condimentos"
  | "Bebidas"
  | "Dulces y otros";

export interface Food {
  id: string;
  name: string;
  category: FoodCategory;
  status: FoodStatus;
  portion: string;
  reason: string;
  supermarket?: string;
}

export interface RecipeIngredient {
  foodId: string;
  quantity: string;
  optional?: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  prepTimeMin: number;
  servings: number;
  priceTotal: number;
  pricePerServing: number;
  difficulty: "fácil" | "media" | "difícil";
  tags: string[];
  ingredients: RecipeIngredient[];
  steps: string[];
}

export interface ShoppingItem {
  id: string;
  foodId?: string;
  manualName?: string;
  quantity: string;
  checked: boolean;
  category: FoodCategory | "Manual";
}
