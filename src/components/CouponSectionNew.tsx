import { useState } from 'react'
import { useCartStore } from '@/store/cart'
import { useToast } from '@/hooks/useToast'

export function CouponSection() {
  const [inputValue, setInputValue] = useState('')
  const { applyCoupon, couponCode } = useCartStore()
  const { showToast } = useToast()

  const handleApplyCoupon = () => {
    const code = inputValue.trim().toUpperCase()
    if (!code) {
      showToast('Enter a coupon code', 'error')
      return
    }
    
    applyCoupon(code)
    showToast(`Coupon ${code} applied!`, 'success')
    setInputValue('')
  }

  const handleQuickCoupon = (code: string) => {
    applyCoupon(code)
    showToast(`Coupon ${code} applied!`, 'success')
  }

  return (
    <div className="coupon-gradient rounded-2xl p-5">
      <h3 className="text-xl font-black text-white">💰 Apply Coupon</h3>
      {couponCode && (
        <p className="text-white/90 text-sm mt-1">
          Active: {couponCode}
        </p>
      )}
      
      <div className="flex gap-2 mt-2">
        <label htmlFor="coupon-input" className="sr-only">
          Enter coupon code
        </label>
        <input
          id="coupon-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="LOVEITBOGO"
          className="flex-1 px-4 py-2 rounded-full border text-foreground focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-400"
          onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
        />
        <button
          onClick={handleApplyCoupon}
          className="px-4 py-2 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-orange-400 transition-colors"
          aria-label="Apply coupon code"
        >
          Apply
        </button>
      </div>
      
      <div className="mt-2 flex gap-2 flex-wrap">
        <button
          onClick={() => handleQuickCoupon('LOVEITBOGO')}
          className="px-3 py-1 rounded-full bg-white text-primary font-bold hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-400 transition-colors"
          aria-label="Apply LOVEITBOGO coupon for buy one get one free"
        >
          LOVEITBOGO
        </button>
        <button
          onClick={() => handleQuickCoupon('BIRTHDAYBOGO')}
          className="px-3 py-1 rounded-full bg-white text-primary font-bold hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-400 transition-colors"
          aria-label="Apply BIRTHDAYBOGO coupon for birthday special"
        >
          BIRTHDAYBOGO
        </button>
      </div>
    </div>
  )
}