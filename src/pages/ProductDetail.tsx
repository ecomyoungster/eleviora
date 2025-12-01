import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useTranslation, useLocaleStore } from "@/stores/localeStore";
import { getTranslatedProduct } from "@/lib/translations";

const ProductDetail = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedQuantity, setSelectedQuantity] = useState<1 | 3 | 6>(1);
  const addItem = useCartStore(state => state.addItem);
  const t = useTranslation();
  const locale = useLocaleStore(state => state.locale);

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
          <h1 className="font-serif text-4xl font-bold mb-4">{t('productNotFound')}</h1>
          <Button onClick={() => window.location.href = '/'}>
            {t('backToHome')}
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const { node } = product;
  const translated = getTranslatedProduct(node.handle, locale, node.title, node.description);
  const variant = node.variants.edges[0]?.node;
  const basePrice = parseFloat(node.priceRange.minVariantPrice.amount);
  const imageUrl = node.images.edges[0]?.node.url;

  // Check if product is a bundle
  const isBundle = node.title.toLowerCase().includes('bundle') || 
                   node.handle.includes('bundle');

  // Calculate prices with discounts
  const getQuantityPrice = (qty: 1 | 3 | 6) => {
    const total = basePrice * qty;
    if (qty === 3) return { total, discounted: total * 0.9, discount: 10, savings: total * 0.1 };
    if (qty === 6) return { total, discounted: total * 0.85, discount: 15, savings: total * 0.15 };
    return { total, discounted: total, discount: 0, savings: 0 };
  };

  const selectedPrice = getQuantityPrice(selectedQuantity);

  const handleAddToCart = () => {
    if (!variant) return;

    // Calculate discounted price based on quantity
    const unitPrice = basePrice;
    let discountMultiplier = 1;
    
    if (selectedQuantity === 3) {
      discountMultiplier = 0.9; // 10% discount
    } else if (selectedQuantity === 6) {
      discountMultiplier = 0.85; // 15% discount
    }
    
    const discountedUnitPrice = unitPrice * discountMultiplier;

    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: {
        amount: discountedUnitPrice.toFixed(2),
        currencyCode: variant.price.currencyCode
      },
      quantity: selectedQuantity,
      selectedOptions: variant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success(t('addedToCart').replace('{quantity}', selectedQuantity.toString()), {
      position: "top-center"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="flex justify-center lg:justify-end">
            <div className="aspect-square bg-secondary/20 rounded-xl overflow-hidden max-w-md w-full">
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt={translated.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  {t('noImage')}
                </div>
              )}
            </div>
          </div>
          <div className="space-y-6">
            <h1 className="font-serif text-4xl font-bold text-foreground">
              {translated.title}
            </h1>
            
            {!isBundle ? (
              <>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">{t('selectQuantity')}</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {/* 1 Stück */}
                      <button
                        onClick={() => setSelectedQuantity(1)}
                        className={`relative border-2 rounded-2xl p-4 transition-all ${
                          selectedQuantity === 1
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {selectedQuantity === 1 && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                        <div className="text-center">
                          <div className="text-2xl font-bold mb-1">1 {t('pieces')}</div>
                          <div className="text-sm text-muted-foreground">€{basePrice.toFixed(2)}</div>
                        </div>
                      </button>

                      {/* 3 Stück */}
                      <button
                        onClick={() => setSelectedQuantity(3)}
                        className={`relative border-2 rounded-2xl p-4 transition-all ${
                          selectedQuantity === 3
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {selectedQuantity === 3 && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                        <div className="text-center">
                          <div className="text-2xl font-bold mb-1">3 {t('pieces')}</div>
                          <div className="text-primary font-semibold text-sm mb-1">{t('save').replace('{discount}', '10')}</div>
                          <div className="text-sm text-muted-foreground line-through">€{(basePrice * 3).toFixed(2)}</div>
                          <div className="text-sm font-semibold">€{(basePrice * 3 * 0.9).toFixed(2)}</div>
                        </div>
                      </button>

                      {/* 6 Stück */}
                      <button
                        onClick={() => setSelectedQuantity(6)}
                        className={`relative border-2 rounded-2xl p-4 transition-all ${
                          selectedQuantity === 6
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {selectedQuantity === 6 && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                         )}
                         <div className="text-center">
                           <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap">
                             {t('mostPopular')}
                           </div>
                           <div className="text-2xl font-bold mb-1">6 {t('pieces')}</div>
                           <div className="text-primary font-semibold text-sm mb-1">{t('save').replace('{discount}', '15')}</div>
                           <div className="text-sm text-muted-foreground line-through">€{(basePrice * 6).toFixed(2)}</div>
                           <div className="text-sm font-semibold">€{(basePrice * 6 * 0.85).toFixed(2)}</div>
                         </div>
                      </button>
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="bg-secondary/20 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">{t('total')}:</span>
                      <div className="text-right">
                        {selectedPrice.discount > 0 && (
                          <div className="text-sm text-muted-foreground line-through">
                            €{selectedPrice.total.toFixed(2)}
                          </div>
                        )}
                        <div className="text-3xl font-bold text-foreground">
                          €{selectedPrice.discounted.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    {selectedPrice.discount > 0 && (
                      <>
                        <div className="text-primary font-semibold">
                          {t('wasSaved')} €{selectedPrice.savings.toFixed(2)} ({selectedPrice.discount}%)
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Kostenloser Versand
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {translated.description && (
                  <div className="prose prose-lg text-muted-foreground">
                    <p>{translated.description}</p>
                  </div>
                )}
              </>
            ) : (
              <>
                <p className="text-3xl font-bold text-foreground">
                  €{basePrice.toFixed(2)}
                </p>
                {translated.description && (
                  <div className="prose prose-lg text-muted-foreground">
                    <p>{translated.description}</p>
                  </div>
                )}
              </>
            )}

            <Button 
              size="lg"
              className="w-full md:w-auto bg-primary hover:bg-primary/90 text-lg px-8"
              onClick={handleAddToCart}
            >
              {t('addToCart')}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
