import { Page } from '@/types/menu'
import { signatureItems } from '@/data/menu'
import { HomeHero } from '@/components/HomeHero'
import { CardItem } from '@/components/CardItem'
import { ClubSignup } from '@/components/ClubSignup'
import { useCartStore } from '@/store/cart'
import { useToast } from '@/hooks/useToast'

interface HomePageProps {
  onNavigate: (page: Page) => void
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { addItem } = useCartStore()
  const { showToast } = useToast()

  const handleAddToCart = (name: string, price: number) => {
    addItem(name, price)
    showToast(`Added ${name} to cart`, 'success')
  }

  return (
    <div>
      <HomeHero onNavigate={onNavigate} />
      
      <section className="mt-8">
        <h2 className="text-center text-2xl font-black text-primary">
          Signature Creations™
        </h2>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {signatureItems.map((item) => (
            <CardItem
              key={item.n}
              item={item}
              onAddToCart={handleAddToCart}
              small
            />
          ))}
        </div>
        <div className="text-center mt-4">
          <button
            onClick={() => onNavigate('menu')}
            className="hero-button bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            aria-label="View complete ice cream menu"
          >
            View Menu
          </button>
        </div>
      </section>

      <ClubSignup />
    </div>
  )
}