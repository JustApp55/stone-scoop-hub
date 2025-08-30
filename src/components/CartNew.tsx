import { useCartStore } from '@/store/cart'
import { useState } from 'react'
import { saveOrder } from '@/lib/supabase'
import { useToast } from '@/hooks/useToast'

export function Cart() {
  const { items, removeItem, getTotals, couponCode, clearCart } = useCartStore()
  const { showToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const { subtotal, discount, tax, total } = getTotals()

  const handleCheckout = async () => {
    if (!items.length) {
      showToast('Add items first', 'error')
      return
    }

    setIsLoading(true)
    try {
      await saveOrder({
        items: items.map(item => ({ n: item.n, p: item.p, q: item.q })),
        subtotal,
        discount,
        tax,
        total
      })
      
      showToast('Order saved! Redirecting to checkout...', 'success')
      clearCart()
    } catch (error) {
      console.error('Checkout error:', error)
      showToast('Checkout failed. Please try again.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <aside 
      className="bg-card rounded-2xl shadow p-5 h-fit sticky top-20"
      role="region"
      aria-label="Shopping cart"
    >
      <h2 className="font-black text-xl text-primary">Your Order</h2>
      
      <div className="mt-3 text-sm space-y-3">
        {items.length === 0 ? (
          <div className="text-center text-muted-foreground py-5">
            <div className="text-3xl" role="img" aria-label="Empty cart">🍦</div>
            <p>Cart is empty</p>
          </div>
        ) : (
          items.map((item, index) => (
            <div key={`${item.n}-${index}`} className="flex justify-between items-center">
              <div>
                <div className="font-bold">{item.n}</div>
                <div className="text-xs text-muted-foreground">Qty: {item.q}</div>
              </div>
              <div className="text-right">
                <div className="font-bold">${(item.p * item.q).toFixed(2)}</div>
                <button
                  onClick={() => removeItem(index)}
                  className="text-destructive text-xs hover:underline focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2 rounded"
                  aria-label={`Remove ${item.n} from cart`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <div className="mt-3 space-y-1 border-t pt-3">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span className="font-bold">${subtotal.toFixed(2)}</span>
          </div>
          
          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-700">
              <span>Discount ({couponCode})</span>
              <span className="font-bold">-${discount.toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span className="font-bold">${tax.toFixed(2)}</span>
          </div>
          
          <div className="border-t pt-2 flex justify-between font-black text-primary">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <button
            onClick={handleCheckout}
            disabled={isLoading}
            className="mt-3 w-full px-4 py-3 rounded-full bg-primary text-primary-foreground font-black hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            aria-label={`Checkout with total of $${total.toFixed(2)}`}
          >
            {isLoading ? 'Processing...' : '🚀 Checkout'}
          </button>
          
          <div className="grid grid-cols-2 gap-2 text-xs mt-2">
            <button 
              className="px-3 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Order via DoorDash"
            >
              DoorDash
            </button>
            <button 
              className="px-3 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
              aria-label="Order via Uber Eats"
            >
              Uber Eats
            </button>
          </div>
        </div>
      )}
    </aside>
  )
}