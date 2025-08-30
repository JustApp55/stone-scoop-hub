import { useState } from "react";
import { Page, CartItem } from "@/types";
import TopBanner from "./TopBanner";
import Navigation from "./Navigation";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import SeasonalPage from "./pages/SeasonalPage";
import OrderPage from "./pages/OrderPage";
import { useToast } from "@/hooks/use-toast";

const ColdStoneApp = () => {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddToCart = (name: string, price: number) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.name === name);
      if (existingItem) {
        return prev.map(item =>
          item.name === name 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { name, price, quantity: 1 }];
      }
    });

    toast({
      title: "Added to cart!",
      description: `${name} has been added to your order.`,
    });
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    });
  };

  const handleApplyCoupon = (newCoupon: string) => {
    setCoupon(newCoupon);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage 
            onNavigate={setCurrentPage}
            onAddToCart={handleAddToCart}
          />
        );
      case "menu":
        return (
          <MenuPage 
            onNavigate={setCurrentPage}
            onAddToCart={handleAddToCart}
          />
        );
      case "seasonal":
        return (
          <SeasonalPage 
            onNavigate={setCurrentPage}
            onAddToCart={handleAddToCart}
          />
        );
      case "order":
        return (
          <OrderPage 
            onAddToCart={handleAddToCart}
            cartItems={cartItems}
            onRemoveFromCart={handleRemoveFromCart}
            coupon={coupon}
            onApplyCoupon={handleApplyCoupon}
          />
        );
      default:
        return <HomePage onNavigate={setCurrentPage} onAddToCart={handleAddToCart} />;
    }
  };

  return (
    <div className="min-h-screen">
      <TopBanner />
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="max-w-6xl mx-auto px-4 pb-12">
        {renderCurrentPage()}
      </main>
    </div>
  );
};

export default ColdStoneApp;