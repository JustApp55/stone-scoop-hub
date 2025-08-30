import { useState } from 'react'
import { Page } from '@/types/menu'
import { Navbar } from './Navbar'
import { HomePage } from '../pages/HomePage'
import { MenuPage } from '../pages/MenuPage'
import { SeasonalPage } from '../pages/SeasonalPage'
import { OrderPage } from '../pages/OrderPage'
import { ToastContainer } from './Toast'
import { ToastProvider } from './ToastProvider'

export function ColdStoneApp() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const handleNavigate = (page: Page) => {
    setCurrentPage(page)
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />
      case 'menu':
        return <MenuPage onNavigate={handleNavigate} />
      case 'seasonal':
        return <SeasonalPage onNavigate={handleNavigate} />
      case 'order':
        return <OrderPage />
      default:
        return <HomePage onNavigate={handleNavigate} />
    }
  }

  return (
    <ToastProvider>
      <div className="min-h-screen">
        {/* Top Banner */}
        <div className="bg-primary text-primary-foreground text-center text-sm font-bold py-2">
          🎉 Join Cold Stone Club for BOGO! 🎉
        </div>

        {/* Navigation */}
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4">
          {renderCurrentPage()}
        </main>

        {/* Toast Container */}
        <ToastContainer />
      </div>
    </ToastProvider>
  )
}