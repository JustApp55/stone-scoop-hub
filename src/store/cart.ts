import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { CartItem } from '@/types/menu'
import { calcOrderTotals } from '@/utils/pricing'

interface CartState {
  items: CartItem[]
  couponCode: string | null
  addItem: (name: string, price: number) => void
  removeItem: (index: number) => void
  applyCoupon: (code: string) => void
  clearCart: () => void
  getTotals: () => ReturnType<typeof calcOrderTotals>
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      
      addItem: (name: string, price: number) => {
        set((state) => {
          const existingItem = state.items.find(item => item.n === name)
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.n === name ? { ...item, q: item.q + 1 } : item
              )
            }
          } else {
            return {
              items: [...state.items, { n: name, p: price, q: 1 }]
            }
          }
        })
      },
      
      removeItem: (index: number) => {
        set((state) => ({
          items: state.items.filter((_, i) => i !== index)
        }))
      },
      
      applyCoupon: (code: string) => {
        set({ couponCode: code.toUpperCase() })
      },
      
      clearCart: () => {
        set({ items: [], couponCode: null })
      },
      
      getTotals: () => {
        const { items, couponCode } = get()
        return calcOrderTotals(items, couponCode)
      }
    }),
    {
      name: 'coldstone-cart',
      storage: createJSONStorage(() => localStorage)
    }
  )
)