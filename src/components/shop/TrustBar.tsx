import { Package, Truck } from "lucide-react";
import paypalLogo from "@/assets/paypal-logo.png";
import klarnaLogo from "@/assets/klarna-logo.png";

export const TrustBar = () => {
  return (
    <div className="w-full bg-secondary/30 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-8 py-3 overflow-x-auto">
          {/* 14 Tage Rückgaberecht */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <div className="w-6 h-6 flex items-center justify-center">
              <Package className="w-5 h-5 text-foreground" />
            </div>
            <span className="text-sm text-foreground">14 Tage Rückgaberecht</span>
          </div>

          {/* Kostenloser Versand */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <div className="w-6 h-6 flex items-center justify-center">
              <Truck className="w-5 h-5 text-foreground" />
            </div>
            <span className="text-sm text-foreground">Kostenloser Versand ab 49€</span>
          </div>

          {/* PayPal */}
          <div className="flex items-center gap-1 whitespace-nowrap">
            <img src={paypalLogo} alt="PayPal" className="h-8" />
            <span className="text-sm text-foreground">Bezahle in 30 Tagen</span>
          </div>

          {/* Klarna */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <img src={klarnaLogo} alt="Klarna" className="h-5" />
            <span className="text-sm text-foreground">Bezahle in 30 Tagen</span>
          </div>
        </div>
      </div>
    </div>
  );
};
