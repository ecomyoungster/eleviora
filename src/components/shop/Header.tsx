import { CartDrawer } from "./CartDrawer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Skeleton } from "@/components/ui/skeleton";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts(50);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const bestSellers = products.filter(p => 
    ['kollagen-hydrolysat-pulver', 'glucosamin-pulver', 'msm-pulver', 'omega-3-softgels']
      .includes(p.node.handle)
  );

  const bundles = products.filter(p => 
    p.node.title.toLowerCase().includes('bundle') || 
    p.node.title.toLowerCase().includes('paket') ||
    p.node.title.toLowerCase().includes('komplettsystem')
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle className="font-serif text-2xl">Katalog</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 text-foreground">Alle Produkte</h3>
                  {loading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-8 w-full" />
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {products.map(product => (
                        <Link
                          key={product.node.id}
                          to={`/product/${product.node.handle}`}
                          className="block py-2 px-3 text-sm hover:bg-muted rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {product.node.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-foreground">Best Sellers</h3>
                  {loading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-8 w-full" />
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {bestSellers.map(product => (
                        <Link
                          key={product.node.id}
                          to={`/product/${product.node.handle}`}
                          className="block py-2 px-3 text-sm hover:bg-muted rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {product.node.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-foreground">Bundles</h3>
                  {loading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-8 w-full" />
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {bundles.map(product => (
                        <Link
                          key={product.node.id}
                          to={`/product/${product.node.handle}`}
                          className="block py-2 px-3 text-sm hover:bg-muted rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {product.node.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => {
                const section = document.getElementById('bestsellers');
                section?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Best Sellers
            </button>
            <button 
              onClick={() => {
                const section = document.getElementById('bundles');
                section?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Bundles
            </button>
          </div>

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
