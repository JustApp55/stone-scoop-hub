import { CartItem } from "@/types";
import { Button } from "./ui/button";

interface CartProps {
  items: CartItem[];
  onRemoveItem: (index: number) => void;
  coupon: string | null;
  onCheckout: () => void;
}

const Cart = ({ items, onRemoveItem, coupon, onCheckout }: CartProps) => {
  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    let discount = 0;
    if (coupon && (coupon === "LOVEITBOGO" || coupon === "BIRTHDAYBOGO")) {
      const prices = items.flatMap(item => 
        Array(item.quantity).fill(item.price)
      ).sort((a, b) => a - b);
      if (prices.length > 1) {
        discount = prices[0];
      }
    }
    
    const tax = (subtotal - discount) * 0.08875;
    const total = subtotal - discount + tax;
    
    return { subtotal, discount, tax, total };
  };

  const { subtotal, discount, tax, total } = calculateTotals();

  return (
    <aside className="bg-card rounded-2xl shadow-lg p-6 h-fit sticky top-20">
      <h2 className="font-black text-2xl text-primary">Your Order</h2>
      
      <div className="mt-4 text-sm space-y-3">
        {items.length === 0 ? (
          <div className="text-center text-muted-foreground py-6">
            <div className="text-4xl">🍦</div>
            Your cart is empty
          </div>
        ) : (
          items.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <div className="font-bold">{item.name}</div>
                <div className="text-xs text-muted-foreground">Qty: {item.quantity}</div>
              </div>
              <div className="text-right">
                <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                <button 
                  onClick={() => onRemoveItem(index)}
                  className="text-primary text-xs hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <div className="mt-4 space-y-1">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-700">
              <span>Discount</span>
              <strong>-${discount.toFixed(2)}</strong>
            </div>
          )}
          <div className="flex justify-between">
            <span>Tax</span>
            <strong>${tax.toFixed(2)}</strong>
          </div>
          <div className="border-t pt-2 flex justify-between font-black text-primary text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <Button 
            onClick={onCheckout}
            className="mt-3 w-full hero-button bg-primary text-primary-foreground hover:bg-primary/90"
          >
            🚀 Checkout
          </Button>
          
          <div className="grid grid-cols-2 gap-2 text-xs mt-2">
            <Button variant="outline" className="text-xs py-2">DoorDash</Button>
            <Button variant="outline" className="text-xs py-2">Uber Eats</Button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Cart;