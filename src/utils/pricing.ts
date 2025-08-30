import { CartItem } from '@/types/menu'

export const TAX_RATE = 0.08875 // NYC demo rate

export function calcSubtotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + (item.p * item.q), 0)
}

export function calcDiscount(cart: CartItem[], couponCode: string | null): number {
  if (!couponCode || !/^(LOVEITBOGO|BIRTHDAYBOGO)$/.test(couponCode)) return 0
  
  // BOGO: free lowest-priced item when ≥2 items
  const allPrices = cart.flatMap(item => Array(item.q).fill(item.p))
  if (allPrices.length < 2) return 0
  
  return Math.min(...allPrices)
}

export function calcTax(amount: number): number {
  return amount * TAX_RATE
}

export function calcTotal(subtotal: number, discount: number, tax: number): number {
  return subtotal - discount + tax
}

export function calcOrderTotals(cart: CartItem[], couponCode: string | null) {
  const subtotal = calcSubtotal(cart)
  const discount = calcDiscount(cart, couponCode)
  const tax = calcTax(subtotal - discount)
  const total = calcTotal(subtotal, discount, tax)
  
  return { subtotal, discount, tax, total }
}