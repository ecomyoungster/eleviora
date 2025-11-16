import { useEffect, useState } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2 } from "lucide-react";
import { useTranslation } from "@/stores/localeStore";

export const Products = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslation();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        // Filter out bundles
        const filteredProducts = data.filter(p => 
          !p.node.title.toLowerCase().includes('bundle') && 
          !p.node.title.toLowerCase().includes('paket') &&
          !p.node.title.toLowerCase().includes('komplettsystem')
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <section id="products" className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section id="products" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <h2 className="font-serif text-4xl font-bold mb-4 text-foreground">
              {t('noProducts')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('noProductsDesc')}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold mb-4 text-foreground">
            {t('productsTitle')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('productsDesc')}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
