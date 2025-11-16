import { useEffect, useState } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/stores/localeStore";

export const Bundles = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslation();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts(50);
        const bundles = fetchedProducts.filter(p => 
          p.node.title.toLowerCase().includes('bundle') || 
          p.node.title.toLowerCase().includes('paket') ||
          p.node.title.toLowerCase().includes('komplettsystem')
        );
        
        // Sort bundles: Schönheit von Innen first, then Gelenk & Beweglichkeit, then rest
        const sortedBundles = bundles.sort((a, b) => {
          const handleA = a.node.handle;
          const handleB = b.node.handle;
          
          if (handleA.includes('schonheit-von-innen')) return -1;
          if (handleB.includes('schonheit-von-innen')) return 1;
          if (handleA.includes('gelenk-beweglichkeit')) return -1;
          if (handleB.includes('gelenk-beweglichkeit')) return 1;
          return 0;
        });
        
        setProducts(sortedBundles);
      } catch (error) {
        console.error("Failed to fetch bundles:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) {
    return (
      <section id="bundles" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-4">
            {t('bundlesTitle')}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t('bundlesDesc')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section id="bundles" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-4">
          {t('bundlesTitle')}
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {t('bundlesDesc')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
