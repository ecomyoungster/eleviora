import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-collagen.jpg";

export const Hero = () => {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-to-b from-wellness-cream to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="font-serif text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Mehr Beweglichkeit.<br />
              Glattere Haut.<br />
              Spürbar vitaler.
            </h1>
            <p className="text-xl text-muted-foreground">
              Premium-Nahrungsergänzung, entwickelt für die Bedürfnisse ab 50.
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6"
              onClick={scrollToProducts}
            >
              Jetzt entdecken
            </Button>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={heroImage} 
                alt="Premium Kollagen Supplement" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
