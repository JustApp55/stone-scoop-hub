import { Page } from '@/types/menu'
import { seasonalItems } from '@/data/menu'
import { CardItem } from '@/components/CardItem'
import { useCartStore } from '@/store/cart'
import { useToast } from '@/hooks/useToast'

interface SeasonalPageProps {
  onNavigate: (page: Page) => void
}

export function SeasonalPage({ onNavigate }: SeasonalPageProps) {
  const { addItem } = useCartStore()
  const { showToast } = useToast()

  const handleAddToCart = (name: string, price: number) => {
    addItem(name, price)
    showToast(`Added ${name} to cart`, 'success')
  }

  return (
    <div className="mt-6">
      <div className="rounded-2xl p-6 text-center text-white seasonal-gradient">
        <h1 className="text-3xl font-black">🎪 Seasonal Specials</h1>
        <p className="mt-1 opacity-90">Limited time flavors. Don't miss out!</p>
        
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {seasonalItems.map((item) => (
            <CardItem
              key={item.n}
              item={item}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
        
        <button
          onClick={() => onNavigate('order')}
          className="mt-4 hero-button bg-white text-primary hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-500"
          aria-label="Order seasonal ice cream specials"
        >
          Order Seasonal
        </button>
      </div>
    </div>
  )
}