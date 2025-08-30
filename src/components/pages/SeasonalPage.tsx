import { Page } from "@/types";
import { seasonalItems } from "@/data/items";
import IceCreamCard from "../IceCreamCard";
import { Button } from "../ui/button";

interface SeasonalPageProps {
  onNavigate: (page: Page) => void;
  onAddToCart: (name: string, price: number) => void;
}

const SeasonalPage = ({ onNavigate, onAddToCart }: SeasonalPageProps) => {
  return (
    <section className="mt-8">
      <div className="seasonal-gradient rounded-3xl p-10 text-center text-white">
        <h1 className="text-4xl font-black">🎪 Seasonal Specials</h1>
        <p className="mt-2 font-semibold">
          Limited time flavors. Get them before they're gone!
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {seasonalItems.map((item) => (
            <IceCreamCard 
              key={item.name}
              item={item} 
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
        
        <Button 
          onClick={() => onNavigate('order')}
          className="mt-6 hero-button bg-white text-primary hover:bg-white/90"
        >
          Order Seasonal
        </Button>
      </div>
    </section>
  );
};

export default SeasonalPage;