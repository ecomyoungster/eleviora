import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2, Truck, BadgePercent } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useTranslation, useLocaleStore } from "@/stores/localeStore";
import { getTranslatedProduct } from "@/lib/translations";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);
  const [upsellProduct, setUpsellProduct] = useState<ShopifyProduct | null>(null);
  const [allProducts, setAllProducts] = useState<ShopifyProduct[]>([]);
  const { 
    items, 
    isLoading, 
    updateQuantity, 
    removeItem, 
    createCheckout,
    addItem 
  } = useCartStore();
  const t = useTranslation();
  const locale = useLocaleStore(state => state.locale);

  // Load products for upsell
  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts(50);
      setAllProducts(products);
    };
    loadProducts();
  }, []);
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
  
  const freeShippingThreshold = 49;
  const remainingForFreeShipping = freeShippingThreshold - totalPrice;
  
  // Check if cart contains any bundles - bundles always have free shipping
  const hasBundleInCart = items.some(item => 
    item.product.node.title.toLowerCase().includes('bundle') || 
    item.product.node.title.toLowerCase().includes('paket') ||
    item.product.node.title.toLowerCase().includes('komplettsystem')
  );
  
  const hasFreeShipping = hasBundleInCart || totalPrice >= freeShippingThreshold;
  
  // Calculate savings from bundles
  const bundleItems = items.filter(item => 
    item.product.node.title.toLowerCase().includes('bundle') || 
    item.product.node.title.toLowerCase().includes('paket') ||
    item.product.node.title.toLowerCase().includes('komplettsystem')
  );
  
  const totalSavings = bundleItems.reduce((sum, item) => {
    const description = item.product.node.description.toLowerCase();
    let savingsPercent = 0;
    
    if (description.includes('20%') || description.includes('sparen sie 20')) {
      savingsPercent = 0.20;
    } else if (description.includes('18%') || description.includes('sparen sie 18')) {
      savingsPercent = 0.18;
    } else if (description.includes('15%') || description.includes('sparen sie 15')) {
      savingsPercent = 0.15;
    } else if (description.includes('10%') || description.includes('sparen sie 10')) {
      savingsPercent = 0.10;
    }
    
    const itemPrice = parseFloat(item.price.amount) * item.quantity;
    const savings = itemPrice / (1 - savingsPercent) * savingsPercent;
    return sum + savings;
  }, 0);
  
  const hasSavings = totalSavings > 0;

  const handleCheckoutClick = () => {
    // Get a random product that's not already in cart
    const productsNotInCart = allProducts.filter(
      product => !items.some(item => item.product.node.id === product.node.id)
    );
    
    if (productsNotInCart.length > 0) {
      const randomProduct = productsNotInCart[Math.floor(Math.random() * productsNotInCart.length)];
      setUpsellProduct(randomProduct);
      setShowUpsell(true);
    } else {
      handleCheckout();
    }
  };

  const handleCheckout = async () => {
    try {
      setShowUpsell(false);
      await createCheckout();
      const checkoutUrl = useCartStore.getState().checkoutUrl;
      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank');
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  const handleAddUpsellAndCheckout = () => {
    if (upsellProduct) {
      const variant = upsellProduct.node.variants.edges[0].node;
      addItem({
        product: upsellProduct,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: variant.selectedOptions,
      });
    }
    handleCheckout();
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle>{t('shoppingCart')}</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? t('cartEmpty') : `${totalItems} ${t('itemsInCart')}`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">{t('cartEmpty')}</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => {
                    const translated = getTranslatedProduct(
                      item.product.node.handle,
                      locale,
                      item.product.node.title,
                      item.product.node.description
                    );
                    
                    // Calculate original price and discount
                    const currentPrice = parseFloat(item.price.amount);
                    let originalUnitPrice = currentPrice;
                    let discountPercent = 0;
                    
                    if (item.quantity === 3) {
                      originalUnitPrice = currentPrice / 0.9;
                      discountPercent = 10;
                    } else if (item.quantity === 6) {
                      originalUnitPrice = currentPrice / 0.85;
                      discountPercent = 15;
                    }
                    
                    const hasDiscount = discountPercent > 0;
                    const savings = (originalUnitPrice - currentPrice) * item.quantity;
                    
                    return (
                      <div key={item.variantId} className="flex gap-4 p-2">
                        <div className="w-16 h-16 bg-secondary rounded-md overflow-hidden flex-shrink-0">
                          {item.product.node.images?.edges?.[0]?.node && (
                            <img
                              src={item.product.node.images.edges[0].node.url}
                              alt={translated.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{translated.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.selectedOptions.map(option => option.value).join(' • ')}
                          </p>
                          <div className="space-y-0.5">
                            {hasDiscount && (
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground line-through">
                                  €{originalUnitPrice.toFixed(2)}
                                </span>
                                <span className="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                                  -{discountPercent}%
                                </span>
                              </div>
                            )}
                            <p className="font-semibold text-foreground">
                              €{currentPrice.toFixed(2)}
                            </p>
                            {hasDiscount && (
                              <p className="text-xs text-primary font-medium">
                                {locale.startsWith('de') ? `Sparst €${savings.toFixed(2)}` : `Save €${savings.toFixed(2)}`}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => removeItem(item.variantId)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                          
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="flex-shrink-0 space-y-4 pt-4 border-t bg-background">
                {/* Savings Indicator */}
                {hasSavings && (
                  <div className="flex items-center gap-2 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <BadgePercent className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {t('savings').replace('{amount}', totalSavings.toFixed(2))}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t('savingsDesc')}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Free Shipping Indicator */}
                {hasFreeShipping ? (
                  <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Truck className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {t('freeShipping')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t('freeShippingDesc')}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative overflow-hidden p-3 bg-secondary/30 rounded-lg border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm font-medium text-foreground">
                        {t('freeShippingRemaining').replace('{amount}', remainingForFreeShipping.toFixed(2))}
                      </p>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300 ease-out"
                        style={{ width: `${Math.min((totalPrice / freeShippingThreshold) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">{t('total')}</span>
                  <span className="text-xl font-bold">
                    €{totalPrice.toFixed(2)}
                  </span>
                </div>
                
                <Button 
                  onClick={handleCheckoutClick}
                  className="w-full" 
                  size="lg"
                  disabled={items.length === 0 || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t('creatingCheckout')}
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t('checkoutWith')}
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>

      {/* Upsell Dialog */}
      <AlertDialog open={showUpsell} onOpenChange={setShowUpsell}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {locale.startsWith('de') ? 'Möchten Sie das auch?' : 'Would you like to add this?'}
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              {upsellProduct && (
                <div className="flex gap-4 items-start">
                  {upsellProduct.node.images?.edges?.[0]?.node && (
                    <img
                      src={upsellProduct.node.images.edges[0].node.url}
                      alt={getTranslatedProduct(upsellProduct.node.handle, locale, upsellProduct.node.title, upsellProduct.node.description).title}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">
                      {getTranslatedProduct(upsellProduct.node.handle, locale, upsellProduct.node.title, upsellProduct.node.description).title}
                    </h4>
                    <p className="text-sm mb-2 line-clamp-2">
                      {getTranslatedProduct(upsellProduct.node.handle, locale, upsellProduct.node.title, upsellProduct.node.description).description}
                    </p>
                    <p className="font-bold text-primary">
                      €{parseFloat(upsellProduct.node.priceRange.minVariantPrice.amount).toFixed(2)}
                    </p>
                  </div>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCheckout}>
              {locale.startsWith('de') ? 'Nein danke' : 'No thanks'}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleAddUpsellAndCheckout}>
              {locale.startsWith('de') ? 'Ja bitte' : 'Yes please'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sheet>
  );
};
