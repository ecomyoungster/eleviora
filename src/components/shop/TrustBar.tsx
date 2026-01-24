import { Package, Truck } from "lucide-react";
import paypalLogo from "@/assets/paypal-logo.png";
import klarnaLogo from "@/assets/klarna-logo-badge.png";
import { useTranslation } from "@/stores/localeStore";

export const TrustBar = () => {
  const t = useTranslation();
  
  return (
    <div className="w-full bg-secondary/30 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-8 py-3 overflow-x-auto">
          {/* 14 Tage Rückgaberecht */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <div className="w-6 h-6 flex items-center justify-center">
              <Package className="w-5 h-5 text-foreground" />
            </div>
            <span className="text-sm text-foreground">{t('trustReturn')}</span>
          </div>

          {/* Kostenloser Versand */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <div className="w-6 h-6 flex items-center justify-center">
              <Truck className="w-5 h-5 text-foreground" />
            </div>
            <span className="text-sm text-foreground">{t('trustShipping')}</span>
          </div>

          {/* PayPal */}
          <div className="flex items-center gap-1 whitespace-nowrap">
            <img src={paypalLogo} alt="PayPal" className="h-8" width={43} height={32} />
            <span className="text-sm text-foreground">{t('trustPayLater')}</span>
          </div>

          {/* Klarna */}
          <div className="flex items-center gap-1 whitespace-nowrap">
            <img src={klarnaLogo} alt="Klarna" className="h-8" width={55} height={32} />
            <span className="text-sm text-foreground">{t('trustPayLater')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
