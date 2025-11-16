import { useEffect, useState } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2 } from "lucide-react";

export const Products = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

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
              Noch keine Produkte verfügbar
            </h2>
            <p className="text-muted-foreground text-lg">
              Bitte erstellen Sie Produkte, indem Sie im Chat beschreiben, was Sie anbieten möchten.
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
            Unsere Premium-Produkte
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hochwertige Nahrungsergänzung für mehr Wohlbefinden
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
