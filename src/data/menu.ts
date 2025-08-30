import { MenuItem } from '@/types/menu'

export const signatureItems: MenuItem[] = [
  { n: "Strawberry Passion™", p: 7.99, e: "🍓", category: "signature" },
  { n: "Chocolate Devotion™", p: 8.49, e: "🍫", category: "signature" },
  { n: "Peanut Butter Cup Perfection™", p: 8.99, e: "🥜", category: "signature" }
]

export const seasonalItems: MenuItem[] = [
  { n: "Caramel Carnival Churro™", p: 9.49, e: "🍮", category: "seasonal", limited: true },
  { n: "Cornbread Is My Jam™", p: 8.99, e: "🌽", category: "seasonal", limited: true }
]

export const quickPickItems: MenuItem[] = [
  ...signatureItems.slice(0, 2),
  ...seasonalItems
]