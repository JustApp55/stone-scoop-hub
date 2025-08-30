import { useState } from 'react'
import { MenuTab } from '@/types/menu'
import { signatureItems, seasonalItems } from '@/data/menu'
import { CardItem } from './CardItem'
import { Page } from '@/types/menu'

interface MenuTabsProps {
  onAddToCart: (name: string, price: number) => void
  onNavigate: (page: Page) => void
}

export function MenuTabs({ onAddToCart, onNavigate }: MenuTabsProps) {
  const [activeTab, setActiveTab] = useState<MenuTab>('signature')

  const tabs = [
    { id: 'signature' as MenuTab, label: 'Signature', items: signatureItems },
    { id: 'seasonal' as MenuTab, label: 'Seasonal', items: seasonalItems },
    { id: 'build' as MenuTab, label: 'Build Your Own', items: [] }
  ]

  return (
    <div className="mt-4">
      {/* Tab buttons */}
      <div 
        className="flex flex-wrap justify-center gap-2"
        role="tablist"
        aria-label="Menu categories"
      >
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`tab-button ${
              activeTab === id ? 'tab-active' : 'tab-inactive'
            } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
            role="tab"
            aria-selected={activeTab === id}
            aria-controls={`panel-${id}`}
            id={`tab-${id}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div className="mt-4">
        {tabs.map(({ id, items }) => (
          <div
            key={id}
            id={`panel-${id}`}
            role="tabpanel"
            aria-labelledby={`tab-${id}`}
            className={activeTab === id ? '' : 'hidden'}
          >
            {id === 'build' ? (
              <div className="bg-card rounded-2xl shadow p-5 text-center">
                <h2 className="text-xl font-black text-blue-600">Create Your Mix</h2>
                <p className="mt-1 text-muted-foreground">Pick a base + 3 mix-ins • From $6.99</p>
                <button
                  onClick={() => onNavigate('order')}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-full font-black hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                  aria-label="Start building your custom ice cream"
                >
                  Start
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                {items.map((item) => (
                  <CardItem
                    key={item.n}
                    item={item}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}