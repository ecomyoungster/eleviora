import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { useTranslation, useLocaleStore } from "@/stores/localeStore";
import kollagenImage from "@/assets/kollagen-product-new.png";

export const ProductShowcase = () => {
  const t = useTranslation();
  const locale = useLocaleStore(state => state.locale);
  
  const benefits = locale === 'en-US' ? [
    "Supports skin elasticity & firmness",
    "Promotes joint flexibility",
    "High bioavailability",
    "Pure quality without additives",
    "30-day satisfaction guarantee",
  ] : [
    "Unterstützt Hautelastizität & Festigkeit",
    "Fördert Gelenkflexibilität",
    "Hohe Bioverfügbarkeit",
    "Reine Qualität ohne Zusatzstoffe",
    "30 Tage Zufriedenheitsgarantie",
  ];

  return (
    <section id="product" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-square max-w-md mx-auto">
              <img
                src={kollagenImage}
                alt={locale === 'en-US' ? "Collagen Hydrolysate Powder" : "Kollagen Hydrolysat Pulver"}
                className="w-full h-full object-contain"
              />
            </div>
            <Badge className="absolute top-4 right-4 lg:right-12 bg-primary text-primary-foreground text-sm px-4 py-2">
              500g
            </Badge>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <Badge variant="outline" className="mb-4 text-primary border-primary">
                {t('premiumQuality')}
              </Badge>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {locale === 'en-US' ? 'Collagen Hydrolysate Powder' : 'Kollagen Hydrolysat Pulver'}
              </h2>
              <p className="text-xl text-muted-foreground">
                {locale === 'en-US' 
                  ? 'Pure collagen hydrolysate for radiant skin, strong hair, and flexible joints. Dissolves instantly – no taste, no effort.'
                  : 'Reines Kollagen-Hydrolysat für strahlende Haut, kräftiges Haar und flexible Gelenke. Löst sich sofort auf – geschmacksneutral, unkompliziert.'}
              </p>
            </div>

            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/product/kollagen-hydrolysat-pulver" className="flex-1">
                <Button size="lg" className="w-full text-lg gap-2">
                  {t('shopNow')}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground pt-4 border-t">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                {t('freeShippingFrom')}
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                {t('returnPolicy')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
