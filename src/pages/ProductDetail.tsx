import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const ProductDetail = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await fetchProducts();
        const found = products.find(p => p.node.handle === handle);
        setProduct(found || null);
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">Produkt nicht gefunden</h1>
          <Button onClick={() => window.location.href = '/'}>
            Zurück zur Startseite
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const { node } = product;
  const variant = node.variants.edges[0]?.node;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const imageUrl = node.images.edges[0]?.node.url;

  const handleAddToCart = () => {
    if (!variant) return;

    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Produkt zum Warenkorb hinzugefügt", {
      position: "top-center"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-secondary/20 rounded-xl overflow-hidden">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={node.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Kein Bild verfügbar
              </div>
            )}
          </div>
          <div className="space-y-6">
            <h1 className="font-serif text-4xl font-bold text-foreground">
              {node.title}
            </h1>
            <p className="text-3xl font-bold text-foreground">
              {price.toFixed(2)} {node.priceRange.minVariantPrice.currencyCode}
            </p>
            {node.description && (
              <div className="prose prose-lg text-muted-foreground">
                <p>{node.description}</p>
              </div>
            )}
            <Button 
              size="lg"
              className="w-full md:w-auto bg-primary hover:bg-primary/90 text-lg px-8"
              onClick={handleAddToCart}
            >
              In den Warenkorb
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
