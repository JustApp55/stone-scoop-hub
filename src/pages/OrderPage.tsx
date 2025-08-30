import { quickPickItems } from '@/data/menu'
import { CardItem } from '@/components/CardItem'
import { CouponSection } from '@/components/CouponSectionNew'
import { Cart } from '@/components/CartNew'
import { useCartStore } from '@/store/cart'
import { useToast } from '@/hooks/useToast'

export function OrderPage() {
  const { addItem } = useCartStore()
  const { showToast } = useToast()

  const handleAddToCart = (name: string, price: number) => {
    addItem(name, price)
    showToast(`Added ${name} to cart`, 'success')
  }

  return (
    <div className="mt-6">
      <h1 className="text-3xl font-black text-primary text-center">
        🛒 Order Online
      </h1>
      <p className="text-center mt-1 text-muted-foreground">
        Pickup or delivery.
      </p>
      
      <div className="grid lg:grid-cols-3 gap-4 mt-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Popular Items */}
          <div className="bg-card rounded-2xl shadow p-5">
            <h2 className="font-black text-xl text-primary">⚡ Popular</h2>
            <div className="grid md:grid-cols-2 gap-3 mt-3">
              {quickPickItems.map((item) => (
                <CardItem
                  key={item.n}
                  item={item}
                  onAddToCart={handleAddToCart}
                  small
                />
              ))}
            </div>
          </div>

          {/* Coupon Section */}
          <CouponSection />
        </div>

        {/* Cart */}
        <Cart />
      </div>
    </div>
  )
}