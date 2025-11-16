import { Package, Truck } from "lucide-react";

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
          <div className="flex items-center gap-2 whitespace-nowrap">
            <div className="w-6 h-6 flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 00-.794.679l-.04.22-.63 3.993-.03.17a.804.804 0 01-.794.679H7.72a.483.483 0 01-.477-.558L9.29 7.48a.805.805 0 01.794-.679h4.778c.099 0 .195.005.29.014.38.036.737.118 1.065.241.988.37 1.726 1.192 1.85 2.422z" fill="#139AD6"/>
                <path d="M10.084 7.494a.805.805 0 01.794-.679h4.778c.622 0 1.2.096 1.723.285.98.355 1.698 1.144 1.84 2.349.5.88.563 2.014.307 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 00-.794.679l-.04.22-.63 3.993-.03.17a.804.804 0 01-.794.679H7.72a.483.483 0 01-.477-.558l2.047-12.627.794-.958z" fill="#263B80"/>
              </svg>
            </div>
            <span className="text-sm text-foreground">Bezahle in 30 Tagen</span>
          </div>

          {/* Klarna */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <div className="w-6 h-6 flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="4" fill="#FFB3C7"/>
                <path d="M8 6h2v12H8V6zm5.5 0c2.5 0 4.5 2 4.5 4.5 0 1.5-.7 2.8-1.8 3.7l2.3 3.8h-2.3l-2-3.3c-.2 0-.4.1-.7.1H13V6h.5z" fill="#0A0B09"/>
              </svg>
            </div>
            <span className="text-sm text-foreground">Bezahle in 30 Tagen</span>
          </div>
        </div>
      </div>
    </div>
  );
};
