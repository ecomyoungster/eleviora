import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useTranslation, useLocaleStore } from "@/stores/localeStore";
import { getTranslatedProduct } from "@/lib/translations";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const t = useTranslation();
  const locale = useLocaleStore(state => state.locale);
  const { node } = product;
  
  const translated = getTranslatedProduct(node.handle, locale, node.title, node.description);

  const handleAddToCart = () => {
    const variant = node.variants.edges[0]?.node;
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
    toast.success(t('addToCart'), {
      position: "top-center"
    });
  };

  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const imageUrl = node.images.edges[0]?.node.url;

  // Check if product is a bundle and get discount
  const getDiscount = () => {
    const title = node.title.toLowerCase();
    
    if (title.includes('schönheit von innen') || title.includes('beauty')) {
      return locale === 'en-US' ? 'Save 18%' : '18% sparen';
    }
    if (title.includes('gelenk') || title.includes('beweglichkeit') || title.includes('joint')) {
      return locale === 'en-US' ? 'Save 20%' : '20% sparen';
    }
    if (title.includes('ganzkörper') || title.includes('vital') || title.includes('full body')) {
      return locale === 'en-US' ? 'Save 20%' : '20% sparen';
    }
    
    return null;
  };

  const discount = getDiscount();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow relative">
      {discount && (
        <Badge className="absolute top-4 right-4 z-10 bg-emerald-500 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-1.5 shadow-lg rounded-full">
          {discount}
        </Badge>
      )}
      <Link to={`/product/${node.handle}`}>
        <div className="aspect-square bg-secondary/20 overflow-hidden">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={translated.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              {locale === 'en-US' ? 'No image available' : 'Kein Bild verfügbar'}
            </div>
          )}
        </div>
      </Link>
      <div className="p-6 space-y-4">
        <Link to={`/product/${node.handle}`}>
          <h3 className="font-serif text-xl font-semibold text-foreground hover:text-primary transition-colors">
            {translated.title}
          </h3>
        </Link>
        {translated.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {translated.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-foreground">
            €{price.toFixed(2)}
          </span>
          <Button 
            onClick={handleAddToCart}
            className="bg-primary hover:bg-primary/90"
          >
            {t('addToCart')}
          </Button>
        </div>
      </div>
    </Card>
  );
};
