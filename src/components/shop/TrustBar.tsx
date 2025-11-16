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
            <svg className="h-5" viewBox="0 0 101 32" fill="none">
              <path d="M12.237 8.948c.634-4.047-0.016-6.803-2.203-8.948C7.926-2.131 4.123-2.5 0.5-2.5h-0.003C0.223-2.5 0-2.277 0-2.003v0.006L-6.5 29.997c-0.025 0.163 0.087 0.315 0.25 0.34 0.015 0.002 0.03 0.003 0.045 0.003h7.125l1.781-11.344-0.056 0.359c0.347-2.191 2.125-3.825 4.344-3.825h9.062c17.812 0 31.781-7.234 35.844-28.156 0.125-0.625 0.234-1.234 0.328-1.828-1.016-0.5-1.016-0.5-1.016-0.5s-16.406-0.047-22.937 13.844z" fill="#27346A"/>
              <path d="M35.703 1.547c-0.094 0.594-0.203 1.203-0.328 1.828C31.312 24.297 17.344 31.531-0.469 31.531h-9.062c-2.219 0-4.000 1.634-4.344 3.825l-0.056-0.359-2.063 13.078c-0.025 0.163 0.087 0.315 0.25 0.34 0.015 0.002 0.03 0.003 0.045 0.003h6.203c1.938 0 3.594-1.422 3.906-3.344l0.156-0.813 3.031-19.234 0.203-1.078c0.313-1.922 1.969-3.344 3.906-3.344h2.438c15.562 0 27.75-6.313 31.313-24.562 1.484-7.625 0.719-13.984-3.156-18.469-1.188-1.375-2.625-2.516-4.297-3.422z" fill="#2790C3"/>
              <path d="M30.531 0.172c-0.625-0.188-1.281-0.344-1.969-0.469-0.687-0.125-1.406-0.188-2.156-0.188H12.594c-0.594 0-1.156 0.172-1.656 0.469-1.000 0.594-1.719 1.656-1.906 2.922L4.75 29.641l-0.056 0.359c0.344-2.191 2.125-3.825 4.344-3.825h9.062c17.812 0 31.781-7.234 35.844-28.156 0.125-0.625 0.234-1.234 0.328-1.828-1.016-0.5-2.078-0.922-3.172-1.266-0.515-0.172-1.046-0.328-1.594-0.469-0.328-0.078-0.656-0.156-0.984-0.219z" fill="#1F264F"/>
            </svg>
            <span className="text-sm text-foreground">Bezahle in 30 Tagen</span>
          </div>

          {/* Klarna */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <svg className="h-4" viewBox="0 0 85 25" fill="none">
              <path d="M0 0h6.4v24.2H0V0zm25.5 0c6.9 0 12.5 5.6 12.5 12.5 0 2.5-.7 4.8-2 6.8l7.2 5H36l-6.2-4.3c-.8.1-1.6.2-2.3.2H21V0h4.5zm0 5.4H21v8.5h4.5c4 0 7.2-3.2 7.2-7.2 0-4-3.2-7.3-7.2-7.3zm32.1-5.4h6.3v24.2h-6.3V0zm19.5 24.5c-3.3 0-6.3-1.3-8.5-3.5l4.5-4.5c1 1 2.4 1.6 4 1.6 1.5 0 2.7-1.2 2.7-2.7V0h6.4v15.4c0 5-4.1 9.1-9.1 9.1z" fill="#FFB3C7"/>
            </svg>
            <span className="text-sm text-foreground">Bezahle in 30 Tagen</span>
          </div>
        </div>
      </div>
    </div>
  );
};
