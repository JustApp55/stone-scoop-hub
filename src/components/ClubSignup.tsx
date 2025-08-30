import { useState } from 'react'
import { joinClub } from '@/lib/supabase'
import { useToast } from '@/hooks/useToast'

export function ClubSignup() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { showToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      showToast('Enter a valid email', 'error')
      return
    }

    setIsLoading(true)
    try {
      await joinClub(email.trim())
      showToast('Welcome to the Club! 🎉', 'success')
      setEmail('')
    } catch (error) {
      console.error('Club signup error:', error)
      showToast('Signup failed. Please try again.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="mt-8 rounded-2xl rewards-gradient text-white p-6 text-center">
      <h3 className="text-2xl font-black">Join the Cold Stone Club ⭐</h3>
      <p className="mt-1 opacity-90">Birthday BOGO • Points • App deals</p>
      
      <form 
        onSubmit={handleSubmit}
        className="mt-3 flex gap-2 justify-center max-w-md mx-auto"
      >
        <label htmlFor="club-email" className="sr-only">
          Email address for Cold Stone Club
        </label>
        <input
          id="club-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@email.com"
          className="px-4 py-2 rounded-full border text-foreground flex-1 min-w-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
          disabled={isLoading}
          aria-describedby="club-signup-description"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 rounded-full bg-yellow-300 text-slate-900 font-black hover:bg-yellow-300/90 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-primary transition-colors"
          aria-label="Join Cold Stone Club for free"
        >
          {isLoading ? 'Joining...' : 'Join Free'}
        </button>
      </form>
      
      <div id="club-signup-description" className="sr-only">
        Join our club to receive birthday buy-one-get-one offers, earn points on purchases, and get exclusive app deals.
      </div>
    </section>
  )
}