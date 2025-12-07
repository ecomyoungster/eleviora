import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Loader2, Check, Truck, Shield, Leaf, Award, Heart, Sparkles } from "lucide-react";
import { useTranslation, useLocaleStore } from "@/stores/localeStore";
import { getTranslatedProduct } from "@/lib/translations";
import { NutritionTable } from "@/components/shop/NutritionTable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import bundleSchoenheit from "@/assets/bundle-schoenheit.jpg";
import bundleGelenk from "@/assets/bundle-gelenk.jpg";
import bundleGanzkoerper from "@/assets/bundle-ganzkoerper.jpg";

// Individual product pricing with subscription
const productPricing: Record<string, { regular: number; subscription: number }> = {
  'kollagen-hydrolysat-pulver': { regular: 37.99, subscription: 32.29 },
  'omega-3-softgels': { regular: 31.99, subscription: 27.19 },
  'msm-pulver': { regular: 28.99, subscription: 24.64 },
  'vitamin-c-gummies': { regular: 19.99, subscription: 16.99 },
  'glucosamin-pulver': { regular: 29.99, subscription: 25.49 },
  'chondroitin-pulver': { regular: 22.99, subscription: 19.54 },
};

// Product benefits data
const productBenefits: Record<string, string[]> = {
  'kollagen-hydrolysat-pulver': [
    'Verbesserte Haut, Haare & Nägel',
    'Unterstützung der Gelenke',
    'Premium Qualität aus Deutschland',
    'Keine Zusatzstoffe',
  ],
  'omega-3-softgels': [
    'Unterstützt Herz & Kreislauf',
    'Fördert die Gehirnfunktion',
    'Hochdosiert & rein',
    'Made in Germany',
  ],
  'msm-pulver': [
    'Natürlicher Schwefel',
    'Unterstützt Gelenke & Knorpel',
    'Hohe Bioverfügbarkeit',
    'Ohne Zusatzstoffe',
  ],
  'vitamin-c-gummies': [
    'Stärkt das Immunsystem',
    'Mit Zink & Holunder',
    'Köstlicher Geschmack',
    'Ohne künstliche Farbstoffe',
  ],
  'glucosamin-pulver': [
    'Unterstützung der Gelenke',
    'Fördert die Beweglichkeit',
    'Premium Qualität',
    'Hohe Bioverfügbarkeit',
  ],
  'chondroitin-pulver': [
    'Für gesunde Knorpel',
    'Unterstützt die Gelenkfunktion',
    'Made in Germany',
    'Laborgeprüft',
  ],
};

// Product FAQ data
const productFAQ = {
  de: [
    {
      q: 'Wie nehme ich das Produkt ein?',
      a: 'Nehmen Sie täglich die empfohlene Menge mit ausreichend Wasser ein. Bei Pulverprodukten: In Wasser oder Saft auflösen. Am besten morgens auf nüchternen Magen.',
    },
    {
      q: 'Wann sehe ich erste Ergebnisse?',
      a: 'Erste Verbesserungen bemerken viele Kunden nach 2-4 Wochen. Für optimale Ergebnisse empfehlen wir eine regelmäßige Einnahme über mindestens 8-12 Wochen.',
    },
    {
      q: 'Wie funktioniert das Abo?',
      a: 'Das Abo liefert automatisch in Ihrem gewählten Intervall (30, 90 oder 180 Tage). Sie sparen 15% und ab der zweiten Lieferung entfällt der Versand. Jederzeit kündbar, keine Mindestlaufzeit.',
    },
    {
      q: 'Kann ich jederzeit kündigen?',
      a: 'Ja, das Abo ist flexibel und jederzeit kündbar. Keine Vertragsbindung, keine versteckten Kosten. Einfach per E-Mail oder in Ihrem Kundenkonto.',
    },
    {
      q: 'Warum ist dieses Produkt hochwertiger als andere?',
      a: 'Unsere Produkte werden in Deutschland unter höchsten Qualitätsstandards hergestellt, sind laborgeprüft und enthalten keine unnötigen Zusatzstoffe. Wir setzen auf maximale Bioverfügbarkeit.',
    },
  ],
  en: [
    {
      q: 'How do I take this product?',
      a: 'Take the recommended daily amount with plenty of water. For powder products: dissolve in water or juice. Best taken in the morning on an empty stomach.',
    },
    {
      q: 'When will I see first results?',
      a: 'Many customers notice improvements after 2-4 weeks. For optimal results, we recommend regular intake for at least 8-12 weeks.',
    },
    {
      q: 'How does the subscription work?',
      a: 'The subscription automatically delivers at your chosen interval (30, 90, or 180 days). You save 15% and shipping is free from the second delivery. Cancel anytime, no minimum term.',
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Yes, the subscription is flexible and can be cancelled anytime. No contract, no hidden costs. Simply by email or in your customer account.',
    },
    {
      q: 'Why is this product better than others?',
      a: 'Our products are manufactured in Germany under the highest quality standards, lab-tested, and contain no unnecessary additives. We focus on maximum bioavailability.',
    },
  ],
};

const ProductDetail = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedQuantity, setSelectedQuantity] = useState<1 | 3 | 6>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [purchaseType, setPurchaseType] = useState<'onetime' | 'subscription'>('onetime');
  const [subscriptionInterval, setSubscriptionInterval] = useState<30 | 90 | 180>(30);
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
  
  // Get custom bundle image if applicable
  const getBundleImage = () => {
    if (node.handle.includes('schonheit-von-innen')) return bundleSchoenheit;
    if (node.handle.includes('gelenk-beweglichkeit')) return bundleGelenk;
    if (node.handle.includes('ganzkorper') || node.handle.includes('vital')) return bundleGanzkoerper;
    return null;
  };
  
  const bundleImage = getBundleImage();
  const images = node.images.edges.map(edge => edge.node);
  const currentImage = bundleImage || images[selectedImageIndex]?.url;

  // Check if product is a bundle
  const isBundle = node.title.toLowerCase().includes('bundle') || 
                   node.handle.includes('bundle') ||
                   node.handle.includes('komplettsystem') ||
                   node.handle.includes('paket');

  // Get product pricing for individual products
  const getProductPricing = () => {
    for (const key of Object.keys(productPricing)) {
      if (node.handle.includes(key)) {
        return productPricing[key];
      }
    }
    // Fallback: calculate 15% discount
    return { regular: basePrice, subscription: basePrice * 0.85 };
  };

  const currentProductPricing = getProductPricing();

  // Get benefits for product
  const getProductBenefits = () => {
    for (const key of Object.keys(productBenefits)) {
      if (node.handle.includes(key)) {
        return productBenefits[key];
      }
    }
    return [
      'Premium Qualität',
      'Made in Germany',
      'Laborgeprüft',
      'Ohne Zusatzstoffe',
    ];
  };

  const currentBenefits = getProductBenefits();

  // Bundle pricing data
  const bundlePricing: Record<string, { oneTime: number; uvp: number; monthly: { 1: number; 3: number; 6: number }; discounts: { 1: number; 3: number; 6: number } }> = {
    'schonheit-von-innen': {
      oneTime: 49.99,
      uvp: 59.98,
      monthly: { 1: 44.99, 3: 42.99, 6: 39.99 },
      discounts: { 1: 10, 3: 14, 6: 20 }
    },
    'gelenk-beweglichkeit': {
      oneTime: 89.99,
      uvp: 113.96,
      monthly: { 1: 79.99, 3: 74.99, 6: 69.99 },
      discounts: { 1: 11, 3: 17, 6: 22 }
    },
    'ganzkorper': {
      oneTime: 76.99,
      uvp: 80.97,
      monthly: { 1: 69.99, 3: 64.99, 6: 59.99 },
      discounts: { 1: 9, 3: 15, 6: 22 }
    }
  };

  // Get bundle pricing based on handle
  const getBundlePricing = () => {
    if (node.handle.includes('schonheit-von-innen')) return bundlePricing['schonheit-von-innen'];
    if (node.handle.includes('gelenk-beweglichkeit')) return bundlePricing['gelenk-beweglichkeit'];
    if (node.handle.includes('ganzkorper') || node.handle.includes('vital')) return bundlePricing['ganzkorper'];
    return null;
  };

  const currentBundlePricing = getBundlePricing();

  // Calculate prices with discounts for regular products
  const getQuantityPrice = (qty: 1 | 3 | 6) => {
    const price = currentProductPricing.regular;
    const total = price * qty;
    if (qty === 3) return { total, discounted: total * 0.9, discount: 10, savings: total * 0.1 };
    if (qty === 6) return { total, discounted: total * 0.85, discount: 15, savings: total * 0.15 };
    return { total, discounted: total, discount: 0, savings: 0 };
  };

  const selectedPrice = getQuantityPrice(selectedQuantity);

  // Bundle subscription price
  const getBundlePrice = (months: 1 | 3 | 6) => {
    if (!currentBundlePricing) return { monthly: basePrice, discount: 0 };
    return {
      monthly: currentBundlePricing.monthly[months],
      discount: currentBundlePricing.discounts[months]
    };
  };

  const selectedBundlePrice = getBundlePrice(selectedQuantity);

  // Get subscription interval text
  const getIntervalText = (interval: 30 | 90 | 180) => {
    if (locale.startsWith('de')) {
      if (interval === 30) return 'Alle 30 Tage';
      if (interval === 90) return 'Alle 90 Tage (3 Monate)';
      return 'Alle 180 Tage (6 Monate)';
    }
    if (interval === 30) return 'Every 30 days';
    if (interval === 90) return 'Every 90 days (3 months)';
    return 'Every 180 days (6 months)';
  };

  const handleAddToCart = () => {
    if (!variant) return;

    // For bundles: quantity is always 1, price is the subscription price
    if (isBundle && currentBundlePricing) {
      const subscriptionMonths = selectedQuantity;
      const monthlyPrice = currentBundlePricing.monthly[subscriptionMonths];
      
      const cartItem = {
        product,
        variantId: variant.id,
        variantTitle: `${variant.title} (${subscriptionMonths} ${subscriptionMonths === 1 ? (locale.startsWith('de') ? 'Monat' : 'Month') : (locale.startsWith('de') ? 'Monate' : 'Months')} Abo)`,
        price: {
          amount: monthlyPrice.toFixed(2),
          currencyCode: variant.price.currencyCode
        },
        quantity: 1,
        selectedOptions: [
          ...variant.selectedOptions || [],
          { name: 'Abo', value: `${subscriptionMonths} ${subscriptionMonths === 1 ? 'Monat' : 'Monate'}` }
        ]
      };
      
      addItem(cartItem);
      toast.success(locale.startsWith('de') 
        ? `${subscriptionMonths}-Monats-Abo hinzugefügt` 
        : `${subscriptionMonths}-month subscription added`, {
        position: "top-center"
      });
    } else if (purchaseType === 'subscription') {
      // Individual product with subscription
      const subscriptionPrice = currentProductPricing.subscription;
      const intervalMonths = subscriptionInterval === 30 ? 1 : subscriptionInterval === 90 ? 3 : 6;
      
      const cartItem = {
        product,
        variantId: variant.id,
        variantTitle: `${variant.title} (${locale.startsWith('de') ? 'Abo' : 'Subscription'} - ${getIntervalText(subscriptionInterval)})`,
        price: {
          amount: subscriptionPrice.toFixed(2),
          currencyCode: variant.price.currencyCode
        },
        quantity: 1,
        selectedOptions: [
          ...variant.selectedOptions || [],
          { name: 'Abo', value: getIntervalText(subscriptionInterval) }
        ]
      };
      
      addItem(cartItem);
      toast.success(locale.startsWith('de') 
        ? 'Abo zum Warenkorb hinzugefügt' 
        : 'Subscription added to cart', {
        position: "top-center"
      });
    } else {
      // Regular one-time product logic
      const unitPrice = currentProductPricing.regular;
      let discountMultiplier = 1;
      
      if (selectedQuantity === 3) {
        discountMultiplier = 0.9;
      } else if (selectedQuantity === 6) {
        discountMultiplier = 0.85;
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
    }
  };

  const faqData = locale.startsWith('de') ? productFAQ.de : productFAQ.en;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="flex justify-center lg:justify-end">
            <div className="max-w-md w-full space-y-4">
              {/* Main Image */}
              <div className="aspect-[3/4] bg-secondary/20 rounded-xl overflow-hidden">
                {currentImage ? (
                  <img 
                    src={currentImage} 
                    alt={translated.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    {t('noImage')}
                  </div>
                )}
              </div>
              
              {/* Image Thumbnails - hide for bundles with custom images */}
              {!bundleImage && images.length > 1 && (
                <div className="grid grid-cols-3 gap-3">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? 'border-primary ring-2 ring-primary/20'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`${translated.title} - Bild ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
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
                {/* Purchase Type Selection */}
                <div className="space-y-4">
                  <div className="space-y-3">
                    {/* One-time Purchase Option */}
                    <button
                      onClick={() => setPurchaseType('onetime')}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                        purchaseType === 'onetime'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        purchaseType === 'onetime' ? 'border-primary' : 'border-muted-foreground'
                      }`}>
                        {purchaseType === 'onetime' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold">
                          {locale.startsWith('de') ? 'Einmal kaufen' : 'One-time purchase'}
                        </div>
                        <div className="text-lg font-bold">€{currentProductPricing.regular.toFixed(2)}</div>
                      </div>
                    </button>

                    {/* Subscription Option */}
                    <button
                      onClick={() => setPurchaseType('subscription')}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                        purchaseType === 'subscription'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        purchaseType === 'subscription' ? 'border-primary' : 'border-muted-foreground'
                      }`}>
                        {purchaseType === 'subscription' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            {locale.startsWith('de') ? 'Abonniere & spare' : 'Subscribe & save'}
                          </span>
                          <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            -15%
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">€{currentProductPricing.subscription.toFixed(2)}</span>
                          <span className="text-sm text-muted-foreground line-through">€{currentProductPricing.regular.toFixed(2)}</span>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Subscription Interval Selection */}
                  {purchaseType === 'subscription' && (
                    <div className="pl-9 space-y-3">
                      <p className="text-sm font-medium text-muted-foreground">
                        {locale.startsWith('de') ? 'Lieferintervall wählen:' : 'Choose delivery interval:'}
                      </p>
                      <div className="space-y-2">
                        {([30, 90, 180] as const).map((interval) => (
                          <button
                            key={interval}
                            onClick={() => setSubscriptionInterval(interval)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                              subscriptionInterval === interval
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              subscriptionInterval === interval ? 'border-primary' : 'border-muted-foreground'
                            }`}>
                              {subscriptionInterval === interval && (
                                <div className="w-2 h-2 rounded-full bg-primary" />
                              )}
                            </div>
                            <span className="text-sm font-medium">{getIntervalText(interval)}</span>
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground italic">
                        {locale.startsWith('de') 
                          ? 'Flexibles Abo – jederzeit kündbar. Keine Mindestlaufzeit.'
                          : 'Flexible subscription – cancel anytime. No minimum term.'}
                      </p>
                    </div>
                  )}

                  {/* Quantity Selection for One-Time Purchase */}
                  {purchaseType === 'onetime' && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">{t('selectQuantity')}</h3>
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
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                          <div className="text-center">
                            <div className="text-2xl font-bold mb-1">1 {t('pieces')}</div>
                            <div className="text-sm text-muted-foreground">€{currentProductPricing.regular.toFixed(2)}</div>
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
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                          <div className="text-center">
                            <div className="text-2xl font-bold mb-1">3 {t('pieces')}</div>
                            <div className="text-primary font-semibold text-sm mb-1">{t('save').replace('{discount}', '10')}</div>
                            <div className="text-sm text-muted-foreground line-through">€{(currentProductPricing.regular * 3).toFixed(2)}</div>
                            <div className="text-sm font-semibold">€{(currentProductPricing.regular * 3 * 0.9).toFixed(2)}</div>
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
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                          <div className="text-center">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap">
                              {t('mostPopular')}
                            </div>
                            <div className="text-2xl font-bold mb-1">6 {t('pieces')}</div>
                            <div className="text-primary font-semibold text-sm mb-1">{t('save').replace('{discount}', '15')}</div>
                            <div className="text-sm text-muted-foreground line-through">€{(currentProductPricing.regular * 6).toFixed(2)}</div>
                            <div className="text-sm font-semibold">€{(currentProductPricing.regular * 6 * 0.85).toFixed(2)}</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Price Summary */}
                  <div className="bg-secondary/20 rounded-xl p-4 space-y-2">
                    {purchaseType === 'subscription' ? (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold">{locale.startsWith('de') ? 'Preis' : 'Price'}:</span>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground line-through">
                              €{currentProductPricing.regular.toFixed(2)}
                            </div>
                            <div className="text-3xl font-bold text-foreground">
                              €{currentProductPricing.subscription.toFixed(2)}
                            </div>
                          </div>
                        </div>
                        <div className="text-primary font-semibold">
                          {t('wasSaved')} €{(currentProductPricing.regular - currentProductPricing.subscription).toFixed(2)} (15%)
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Truck className="w-4 h-4" />
                          {locale.startsWith('de') 
                            ? 'Kostenloser Versand ab der 2. Lieferung'
                            : 'Free shipping from 2nd delivery'}
                        </div>
                      </>
                    ) : (
                      <>
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
                              <Truck className="w-4 h-4" />
                              {locale.startsWith('de') ? 'Kostenloser Versand' : 'Free shipping'}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>

                  {/* Trust Info */}
                  <div className="text-sm text-muted-foreground text-center">
                    {locale.startsWith('de') 
                      ? 'Kostenloser Versand ab 49€ • Abo jederzeit kündbar'
                      : 'Free shipping over €49 • Cancel subscription anytime'}
                  </div>
                </div>
              </>
            ) : currentBundlePricing ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">{t('selectQuantity').replace('Menge', 'Abo').replace('Quantity', 'Subscription')}</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {/* 1 Monat */}
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
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div className="text-center">
                        <div className="text-2xl font-bold mb-1">1 {locale.startsWith('de') ? 'Monat' : 'Month'}</div>
                        <div className="text-primary font-semibold text-sm mb-1">{t('save').replace('{discount}', currentBundlePricing.discounts[1].toString())}</div>
                        <div className="text-sm text-muted-foreground line-through">€{currentBundlePricing.oneTime.toFixed(2)}</div>
                        <div className="text-sm font-semibold">€{currentBundlePricing.monthly[1].toFixed(2)}</div>
                      </div>
                    </button>

                    {/* 3 Monate */}
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
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div className="text-center">
                        <div className="text-2xl font-bold mb-1">3 {locale.startsWith('de') ? 'Monate' : 'Months'}</div>
                        <div className="text-primary font-semibold text-sm mb-1">{t('save').replace('{discount}', currentBundlePricing.discounts[3].toString())}</div>
                        <div className="text-sm text-muted-foreground line-through">€{currentBundlePricing.oneTime.toFixed(2)}</div>
                        <div className="text-sm font-semibold">€{currentBundlePricing.monthly[3].toFixed(2)}</div>
                      </div>
                    </button>

                    {/* 6 Monate */}
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
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div className="text-center">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap">
                          {t('mostPopular')}
                        </div>
                        <div className="text-2xl font-bold mb-1">6 {locale.startsWith('de') ? 'Monate' : 'Months'}</div>
                        <div className="text-primary font-semibold text-sm mb-1">{t('save').replace('{discount}', currentBundlePricing.discounts[6].toString())}</div>
                        <div className="text-sm text-muted-foreground line-through">€{currentBundlePricing.oneTime.toFixed(2)}</div>
                        <div className="text-sm font-semibold">€{currentBundlePricing.monthly[6].toFixed(2)}</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Bundle Price Summary */}
                <div className="bg-secondary/20 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">{locale.startsWith('de') ? 'Monatlich' : 'Monthly'}:</span>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground line-through">
                        €{currentBundlePricing.oneTime.toFixed(2)}
                      </div>
                      <div className="text-3xl font-bold text-foreground">
                        €{selectedBundlePrice.monthly.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="text-primary font-semibold">
                    {t('wasSaved')} €{(currentBundlePricing.oneTime - selectedBundlePrice.monthly).toFixed(2)} ({selectedBundlePrice.discount}%)
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    {locale.startsWith('de') ? 'Jederzeit kündbar' : 'Cancel anytime'}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    {locale.startsWith('de') ? 'Kostenloser Versand' : 'Free shipping'}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-3xl font-bold text-foreground">
                €{basePrice.toFixed(2)}
              </p>
            )}

            <Button
              size="lg"
              className="w-full md:w-auto bg-primary hover:bg-primary/90 text-lg px-8"
              onClick={handleAddToCart}
            >
              {t('addToCart')}
            </Button>

            {/* Benefits Section - Only for individual products */}
            {!isBundle && (
              <div className="pt-6 border-t border-border">
                <h3 className="font-semibold text-lg mb-4">
                  {locale.startsWith('de') ? 'Vorteile' : 'Benefits'}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {currentBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                {/* Trust badges */}
                <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>{locale.startsWith('de') ? 'Laborgeprüft' : 'Lab tested'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Leaf className="w-4 h-4" />
                    <span>{locale.startsWith('de') ? 'Natürlich' : 'Natural'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Award className="w-4 h-4" />
                    <span>Made in Germany</span>
                  </div>
                </div>
              </div>
            )}

            {/* Product Information Section */}
            <div className="pt-8">
              <h2 className="text-2xl font-bold mb-6">
                {locale.startsWith('de') ? 'PRODUKTINFORMATION' : 'PRODUCT INFORMATION'}
              </h2>
              <Accordion type="single" collapsible className="w-full space-y-2">
                <AccordionItem value="description" className="border rounded-lg px-6 bg-secondary/5">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    {locale.startsWith('de') ? 'Beschreibung' : 'Description'}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2 pb-4 whitespace-pre-line">
                    {translated.description}
                  </AccordionContent>
                </AccordionItem>
                
                {!isBundle && (
                  <>
                    <AccordionItem value="usage" className="border rounded-lg px-6 bg-secondary/5">
                      <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                        {locale.startsWith('de') ? 'Anwendung' : 'Usage'}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pt-2 pb-4">
                        <p>{locale.startsWith('de') 
                          ? 'Nehmen Sie täglich die empfohlene Dosis mit ausreichend Wasser ein. Für beste Ergebnisse sollte das Produkt regelmäßig über einen längeren Zeitraum eingenommen werden.'
                          : 'Take the recommended daily dose with plenty of water. For best results, the product should be taken regularly over a longer period.'}</p>
                        <p className="mt-2 font-semibold">{locale.startsWith('de') ? 'Hinweis:' : 'Note:'}</p>
                        <p>{locale.startsWith('de')
                          ? 'Die angegebene empfohlene tägliche Verzehrmenge darf nicht überschritten werden. Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung sowie eine gesunde Lebensweise.'
                          : 'Do not exceed the recommended daily intake. Dietary supplements are not a substitute for a balanced and varied diet and a healthy lifestyle.'}</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="ingredients" className="border rounded-lg px-6 bg-secondary/5">
                      <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                        {locale.startsWith('de') ? 'Zutaten' : 'Ingredients'}
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-4">
                        <NutritionTable handle={node.handle} />
                      </AccordionContent>
                    </AccordionItem>
                  </>
                )}
              </Accordion>
            </div>

            {/* FAQ Section - Only for individual products */}
            {!isBundle && (
              <div className="pt-8">
                <h2 className="text-2xl font-bold mb-6">
                  {locale.startsWith('de') ? 'HÄUFIGE FRAGEN' : 'FREQUENTLY ASKED QUESTIONS'}
                </h2>
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {faqData.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className="border rounded-lg px-6 bg-secondary/5">
                      <AccordionTrigger className="text-base font-medium hover:no-underline text-left">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pt-2 pb-4">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
