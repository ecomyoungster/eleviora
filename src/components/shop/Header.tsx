import { CartDrawer } from "./CartDrawer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, ChevronRight, Check, Search } from "lucide-react";
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
import { useLocaleStore, useTranslation, Locale } from "@/stores/localeStore";
import { FlagIcon } from "@/components/FlagIcon";
import { Logo } from "@/components/Logo";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getTranslatedProduct } from "@/lib/translations";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { locale, setLocale } = useLocaleStore();
  const t = useTranslation();
  
  const languages = [
    { code: 'de-DE' as Locale, country: 'DE' as const, name: t('germany'), currency: 'EUR €' },
    { code: 'de-AT' as Locale, country: 'AT' as const, name: t('austria'), currency: 'EUR €' },
    { code: 'en-US' as Locale, country: 'US' as const, name: t('unitedStates'), currency: 'EUR €' },
  ];
  
  const currentLanguage = languages.find(lang => lang.code === locale);

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

  const filteredProducts = products.filter(p => {
    const query = searchQuery.toLowerCase();
    return (
      p.node.title.toLowerCase().includes(query) ||
      p.node.description.toLowerCase().includes(query)
    );
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
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
                      {t('shop')}
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
                    {t('bestsellers')}
                  </button>

                  <button 
                    onClick={() => {
                      const section = document.getElementById('bundles');
                      section?.scrollIntoView({ behavior: 'smooth' });
                      setIsOpen(false);
                    }}
                    className="flex w-full items-center justify-between py-3 text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t('bundles')}
                  </button>

                  <Link
                    to="/about"
                    onClick={() => setIsOpen(false)}
                    className="flex w-full items-center justify-between py-3 text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Über uns
                  </Link>

                  <Collapsible open={languageOpen} onOpenChange={setLanguageOpen}>
                    <CollapsibleTrigger className="flex w-full items-center justify-between py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border-t mt-4 pt-4">
                      <div className="flex items-center gap-3">
                        {currentLanguage && (
                          <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center shadow-sm">
                            <FlagIcon country={currentLanguage.country} className="w-7 h-7" />
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <span className="uppercase tracking-wider text-sm font-medium">{currentLanguage?.name}</span>
                          <span className="text-xs text-muted-foreground">• {currentLanguage?.currency}</span>
                        </div>
                      </div>
                      <ChevronRight className={`h-4 w-4 transition-transform ${languageOpen ? 'rotate-90' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-1 pl-4 pt-2">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLocale(lang.code);
                              setIsOpen(false);
                            }}
                            className="flex w-full items-center justify-between py-3 text-sm hover:bg-muted/50 rounded-md px-3 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center shadow-sm flex-shrink-0">
                                <FlagIcon country={lang.country} className="w-7 h-7" />
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">{lang.name}</span>
                                <span className="text-xs text-muted-foreground">• {lang.currency}</span>
                              </div>
                            </div>
                            {locale === lang.code && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                          </button>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <button 
            onClick={() => {
              const section = document.getElementById('bestsellers');
              section?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-sm font-medium hover:text-primary transition-colors hidden md:block"
          >
            Bestsellers
          </button>

          <button 
            onClick={() => {
              const section = document.getElementById('bundles');
              section?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-sm font-medium hover:text-primary transition-colors hidden md:block"
          >
            Bundles
          </button>

          <Link
            to="/about"
            className="text-sm font-medium hover:text-primary transition-colors hidden md:block"
          >
            Über uns
          </Link>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <Logo size="md" />
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Produkte suchen</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    type="search"
                    placeholder="Produktname eingeben..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                  <div className="max-h-96 overflow-y-auto space-y-2">
                    {loading ? (
                      <div className="space-y-2">
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                      </div>
                    ) : filteredProducts.length > 0 ? (
                      filteredProducts.map(product => (
                        <Link
                          key={product.node.id}
                          to={`/product/${product.node.handle}`}
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex-1">
                            <h3 className="font-medium text-foreground">{product.node.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {product.node.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-primary">
                              €{product.node.priceRange.minVariantPrice.amount}
                            </p>
                          </div>
                        </Link>
                      ))
                    ) : searchQuery ? (
                      <p className="text-center text-muted-foreground py-8">
                        Keine Produkte gefunden
                      </p>
                    ) : (
                      <p className="text-center text-muted-foreground py-8">
                        Beginne mit der Eingabe, um Produkte zu suchen
                      </p>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <CartDrawer />
          </div>
        </div>
      </div>
    </header>
  );
};
