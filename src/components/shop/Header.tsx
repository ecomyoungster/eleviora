import { CartDrawer } from "./CartDrawer";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <nav className="hidden md:flex items-center gap-6">
            <a href="#products" className="text-sm font-medium hover:text-primary transition-colors">
              Produkte
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Über uns
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Kontakt
            </a>
          </nav>
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link to="/">
              <h1 className="font-serif text-2xl font-bold text-foreground hover:text-primary transition-colors cursor-pointer">
                VitalAge
              </h1>
            </Link>
          </div>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
};
