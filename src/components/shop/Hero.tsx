import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-woman-eleviora.png";
import { useTranslation, useLocaleStore } from "@/stores/localeStore";
import { Star, Shield } from "lucide-react";

export const Hero = () => {
  const t = useTranslation();
  const locale = useLocaleStore(state => state.locale);
  const isEn = locale === 'en-US';

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Pink gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-wellness-rose/60 via-wellness-beige/40 to-wellness-cream z-0" />
      
      {/* Woman image - right side background */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[55%] z-[1]">
        <div className="protected-image w-full h-full">
          <img
            alt={isEn ? "Woman with Eleviora Collagen" : "Frau mit Eleviora Kollagen"}
            className="w-full h-full object-cover object-top pointer-events-none select-none"
            src={heroImage}
            fetchPriority="high"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      </div>

      {/* Text overlay - left side */}
      <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32 min-h-[90vh] flex items-center">
        <div className="max-w-lg space-y-6">
          <h1 className="font-brand text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1]">
            {isEn ? 'Rediscover' : 'Erkenne dich'}
            <br />
            <span className="text-primary/70 font-light">
              {isEn ? 'yourself.' : 'selbst wieder.'}
            </span>
          </h1>

          {/* Rating Badge */}
          <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border rounded-full px-4 py-2 shadow-sm">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-foreground">
              {isEn ? 'Excellent' : 'Exzellent'}
            </span>
            <span className="text-sm text-muted-foreground">
              {isEn ? 'rated 4.9 / 5' : 'bewertet 4.9 / 5'}
            </span>
          </div>

          <p className="text-base text-muted-foreground leading-relaxed">
            {isEn
              ? 'Eleviora – natural support for firm skin, strong bones, and flexible joints.'
              : 'Eleviora – die natürliche Unterstützung für straffe Haut, starke Knochen und bewegliche Gelenke.'}
          </p>

          {/* CTA Button - dark green like reference */}
          <div className="flex flex-col items-start gap-3">
            <Link to="/product/kollagen-hydrolysat-pulver">
              <Button
                size="lg"
                className="bg-wellness-dark hover:bg-wellness-dark/90 text-white text-base px-10 py-6 rounded-md font-semibold w-64"
              >
                {isEn ? 'Buy now' : 'Jetzt kaufen'}
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Shield className="w-4 h-4" />
              <span>{isEn ? '60-Day Money-Back Guarantee' : '60 Tage Geld-zurück-Garantie'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
