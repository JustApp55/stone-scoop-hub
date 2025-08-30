import { createClient } from '@supabase/supabase-js'

export const sb = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
)

export type Database = {
  public: {
    Tables: {
      orders: {
        Row: {
          id: string
          items: OrderItem[]
          subtotal: number
          discount: number
          tax: number
          total: number
          email: string | null
          created_at: string
        }
        Insert: {
          items: OrderItem[]
          subtotal: number
          discount: number
          tax: number
          total: number
          email?: string | null
        }
      }
      club_signups: {
        Row: {
          id: string
          email: string
          created_at: string
        }
        Insert: {
          email: string
        }
      }
    }
  }
}

export type OrderItem = { 
  n: string
  p: number
  q: number 
}

export type OrderPayload = {
  items: OrderItem[]
  subtotal: number
  discount: number
  tax: number
  total: number
  email?: string | null
}

export async function saveOrder(payload: OrderPayload): Promise<void> {
  const { error } = await sb.from('orders').insert(payload)
  if (error) throw error
}

export async function joinClub(email: string): Promise<void> {
  const { error } = await sb.from('club_signups').insert({ email })
  if (error) throw error
}