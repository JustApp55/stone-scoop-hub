import { IceCreamItem, Page } from "@/types";
import { signatureItems } from "@/data/items";
import IceCreamCard from "../IceCreamCard";
import { Button } from "../ui/button";

interface HomePageProps {
  onNavigate: (page: Page) => void;
  onAddToCart: (name: string, price: number) => void;
}

const HomePage = ({ onNavigate, onAddToCart }: HomePageProps) => {
  return (
    <section className="space-y-12">
      {/* Hero Section */}
      <header className="hero-gradient text-white rounded-3xl mt-6 p-10 text-center">
        <h1 className="text-4xl md:text-6xl font-black leading-tight">
          THE ULTIMATE<br/>ICE CREAM EXPERIENCE™
        </h1>
        <p className="mt-4 text-lg md:text-2xl font-semibold">
          Fresh ice cream mixed on our frozen granite stone.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => onNavigate('order')}
            className="hero-button bg-white text-primary hover:bg-white/90"
          >
            🍦 Order Online
          </Button>
          <Button 
            onClick={() => onNavigate('seasonal')}
            className="hero-button bg-yellow-300 text-foreground hover:bg-yellow-300/90"
          >
            🎪 Seasonal Specials
          </Button>
        </div>
      </header>

      {/* Signature Creations */}
      <section>
        <h2 className="text-center text-3xl font-black text-primary">
          Signature Creations™
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {signatureItems.slice(0, 3).map((item) => (
            <IceCreamCard 
              key={item.name}
              item={item} 
              onAddToCart={onAddToCart}
              small 
            />
          ))}
        </div>
        <div className="text-center mt-6">
          <Button 
            onClick={() => onNavigate('menu')}
            className="hero-button bg-blue-600 text-white hover:bg-blue-600/90"
          >
            View Full Menu
          </Button>
        </div>
      </section>

      {/* Rewards Section */}
      <section className="rewards-gradient rounded-3xl text-white p-8 text-center">
        <h3 className="text-3xl font-black">Join the Cold Stone Club ⭐</h3>
        <p className="mt-2 font-semibold">Birthday BOGO • Earn points • App-only deals</p>
        <Button 
          onClick={() => alert('Open rewards signup flow')}
          className="mt-4 hero-button bg-yellow-300 text-foreground hover:bg-yellow-300/90"
        >
          Join Free
        </Button>
      </section>
    </section>
  );
};

export default HomePage;