import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";

interface CouponSectionProps {
  onApplyCoupon: (coupon: string) => void;
}

const CouponSection = ({ onApplyCoupon }: CouponSectionProps) => {
  const [couponInput, setCouponInput] = useState("");
  const { toast } = useToast();

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      toast({
        title: "Please enter a coupon code",
        variant: "destructive",
      });
      return;
    }
    onApplyCoupon(code);
    toast({
      title: `Coupon ${code} applied!`,
      description: "Your discount has been added to your order.",
    });
  };

  const handleQuickCoupon = (code: string) => {
    setCouponInput(code);
    onApplyCoupon(code);
    toast({
      title: `Coupon ${code} applied!`,
      description: "Your discount has been added to your order.",
    });
  };

  return (
    <div className="coupon-gradient rounded-2xl p-6">
      <h3 className="text-2xl font-black text-white">💰 Apply Coupon</h3>
      <div className="flex gap-2 mt-3">
        <Input
          value={couponInput}
          onChange={(e) => setCouponInput(e.target.value)}
          placeholder="LOVEITBOGO"
          className="flex-1 rounded-full"
        />
        <Button 
          onClick={handleApplyCoupon}
          className="hero-button bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Apply
        </Button>
      </div>
      <div className="mt-3 flex gap-2 flex-wrap">
        <Button 
          onClick={() => handleQuickCoupon('LOVEITBOGO')}
          variant="secondary"
          className="hero-button bg-card text-primary hover:bg-card/90"
        >
          LOVEITBOGO
        </Button>
        <Button 
          onClick={() => handleQuickCoupon('BIRTHDAYBOGO')}
          variant="secondary"
          className="hero-button bg-card text-primary hover:bg-card/90"
        >
          BIRTHDAYBOGO
        </Button>
      </div>
    </div>
  );
};

export default CouponSection;