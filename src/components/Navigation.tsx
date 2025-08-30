import { useState } from "react";
import { Page } from "@/types";
import { Button } from "./ui/button";

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Navigation = ({ currentPage, onNavigate }: NavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="bg-card shadow sticky top-0 z-50 border-b-2 border-primary">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <button 
          onClick={() => handleNavigate('home')} 
          className="font-black text-xl text-primary hover:scale-105 transition-transform"
        >
          Cold Stone Creamery®
        </button>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-5 font-semibold">
          <button 
            onClick={() => handleNavigate('home')} 
            className={`hover:text-primary transition-colors ${currentPage === 'home' ? 'text-primary' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => handleNavigate('menu')} 
            className={`hover:text-primary transition-colors ${currentPage === 'menu' ? 'text-primary' : ''}`}
          >
            Menu
          </button>
          <button 
            onClick={() => handleNavigate('seasonal')} 
            className={`hover:text-primary transition-colors ${currentPage === 'seasonal' ? 'text-primary' : ''}`}
          >
            Seasonal
          </button>
          <Button 
            onClick={() => handleNavigate('order')} 
            className="hero-button bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Order Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-3 space-y-2 font-semibold bg-card border-t">
          <button 
            onClick={() => handleNavigate('home')} 
            className="block w-full text-left py-2 hover:text-primary transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavigate('menu')} 
            className="block w-full text-left py-2 hover:text-primary transition-colors"
          >
            Menu
          </button>
          <button 
            onClick={() => handleNavigate('seasonal')} 
            className="block w-full text-left py-2 hover:text-primary transition-colors"
          >
            Seasonal
          </button>
          <Button 
            onClick={() => handleNavigate('order')} 
            className="hero-button bg-primary text-primary-foreground w-full"
          >
            Order Now
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;