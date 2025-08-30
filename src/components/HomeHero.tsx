import { Page } from '@/types/menu'

interface HomeHeroProps {
  onNavigate: (page: Page) => void
}

export function HomeHero({ onNavigate }: HomeHeroProps) {
  return (
    <header className="hero-gradient text-white rounded-2xl mt-6 p-8 text-center shadow-2xl">
      <h1 className="text-4xl md:text-5xl font-black leading-tight">
        THE ULTIMATE ICE CREAM EXPERIENCE™
      </h1>
      <p className="mt-2 md:text-lg font-semibold opacity-90">
        Fresh ice cream mixed on our frozen granite stone.
      </p>
      <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => onNavigate('order')}
          className="hero-button bg-white text-primary hover:bg-white/90 shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
          aria-label="Start ordering ice cream online"
        >
          🍦 Order
        </button>
        <button
          onClick={() => onNavigate('seasonal')}
          className="hero-button bg-yellow-300 text-slate-900 hover:bg-yellow-300/90 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-primary"
          aria-label="View seasonal ice cream specials"
        >
          🎪 Seasonal
        </button>
      </div>
    </header>
  )
}