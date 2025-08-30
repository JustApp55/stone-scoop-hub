import { IceCreamItem } from "@/types";

export const signatureItems: IceCreamItem[] = [
  { name: "Strawberry Passion™", price: 7.99, emoji: "🍓", category: "signature" },
  { name: "Chocolate Devotion™", price: 8.49, emoji: "🍫", category: "signature" },
  { name: "Peanut Butter Cup Perfection™", price: 8.99, emoji: "🥜", category: "signature" },
  { name: "Birthday Cake Remix™", price: 8.79, emoji: "🎂", category: "signature" },
  { name: "Mint Mint Chocolate Chocolate Chip™", price: 8.29, emoji: "🍃", category: "signature" },
  { name: "Oreo Overload™", price: 8.99, emoji: "🍪", category: "signature" },
];

export const seasonalItems: IceCreamItem[] = [
  { name: "Caramel Carnival Churro™", price: 9.49, emoji: "🍮", category: "seasonal", limited: true },
  { name: "Cornbread Is My Jam™", price: 8.99, emoji: "🌽", category: "seasonal", limited: true },
  { name: "Apple Pie A La Cold Stone™", price: 9.29, emoji: "🥧", category: "seasonal", limited: true },
  { name: "Pumpkin Spice Latte™", price: 8.79, emoji: "🎃", category: "seasonal", limited: true },
];

export const quickPickItems: IceCreamItem[] = [
  ...signatureItems.slice(0, 2),
  ...seasonalItems.slice(0, 2),
];