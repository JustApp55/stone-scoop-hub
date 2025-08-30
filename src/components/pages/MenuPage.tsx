import { useState } from "react";
import { MenuTab, Page } from "@/types";
import { signatureItems, seasonalItems } from "@/data/items";
import IceCreamCard from "../IceCreamCard";
import { Button } from "../ui/button";

interface MenuPageProps {
  onNavigate: (page: Page) => void;
  onAddToCart: (name: string, price: number) => void;
}

const MenuPage = ({ onNavigate, onAddToCart }: MenuPageProps) => {
  const [activeTab, setActiveTab] = useState<MenuTab>("signature");

  const tabs = [
    { id: "signature" as MenuTab, label: "Signature" },
    { id: "build" as MenuTab, label: "Build Your Own" },
    { id: "shakes" as MenuTab, label: "Shakes" },
    { id: "seasonal" as MenuTab, label: "Seasonal" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "signature":
        return (
          <div className="grid md:grid-cols-3 gap-6">
            {signatureItems.map((item) => (
              <IceCreamCard 
                key={item.name}
                item={item} 
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        );
      
      case "build":
        return (
          <div className="bg-card rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-black text-blue-700 text-center">
              Create Your Perfect Mix
            </h2>
            <p className="mt-2 text-center text-muted-foreground">
              Choose a base + up to 3 mix-ins • From $6.99
            </p>
            <div className="text-center mt-4">
              <Button 
                onClick={() => onNavigate('order')}
                className="hero-button bg-blue-600 text-white hover:bg-blue-600/90"
              >
                Start Building
              </Button>
            </div>
          </div>
        );
      
      case "shakes":
        return (
          <div className="bg-card rounded-2xl shadow-lg p-6 text-center">
            <div className="text-5xl">🥤</div>
            <p className="mt-4 text-muted-foreground">
              Made with your favorite flavors.
            </p>
          </div>
        );
      
      case "seasonal":
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {seasonalItems.map((item) => (
              <IceCreamCard 
                key={item.name}
                item={item} 
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section className="mt-8 space-y-6">
      <h1 className="text-4xl font-black text-primary text-center">🍦 Our Menu</h1>
      
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-button ${
              activeTab === tab.id ? "tab-active" : "tab-inactive"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </section>
  );
};

export default MenuPage;