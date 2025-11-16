import { Heart, Sparkles, Zap } from "lucide-react";
import { useTranslation } from "@/stores/localeStore";

export const Benefits = () => {
  const t = useTranslation();
  
  const benefits = [
    {
      icon: Heart,
      title: t('benefit1Title'),
      description: t('benefit1Desc')
    },
    {
      icon: Sparkles,
      title: t('benefit2Title'),
      description: t('benefit2Desc')
    },
    {
      icon: Zap,
      title: t('benefit3Title'),
      description: t('benefit3Desc')
    }
  ];
  
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-card p-8 rounded-xl text-center space-y-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                <benefit.icon className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-foreground">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
