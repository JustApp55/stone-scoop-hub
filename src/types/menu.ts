export interface MenuItem {
  n: string // name
  p: number // price  
  e: string // emoji
  category?: 'signature' | 'seasonal' | 'build'
  limited?: boolean
}

export interface CartItem {
  n: string
  p: number
  q: number
}

export type Page = 'home' | 'menu' | 'seasonal' | 'order'
export type MenuTab = 'signature' | 'seasonal' | 'build'