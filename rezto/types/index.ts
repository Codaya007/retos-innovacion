export interface WasteItem {
  id: string;
  type: string;
  quantity: number;
  unit: string;
  location: {
    lat: number;
    long: number;
  };
  imageUrl?: string;
}

export interface IndustrialRecipe {
  id: string;
  productName: string;
  ingredientA: WasteItem;
  ingredientB: WasteItem;
  companyB: string;
  distance: string;
  aiExplanation: string;
}

export type UserRole = 'industry' | 'individual';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  token: string;
}