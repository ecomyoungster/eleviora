import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;

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
    toast.success("Produkt zum Warenkorb hinzugefügt", {
      position: "top-center"
    });
  };

  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const imageUrl = node.images.edges[0]?.node.url;

  // Check if product is a bundle and get discount
  const getDiscount = () => {
    const title = node.title.toLowerCase();
    
    if (title.includes('schönheit von innen') || title.includes('beauty')) {
      return '18% sparen';
    }
    if (title.includes('gelenk') || title.includes('beweglichkeit')) {
      return '20% sparen';
    }
    if (title.includes('ganzkörper') || title.includes('vital')) {
      return '20% sparen';
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
              alt={node.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              Kein Bild verfügbar
            </div>
          )}
        </div>
      </Link>
      <div className="p-6 space-y-4">
        <Link to={`/product/${node.handle}`}>
          <h3 className="font-serif text-xl font-semibold text-foreground hover:text-primary transition-colors">
            {node.title}
          </h3>
        </Link>
        {node.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {node.description}
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
            In den Warenkorb
          </Button>
        </div>
      </div>
    </Card>
  );
};
