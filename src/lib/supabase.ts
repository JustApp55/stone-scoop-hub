import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const sb: SupabaseClient | null = 
  supabaseUrl && supabaseAnonKey 
    ? createClient(supabaseUrl, supabaseAnonKey) 
    : null

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
  if (!sb) {
    console.warn('Supabase not configured - order not saved')
    return
  }
  const { error } = await sb.from('orders').insert(payload)
  if (error) throw error
}

export async function joinClub(email: string): Promise<void> {
  if (!sb) {
    console.warn('Supabase not configured - signup not saved')
    return
  }
  const { error } = await sb.from('club_signups').insert({ email })
  if (error) throw error
}