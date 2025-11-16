import { CartDrawer } from "./CartDrawer";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl font-bold text-foreground">
              VitalAge
            </h1>
          </div>
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
          <CartDrawer />
        </div>
      </div>
    </header>
  );
};
