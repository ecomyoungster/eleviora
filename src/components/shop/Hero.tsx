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
    <section className="relative min-h-[85vh] flex items-center bg-gradient-to-b from-wellness-beige/40 to-background overflow-hidden">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Text content */}
          <div className="space-y-6 order-last lg:order-first text-center lg:text-left">
            <h1 className="font-brand text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-[1.1]">
              {isEn ? 'Rediscover' : 'Erkenne dich'}
              <br />
              <span className="text-primary/80">
                {isEn ? 'yourself.' : 'selbst wieder.'}
              </span>
            </h1>

            {/* Rating Badge (red line position) */}
            <div className="inline-flex items-center gap-2 bg-card border rounded-full px-4 py-2 shadow-sm">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">
                {isEn ? 'Excellent' : 'Exzellent'}
              </span>
              <span className="text-sm text-muted-foreground">
                {isEn ? 'rated 4.9 / 5' : 'bewertet 4.9 / 5'}
              </span>
            </div>

            <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
              {isEn
                ? 'Eleviora – natural support for firm skin, strong bones, and flexible joints.'
                : 'Eleviora – die natürliche Unterstützung für straffe Haut, starke Knochen und bewegliche Gelenke.'}
            </p>

            {/* CTA Button (blue line position) - dark green */}
            <div className="flex flex-col items-center lg:items-start gap-3">
              <Link to="/product/kollagen-hydrolysat-pulver">
                <Button
                  size="lg"
                  className="bg-wellness-dark hover:bg-wellness-dark/90 text-white text-lg px-10 py-6 rounded-md font-semibold"
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

          {/* Hero Image - protected */}
          <div className="relative flex justify-center order-first lg:order-last">
            <div className="w-full max-w-lg protected-image">
              <img
                alt={isEn ? "Woman with Eleviora Collagen" : "Frau mit Eleviora Kollagen"}
                className="w-full h-auto object-contain rounded-3xl pointer-events-none select-none"
                src={heroImage}
                width={600}
                height={700}
                fetchPriority="high"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
