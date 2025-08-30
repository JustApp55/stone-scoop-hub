export interface IceCreamItem {
  name: string;
  price: number;
  emoji: string;
  category: "signature" | "seasonal" | "shakes" | "build";
  limited?: boolean;
}

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

export type Page = "home" | "menu" | "seasonal" | "order";
export type MenuTab = "signature" | "build" | "shakes" | "seasonal";