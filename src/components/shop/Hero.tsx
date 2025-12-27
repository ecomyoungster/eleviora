import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-kollagen.png";
import { useTranslation, useLocaleStore } from "@/stores/localeStore";
import { ArrowRight, Shield, Leaf, Award } from "lucide-react";
export const Hero = () => {
  const t = useTranslation();
  const locale = useLocaleStore(state => state.locale);
  const badges = locale === 'en-US' ? [{
    icon: Shield,
    text: "Laboratory Tested"
  }, {
    icon: Leaf,
    text: "No Additives"
  }, {
    icon: Award,
    text: "Premium Quality"
  }] : [{
    icon: Shield,
    text: "Laborgeprüft"
  }, {
    icon: Leaf,
    text: "Reine Formel"
  }, {
    icon: Award,
    text: "Premium Qualität"
  }];
  return <section className="relative min-h-[85vh] flex items-center bg-gradient-to-b from-wellness-cream to-background overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 dangerouslySetInnerHTML={{
              __html: t('heroTitle').replace(/<br\s*\/?>/g, ' ')
            }} className="font-brand text-2xl sm:text-3xl font-semibold text-foreground leading-tight [&>br]:hidden [&>br]:sm:inline lg:text-7xl" />
              <p className="text-xl text-muted-foreground max-w-lg lg:text-xl">
                {t('heroSubtitle')}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {badges.map((badge, index) => <div key={index} className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border shadow-sm">
                  <badge.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{badge.text}</span>
                </div>)}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/product/kollagen-hydrolysat-pulver">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 gap-2">
                  {t('heroButton')}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" onClick={() => document.getElementById('science')?.scrollIntoView({
              behavior: 'smooth'
            })}>
                {t('learnMore')}
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="w-full max-w-lg">
              <img alt={locale === 'en-US' ? "Premium Collagen Supplement" : "Premium Kollagen Supplement"} className="w-full h-auto object-contain rounded-3xl shadow-2xl" src="/lovable-uploads/227355c6-b6f4-4379-b38c-68408e74901b.png" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};