import { quickPickItems } from "@/data/items";
import IceCreamCard from "../IceCreamCard";
import CouponSection from "../CouponSection";
import Cart from "../Cart";
import { CartItem } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface OrderPageProps {
  onAddToCart: (name: string, price: number) => void;
  cartItems: CartItem[];
  onRemoveFromCart: (index: number) => void;
  coupon: string | null;
  onApplyCoupon: (coupon: string) => void;
}

const OrderPage = ({ 
  onAddToCart, 
  cartItems, 
  onRemoveFromCart, 
  coupon, 
  onApplyCoupon 
}: OrderPageProps) => {
  const { toast } = useToast();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Add some items before checking out!",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Redirecting to secure checkout...",
      description: "Processing your order",
    });
  };

  return (
    <section className="mt-8 space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-black text-primary">🛒 Order Online</h1>
        <p className="mt-2 text-muted-foreground">Skip the line — pickup or delivery.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Popular Items */}
          <div className="bg-card rounded-2xl shadow-lg p-6">
            <h2 className="font-black text-2xl text-primary">⚡ Popular Items</h2>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {quickPickItems.map((item) => (
                <IceCreamCard 
                  key={item.name}
                  item={item} 
                  onAddToCart={onAddToCart}
                  small 
                />
              ))}
            </div>
          </div>

          {/* Coupon Section */}
          <CouponSection onApplyCoupon={onApplyCoupon} />
        </div>

        {/* Cart */}
        <Cart 
          items={cartItems}
          onRemoveItem={onRemoveFromCart}
          coupon={coupon}
          onCheckout={handleCheckout}
        />
      </div>
    </section>
  );
};

export default OrderPage;