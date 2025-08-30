import { useState } from 'react'
import { Page } from '@/types/menu'

interface NavbarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { page: 'home' as Page, label: 'Home' },
    { page: 'menu' as Page, label: 'Menu' },
    { page: 'seasonal' as Page, label: 'Seasonal' },
  ]

  const handleNavigation = (page: Page) => {
    onNavigate(page)
    setIsMenuOpen(false)
    window.scrollTo(0, 0)
  }

  return (
    <nav className="bg-card shadow sticky top-0 z-50 border-b-2 border-primary" role="navigation" aria-label="Main navigation">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <button 
          onClick={() => handleNavigation('home')}
          className="font-black text-lg text-primary hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
          aria-label="Cold Stone Creamery Home"
        >
          Cold Stone®
        </button>
        
        <div className="hidden md:flex gap-5 font-semibold">
          {navItems.map(({ page, label }) => (
            <button
              key={page}
              onClick={() => handleNavigation(page)}
              className={`hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1 ${
                currentPage === page ? 'text-primary' : 'text-foreground'
              }`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => handleNavigation('order')}
            className="hero-button bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Start ordering online"
          >
            Order
          </button>
        </div>

        <button 
          className="md:hidden p-2 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          <span className="text-xl">☰</span>
        </button>
      </div>

      {/* Mobile menu */}
      <div 
        id="mobile-menu"
        className={`md:hidden px-4 pb-3 space-y-2 font-semibold ${isMenuOpen ? '' : 'hidden'}`}
      >
        {navItems.map(({ page, label }) => (
          <button
            key={page}
            onClick={() => handleNavigation(page)}
            className={`block w-full text-left px-2 py-1 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded ${
              currentPage === page ? 'text-primary' : 'text-foreground'
            }`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {label}
          </button>
        ))}
        <button
          onClick={() => handleNavigation('order')}
          className="block px-4 py-2 rounded-full bg-primary text-primary-foreground w-full text-center hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Start ordering online"
        >
          Order
        </button>
      </div>
    </nav>
  )
}