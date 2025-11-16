import { CartDrawer } from "./CartDrawer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, ChevronRight } from "lucide-react";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
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
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <div className="p-6">
                <div className="space-y-1">
                  <Collapsible open={shopOpen} onOpenChange={setShopOpen}>
                    <CollapsibleTrigger className="flex w-full items-center justify-between py-3 text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">
                      SHOP
                      <ChevronRight className={`h-4 w-4 transition-transform ${shopOpen ? 'rotate-90' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {loading ? (
                        <div className="space-y-2 pl-4 pt-2">
                          <Skeleton className="h-6 w-full" />
                          <Skeleton className="h-6 w-full" />
                        </div>
                      ) : (
                        <div className="space-y-1 pl-4 pt-2">
                          {products.map(product => (
                            <Link
                              key={product.node.id}
                              to={`/product/${product.node.handle}`}
                              className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              {product.node.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>

                  <button 
                    onClick={() => {
                      const section = document.getElementById('bestsellers');
                      section?.scrollIntoView({ behavior: 'smooth' });
                      setIsOpen(false);
                    }}
                    className="flex w-full items-center justify-between py-3 text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                  >
                    BESTSELLERS
                  </button>

                  <button 
                    onClick={() => {
                      const section = document.getElementById('bundles');
                      section?.scrollIntoView({ behavior: 'smooth' });
                      setIsOpen(false);
                    }}
                    className="flex w-full items-center justify-between py-3 text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                  >
                    BUNDLES
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

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
