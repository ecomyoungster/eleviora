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
import kollagenProductImage from "@/assets/kollagen-product-updated.png";

// Individual product pricing with subscription tiers
const productPricing: Record<string, { regular: number; subscription: { 2: number; 3: number; 6: number } }> = {
  'kollagen-hydrolysat-pulver': { 
    regular: 37.90, 
    subscription: { 2: 34.10, 3: 33.35, 6: 32.20 } 
  },
  'omega-3-softgels': { 
    regular: 31.99, 
    subscription: { 2: 31.99 * 0.90, 3: 31.99 * 0.85, 6: 31.99 * 0.80 } 
  },
  'msm-pulver': { 
    regular: 28.99, 
    subscription: { 2: 28.99 * 0.90, 3: 28.99 * 0.85, 6: 28.99 * 0.80 } 
  },
  'vitamin-c-gummies': { 
    regular: 19.99, 
    subscription: { 2: 19.99 * 0.90, 3: 19.99 * 0.85, 6: 19.99 * 0.80 } 
  },
  'glucosamin-pulver': { 
    regular: 29.99, 
    subscription: { 2: 29.99 * 0.90, 3: 29.99 * 0.85, 6: 29.99 * 0.80 } 
  },
  'chondroitin-pulver': { 
    regular: 22.99, 
    subscription: { 2: 22.99 * 0.90, 3: 22.99 * 0.85, 6: 22.99 * 0.80 } 
  },
};

// Product benefits data
const productBenefits: Record<string, string[]> = {
  'kollagen-hydrolysat-pulver': [
    'Reines Kollagenpulver',
    'Laborgeprüft',
    'Neutraler Geschmack',
    'Keine Zusatzstoffe',
  ],
  'omega-3-softgels': [
    'Ideal für Menschen, die Wert auf Ernährung und Wohlbefinden legen',
    'EPA und DHA tragen zur Erhaltung normaler Sehkraft bei',
    'Hochdosiert & rein',
    'Keine Zusatzstoffe',
  ],
  'msm-pulver': [
    'Hochwertiger Schwefel',
    'Geruchlos',
    'Alltagsgerecht',
    'Ohne Zusatzstoffe',
  ],
  'vitamin-c-gummies': [
    'Stärkt das Immunsystem',
    'Mit Zink & Holunder',
    'Köstlicher Geschmack',
    'Nährstoffreich',
  ],
  'glucosamin-pulver': [
    'Laborgeprüft',
    'Gut mischbar',
    'Neutraler Geschmack',
    'Ohne Zusatzstoffe',
  ],
  'chondroitin-pulver': [
    'Rein & gut löslich',
    'Für Vitalität im Alltag',
    'Unterstützt bewusste Ernährung',
    'Ohne Zusatzstoffe',
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
      a: 'Viele Nutzer berichten, dass sie sich nach einigen Wochen regelmäßiger Anwendung wohler fühlen. Die Erfahrungen sind individuell und können variieren. Für eine nachhaltige Routine empfehlen wir eine Anwendung über mehrere Wochen.',
    },
    {
      q: 'Wie funktioniert das Abo?',
      a: 'Wählen Sie Ihre gewünschte Kur-Dauer: 2 Monate (2 Lieferungen), 3 Monate (3 Lieferungen) oder 6 Monate (6 Lieferungen). Das Abo endet automatisch nach Ablauf. Ab der zweiten Lieferung entfällt der Versand.',
    },
    {
      q: 'Kann ich jederzeit kündigen?',
      a: 'Ja, das Abo ist flexibel und jederzeit kündbar. Keine Vertragsbindung, keine versteckten Kosten. Einfach per E-Mail.',
    },
    {
      q: 'Warum ist dieses Produkt hochwertiger als andere?',
      a: 'Unsere Produkte werden nach hohen Qualitätsstandards hergestellt und enthalten keine unnötigen Zusatzstoffe.',
    },
  ],
  en: [
    {
      q: 'How do I take this product?',
      a: 'Take the recommended daily amount with plenty of water. For powder products: dissolve in water or juice. Best taken in the morning on an empty stomach.',
    },
    {
      q: 'When will I see first results?',
      a: 'Many users report feeling better after a few weeks of regular use. Experiences are individual and may vary. For a sustainable routine, we recommend using the product for several weeks.',
    },
    {
      q: 'How does the subscription work?',
      a: 'Choose your desired treatment duration: 2 months (2 deliveries), 3 months (3 deliveries), or 6 months (6 deliveries). The subscription ends automatically after completion. Free shipping from the second delivery.',
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Yes, the subscription is flexible and can be cancelled anytime. No contract, no hidden costs. Simply by email.',
    },
    {
      q: 'Why is this product better than others?',
      a: 'Our products are manufactured to high quality standards and contain no unnecessary additives.',
    },
  ],
};

const ProductDetail = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedQuantity, setSelectedQuantity] = useState<1 | 2 | 3 | 6>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [purchaseType, setPurchaseType] = useState<'onetime' | 'subscription'>('onetime');
  const [subscriptionInterval, setSubscriptionInterval] = useState<60 | 90 | 180>(60);
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
          <h1 className="font-brand text-4xl font-semibold mb-4">{t('productNotFound')}</h1>
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
  
  // Get custom product image for kollagen
  const getProductImage = () => {
    if (node.handle.includes('kollagen-hydrolysat-pulver')) return kollagenProductImage;
    return null;
  };
  
  const bundleImage = getBundleImage();
  const productImage = getProductImage();
  const images = node.images.edges.map(edge => edge.node);
  const currentImage = bundleImage || productImage || images[selectedImageIndex]?.url;

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
    // Fallback: calculate tiered discounts
    return { 
      regular: basePrice, 
      subscription: { 2: basePrice * 0.90, 3: basePrice * 0.85, 6: basePrice * 0.80 } 
    };
  };

  const currentProductPricing = getProductPricing();

  // Get subscription price based on selected interval
  const getSubscriptionPrice = (months: 2 | 3 | 6) => {
    return currentProductPricing.subscription[months];
  };

  const getSubscriptionDiscount = (months: 2 | 3 | 6) => {
    // For kollagen product, use exact discount percentages
    if (node.handle.includes('kollagen-hydrolysat-pulver')) {
      return months === 2 ? 10 : months === 3 ? 12 : 15;
    }
    return months === 2 ? 10 : months === 3 ? 15 : 20;
  };

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
  const bundlePricing: Record<string, { oneTime: number; uvp: number; monthly: { 2: number; 3: number; 6: number }; discounts: { 2: number; 3: number; 6: number } }> = {
    'schonheit-von-innen': {
      oneTime: 49.99,
      uvp: 59.98,
      monthly: { 2: 44.99, 3: 42.99, 6: 39.99 },
      discounts: { 2: 10, 3: 14, 6: 20 }
    },
    'gelenk-beweglichkeit': {
      oneTime: 89.99,
      uvp: 113.96,
      monthly: { 2: 79.99, 3: 74.99, 6: 69.99 },
      discounts: { 2: 11, 3: 17, 6: 22 }
    },
    'ganzkorper': {
      oneTime: 76.99,
      uvp: 80.97,
      monthly: { 2: 69.99, 3: 64.99, 6: 59.99 },
      discounts: { 2: 9, 3: 15, 6: 22 }
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
  const getQuantityPrice = (qty: 1 | 2 | 3 | 6) => {
    const price = currentProductPricing.regular;
    const total = price * qty;
    
    // Use exact prices for kollagen product
    if (node.handle.includes('kollagen-hydrolysat-pulver')) {
      if (qty === 3) return { total: 113.70, discounted: 102.30, discount: 10, savings: 11.40 };
      if (qty === 6) return { total: 227.40, discounted: 193.30, discount: 15, savings: 34.10 };
      return { total: price, discounted: price, discount: 0, savings: 0 };
    }
    
    if (qty === 3) return { total, discounted: total * 0.9, discount: 10, savings: total * 0.1 };
    if (qty === 6) return { total, discounted: total * 0.85, discount: 15, savings: total * 0.15 };
    return { total, discounted: total, discount: 0, savings: 0 };
  };

  const selectedPrice = getQuantityPrice(selectedQuantity as 1 | 2 | 3 | 6);

  // Bundle subscription price
  const getBundlePrice = (months: 2 | 3 | 6) => {
    if (!currentBundlePricing) return { monthly: basePrice, discount: 0 };
    return {
      monthly: currentBundlePricing.monthly[months],
      discount: currentBundlePricing.discounts[months]
    };
  };

  const selectedBundlePrice = getBundlePrice((selectedQuantity === 1 ? 2 : selectedQuantity) as 2 | 3 | 6);

  // Get subscription duration text
  const getSubscriptionDurationText = (months: 2 | 3 | 6) => {
    if (locale.startsWith('de')) {
      if (months === 2) return '2-Monate Vorrat';
      if (months === 3) return '3-Monate Vorrat';
      return '6-Monate Vorrat';
    }
    if (months === 2) return '2 months supply';
    if (months === 3) return '3 months supply';
    return '6 months supply';
  };

  // Get subscription description text
  const getSubscriptionDescription = (months: 2 | 3 | 6) => {
    if (locale.startsWith('de')) {
      if (months === 2) return 'Zum Ausprobieren und Herantasten an eine neue Routine.';
      if (months === 3) return 'Für eine regelmäßige, kontinuierliche Nutzung.';
      return 'Für alle, die ihre tägliche Ergänzung langfristig planen möchten.';
    }
    if (months === 2) return 'To try out and ease into a new routine.';
    if (months === 3) return 'For regular, continuous use.';
    return 'For those who want to plan their daily supplement long-term.';
  };

  // Get delivery info text
  const getDeliveryInfoText = (months: 2 | 3 | 6) => {
    if (locale.startsWith('de')) {
      if (months === 2) return '2 Lieferungen • endet automatisch';
      if (months === 3) return '3 Lieferungen • endet automatisch';
      return '6 Lieferungen • endet automatisch';
    }
    if (months === 2) return '2 deliveries • ends automatically';
    if (months === 3) return '3 deliveries • ends automatically';
    return '6 deliveries • ends automatically';
  };

  const handleAddToCart = () => {
    if (!variant) return;

    // For bundles
    if (isBundle && currentBundlePricing) {
      if (purchaseType === 'subscription') {
        const subscriptionMonths = selectedQuantity as 2 | 3 | 6;
        const monthlyPrice = currentBundlePricing.monthly[subscriptionMonths];
        
        const cartItem = {
          product,
          variantId: variant.id,
          variantTitle: `${variant.title} (${subscriptionMonths} ${locale.startsWith('de') ? 'Monate' : 'Months'} Abo)`,
          price: {
            amount: monthlyPrice.toFixed(2),
            currencyCode: variant.price.currencyCode
          },
          quantity: 1,
          selectedOptions: [
            ...variant.selectedOptions || [],
            { name: 'Abo', value: `${subscriptionMonths} Monate` }
          ]
        };
        
        addItem(cartItem);
        toast.success(locale.startsWith('de') 
          ? `${subscriptionMonths}-Monats-Abo hinzugefügt` 
          : `${subscriptionMonths}-month subscription added`, {
          position: "top-center"
        });
      } else {
        // Bundle one-time purchase
        let discountMultiplier = 1;
        if (selectedQuantity === 3) {
          discountMultiplier = 0.9;
        } else if (selectedQuantity === 6) {
          discountMultiplier = 0.85;
        }
        
        const discountedUnitPrice = currentBundlePricing.oneTime * discountMultiplier;

        const cartItem = {
          product,
          variantId: variant.id,
          variantTitle: variant.title,
          price: {
            amount: discountedUnitPrice.toFixed(2),
            currencyCode: variant.price.currencyCode
          },
          quantity: selectedQuantity as number,
          selectedOptions: variant.selectedOptions || []
        };
        
        addItem(cartItem);
        toast.success(t('addedToCart').replace('{quantity}', selectedQuantity.toString()), {
          position: "top-center"
        });
      }
      return;
    } 
    
    if (purchaseType === 'subscription') {
      // Individual product with subscription
      const intervalMonths = subscriptionInterval === 60 ? 2 : subscriptionInterval === 90 ? 3 : 6;
      const subscriptionPrice = getSubscriptionPrice(intervalMonths as 2 | 3 | 6);
      
      const cartItem = {
        product,
        variantId: variant.id,
        variantTitle: `${variant.title} (${getSubscriptionDurationText(intervalMonths as 2 | 3 | 6)})`,
        price: {
          amount: subscriptionPrice.toFixed(2),
          currencyCode: variant.price.currencyCode
        },
        quantity: 1,
        selectedOptions: [
          ...variant.selectedOptions || [],
          { name: 'Abo', value: getSubscriptionDurationText(intervalMonths as 2 | 3 | 6) }
        ]
      };
      
      addItem(cartItem);
      toast.success(locale.startsWith('de') 
        ? `${intervalMonths}-Monats-Kur zum Warenkorb hinzugefügt` 
        : `${intervalMonths}-month treatment added to cart`, {
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
        quantity: selectedQuantity as number,
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
            <h1 className="font-brand text-4xl font-semibold text-foreground">
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
                          {locale.startsWith('de') ? 'Einmalig kaufen' : 'One-time purchase'}
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
                            {locale.startsWith('de') ? 'bis zu 15% Rabatt' : 'up to 15% off'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">€{getSubscriptionPrice(subscriptionInterval === 60 ? 2 : subscriptionInterval === 90 ? 3 : 6).toFixed(2)}</span>
                          <span className="text-sm text-muted-foreground line-through">€{currentProductPricing.regular.toFixed(2)}</span>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Subscription Duration Selection */}
                  {purchaseType === 'subscription' && (
                    <div className="pl-9 space-y-3">
                      <p className="text-sm font-medium text-muted-foreground">
                        {locale.startsWith('de') ? 'Kur-Dauer wählen:' : 'Choose treatment duration:'}
                      </p>
                      <div className="space-y-2">
                        {([2, 3, 6] as const).map((months) => {
                          const discountPercent = months === 2 ? 10 : months === 3 ? 12 : 15;
                          const isSelected = (months === 2 && subscriptionInterval === 60) ||
                                            (months === 3 && subscriptionInterval === 90) ||
                                            (months === 6 && subscriptionInterval === 180);
                          return (
                            <button
                              key={months}
                              onClick={() => setSubscriptionInterval(months === 2 ? 60 : months === 3 ? 90 : 180)}
                              className={`relative w-full flex items-start gap-3 p-3 rounded-lg border transition-all ${
                                isSelected
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border hover:border-primary/50'
                              }`}
                            >
                              {months === 3 && (
                                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                                  {locale.startsWith('de') ? 'Empfohlen' : 'Recommended'}
                                </div>
                              )}
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                isSelected ? 'border-primary' : 'border-muted-foreground'
                              }`}>
                                {isSelected && (
                                  <div className="w-2 h-2 rounded-full bg-primary" />
                                )}
                              </div>
                              <div className="flex-1 text-left">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{getSubscriptionDurationText(months)}</span>
                                  <span className="text-xs text-primary font-semibold">-{discountPercent}%</span>
                                </div>
                                <div className="text-xs text-muted-foreground">{getSubscriptionDescription(months)}</div>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-sm font-semibold">€{getSubscriptionPrice(months).toFixed(2)}</span>
                                  <span className="text-xs text-muted-foreground line-through">€{currentProductPricing.regular.toFixed(2)}</span>
                                </div>
                                <div className="text-xs text-primary mt-0.5">{getDeliveryInfoText(months)}</div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-xs text-muted-foreground italic">
                        {locale.startsWith('de') 
                          ? 'Kostenloser Versand ab der 2. Lieferung • Jederzeit kündbar'
                          : 'Free shipping from 2nd delivery • Cancel anytime'}
                      </p>
                    </div>
                  )}

                  {/* Quantity Selection for One-Time Purchase */}
                  {purchaseType === 'onetime' && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">{t('selectQuantity')}</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {/* 1 Stück */}
                        <button
                          onClick={() => setSelectedQuantity(1)}
                          className={`relative border-2 rounded-2xl p-6 transition-all ${
                            selectedQuantity === 1
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {selectedQuantity === 1 && (
                            <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                          <div className="text-center">
                            <div className="text-2xl font-bold mb-2">1 {t('pieces')}</div>
                            <div className="text-base text-muted-foreground">€{currentProductPricing.regular.toFixed(2)}</div>
                          </div>
                        </button>

                        {/* 3 Stück */}
                        <button
                          onClick={() => setSelectedQuantity(3)}
                          className={`relative border-2 rounded-2xl p-6 transition-all ${
                            selectedQuantity === 3
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap">
                            {locale.startsWith('de') ? 'Am beliebtesten' : 'Most popular'}
                          </div>
                          {selectedQuantity === 3 && (
                            <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                          <div className="text-center pt-2">
                            <div className="text-2xl font-bold mb-1">3 {t('pieces')}</div>
                            <div className="text-primary font-semibold text-sm mb-2">{t('save').replace('{discount}', '10')}</div>
                            <div className="text-sm text-muted-foreground line-through">€{(currentProductPricing.regular * 3).toFixed(2)}</div>
                            <div className="text-base font-semibold">€{(currentProductPricing.regular * 3 * 0.9).toFixed(2)}</div>
                          </div>
                        </button>

                        {/* 6 Stück */}
                        <button
                          onClick={() => setSelectedQuantity(6)}
                          className={`relative border-2 rounded-2xl p-6 transition-all ${
                            selectedQuantity === 6
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {selectedQuantity === 6 && (
                            <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                          <div className="text-center">
                            <div className="text-2xl font-bold mb-1">6 {t('pieces')}</div>
                            <div className="text-primary font-semibold text-sm mb-2">{t('save').replace('{discount}', '15')}</div>
                            <div className="text-sm text-muted-foreground line-through">€{(currentProductPricing.regular * 6).toFixed(2)}</div>
                            <div className="text-base font-semibold">€{(currentProductPricing.regular * 6 * 0.85).toFixed(2)}</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Price Summary */}
                  <div className="bg-secondary/20 rounded-xl p-4 space-y-2">
                    {purchaseType === 'subscription' ? (
                      <>
                        {(() => {
                          const months = subscriptionInterval === 60 ? 2 : subscriptionInterval === 90 ? 3 : 6;
                          const subPrice = getSubscriptionPrice(months as 2 | 3 | 6);
                          const discount = getSubscriptionDiscount(months as 2 | 3 | 6);
                          return (
                            <>
                              <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold">{locale.startsWith('de') ? 'Preis' : 'Price'}:</span>
                                <div className="text-right">
                                  <div className="text-sm text-muted-foreground line-through">
                                    €{currentProductPricing.regular.toFixed(2)}
                                  </div>
                                  <div className="text-3xl font-bold text-foreground">
                                    €{subPrice.toFixed(2)}
                                  </div>
                                </div>
                              </div>
                              <div className="text-primary font-semibold">
                                {t('wasSaved')} €{(currentProductPricing.regular - subPrice).toFixed(2)} ({discount}%)
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <Truck className="w-4 h-4" />
                                {locale.startsWith('de') 
                                  ? 'Kostenloser Versand ab der 2. Lieferung'
                                  : 'Free shipping from 2nd delivery'}
                              </div>
                            </>
                          );
                        })()}
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
                {/* Purchase Type Selection for Bundles */}
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
                        {locale.startsWith('de') ? 'Einmalig kaufen' : 'One-time purchase'}
                      </div>
                      <div className="text-lg font-bold">€{currentBundlePricing.oneTime.toFixed(2)}</div>
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
                          {locale.startsWith('de') ? 'Bis zu' : 'Up to'} -{currentBundlePricing.discounts[6]}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">{locale.startsWith('de') ? 'ab' : 'from'} €{currentBundlePricing.monthly[6].toFixed(2)}</span>
                        <span className="text-sm text-muted-foreground line-through">€{currentBundlePricing.oneTime.toFixed(2)}</span>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Subscription Duration Selection for Bundles */}
                {purchaseType === 'subscription' && (
                  <div className="pl-9 space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">
                      {locale.startsWith('de') ? 'Vorrat wählen:' : 'Choose supply:'}
                    </p>
                    <div className="space-y-3">
                      {/* 2 Monate */}
                      <button
                        onClick={() => setSelectedQuantity(2)}
                        className={`w-full flex items-start gap-3 p-3 rounded-lg border transition-all ${
                          selectedQuantity === 2
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          selectedQuantity === 2 ? 'border-primary' : 'border-muted-foreground'
                        }`}>
                          {selectedQuantity === 2 && (
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{locale.startsWith('de') ? '2-Monate Vorrat' : '2 months supply'}</span>
                            <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                              -{currentBundlePricing.discounts[2]}%
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">{locale.startsWith('de') ? 'Zum Ausprobieren und Herantasten an eine neue Routine.' : 'To try out and ease into a new routine.'}</div>
                          <div className="text-xs text-primary mt-1">{locale.startsWith('de') ? '2 Lieferungen • endet automatisch' : '2 deliveries • ends automatically'}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-bold">€{currentBundlePricing.monthly[2].toFixed(2)}</span>
                            <span className="text-xs text-muted-foreground line-through">€{currentBundlePricing.oneTime.toFixed(2)}</span>
                          </div>
                        </div>
                      </button>

                      {/* 3 Monate */}
                      <button
                        onClick={() => setSelectedQuantity(3)}
                        className={`w-full flex items-start gap-3 p-3 rounded-lg border transition-all ${
                          selectedQuantity === 3
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          selectedQuantity === 3 ? 'border-primary' : 'border-muted-foreground'
                        }`}>
                          {selectedQuantity === 3 && (
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{locale.startsWith('de') ? '3-Monate Vorrat' : '3 months supply'}</span>
                            <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                              -{currentBundlePricing.discounts[3]}%
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">{locale.startsWith('de') ? 'Für eine regelmäßige, kontinuierliche Nutzung.' : 'For regular, continuous use.'}</div>
                          <div className="text-xs text-primary mt-1">{locale.startsWith('de') ? '3 Lieferungen • endet automatisch' : '3 deliveries • ends automatically'}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-bold">€{currentBundlePricing.monthly[3].toFixed(2)}</span>
                            <span className="text-xs text-muted-foreground line-through">€{currentBundlePricing.oneTime.toFixed(2)}</span>
                          </div>
                        </div>
                      </button>

                      {/* 6 Monate */}
                      <button
                        onClick={() => setSelectedQuantity(6)}
                        className={`w-full flex items-start gap-3 p-3 rounded-lg border transition-all ${
                          selectedQuantity === 6
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          selectedQuantity === 6 ? 'border-primary' : 'border-muted-foreground'
                        }`}>
                          {selectedQuantity === 6 && (
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{locale.startsWith('de') ? '6-Monate Vorrat' : '6 months supply'}</span>
                            <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                              -{currentBundlePricing.discounts[6]}%
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">{locale.startsWith('de') ? 'Für alle, die ihre tägliche Ergänzung langfristig planen möchten.' : 'For those who want to plan their daily supplement long-term.'}</div>
                          <div className="text-xs text-primary mt-1">{locale.startsWith('de') ? '6 Lieferungen • endet automatisch' : '6 deliveries • ends automatically'}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-bold">€{currentBundlePricing.monthly[6].toFixed(2)}</span>
                            <span className="text-xs text-muted-foreground line-through">€{currentBundlePricing.oneTime.toFixed(2)}</span>
                          </div>
                        </div>
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground italic">
                      {locale.startsWith('de') 
                        ? 'Kostenloser Versand ab der 2. Lieferung • Jederzeit kündbar'
                        : 'Free shipping from 2nd delivery • Cancel anytime'}
                    </p>
                  </div>
                )}

                {/* Bundle Quantity Selection for One-Time Purchase */}
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
                          <div className="text-sm text-muted-foreground">€{currentBundlePricing.oneTime.toFixed(2)}</div>
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
                          <div className="text-sm text-muted-foreground line-through">€{(currentBundlePricing.oneTime * 3).toFixed(2)}</div>
                          <div className="text-sm font-semibold">€{(currentBundlePricing.oneTime * 3 * 0.9).toFixed(2)}</div>
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
                          <div className="text-2xl font-bold mb-1">6 {t('pieces')}</div>
                          <div className="text-primary font-semibold text-sm mb-1">{t('save').replace('{discount}', '15')}</div>
                          <div className="text-sm text-muted-foreground line-through">€{(currentBundlePricing.oneTime * 6).toFixed(2)}</div>
                          <div className="text-sm font-semibold">€{(currentBundlePricing.oneTime * 6 * 0.85).toFixed(2)}</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Bundle Info */}
                <div className="bg-secondary/20 rounded-xl p-4 space-y-2">
                  {purchaseType === 'subscription' ? (
                    <>
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
                        {locale.startsWith('de') ? 'Endet automatisch nach Ablauf' : 'Ends automatically after completion'}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        {locale.startsWith('de') ? 'Kostenloser Versand ab der 2. Lieferung' : 'Free shipping from 2nd delivery'}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">{t('total')}:</span>
                        <div className="text-right">
                          {(selectedQuantity === 3 || selectedQuantity === 6) && (
                            <div className="text-sm text-muted-foreground line-through">
                              €{(currentBundlePricing.oneTime * (selectedQuantity as number)).toFixed(2)}
                            </div>
                          )}
                          <div className="text-3xl font-bold text-foreground">
                            €{(currentBundlePricing.oneTime * (selectedQuantity as number) * (selectedQuantity === 3 ? 0.9 : selectedQuantity === 6 ? 0.85 : 1)).toFixed(2)}
                          </div>
                        </div>
                      </div>
                      {(selectedQuantity === 3 || selectedQuantity === 6) && (
                        <div className="text-primary font-semibold">
                          {t('wasSaved')} €{(currentBundlePricing.oneTime * (selectedQuantity as number) * (selectedQuantity === 3 ? 0.1 : 0.15)).toFixed(2)} ({selectedQuantity === 3 ? '10' : '15'}%)
                        </div>
                      )}
                    </>
                  )}
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
                  {!node.handle.includes('omega') && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="w-4 h-4" />
                      <span>{locale.startsWith('de') ? 'HACCP Konform' : 'HACCP Certified'}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Leaf className="w-4 h-4" />
                    <span>{locale.startsWith('de') ? 'Hochwertige Inhaltsstoffe' : 'Premium Ingredients'}</span>
                  </div>
                  {node.handle.includes('vitamin-c-gummies') && (
                    <>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Award className="w-4 h-4" />
                        <span>GMP & ISO 22000</span>
                      </div>
                    </>
                  )}
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
