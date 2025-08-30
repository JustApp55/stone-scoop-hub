import { IceCreamItem } from "@/types";
import { Button } from "./ui/button";

interface IceCreamCardProps {
  item: IceCreamItem;
  onAddToCart: (name: string, price: number) => void;
  small?: boolean;
}

const IceCreamCard = ({ item, onAddToCart, small = false }: IceCreamCardProps) => {
  return (
    <div className="ice-cream-card">
      <div className="flex items-start gap-4">
        <div className="text-4xl">{item.emoji}</div>
        <div className="flex-1">
          <div className={`font-black text-primary ${small ? '' : 'text-lg'}`}>
            {item.name}
          </div>
          {item.limited && (
            <div className="text-xs font-bold text-orange-600">Limited Time</div>
          )}
          <div className="font-bold">${item.price.toFixed(2)}</div>
        </div>
        <Button 
          onClick={() => onAddToCart(item.name, item.price)}
          className="hero-button bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default IceCreamCard;