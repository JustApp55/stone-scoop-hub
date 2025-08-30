import { Page } from '@/types/menu'
import { MenuTabs } from '@/components/MenuTabs'
import { useCartStore } from '@/store/cart'
import { useToast } from '@/hooks/useToast'

interface MenuPageProps {
  onNavigate: (page: Page) => void
}

export function MenuPage({ onNavigate }: MenuPageProps) {
  const { addItem } = useCartStore()
  const { showToast } = useToast()

  const handleAddToCart = (name: string, price: number) => {
    addItem(name, price)
    showToast(`Added ${name} to cart`, 'success')
  }

  return (
    <div className="mt-6">
      <h1 className="text-3xl font-black text-primary text-center">
        🍦 Menu
      </h1>
      <MenuTabs onAddToCart={handleAddToCart} onNavigate={onNavigate} />
    </div>
  )
}