import { useTranslation } from "@/stores/localeStore";
import { Beaker, Shield, Leaf, Award } from "lucide-react";

export const Science = () => {
  const t = useTranslation();

  const facts = [
    {
      icon: Beaker,
      title: t('scienceFact1Title'),
      description: t('scienceFact1Desc'),
    },
    {
      icon: Shield,
      title: t('scienceFact2Title'),
      description: t('scienceFact2Desc'),
    },
    {
      icon: Leaf,
      title: t('scienceFact3Title'),
      description: t('scienceFact3Desc'),
    },
    {
      icon: Award,
      title: t('scienceFact4Title'),
      description: t('scienceFact4Desc'),
    },
  ];

  return (
    <section id="science" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-brand text-4xl font-semibold mb-4 text-foreground">
            {t('scienceTitle')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {t('scienceSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {facts.map((fact, index) => (
            <div
              key={index}
              className="flex gap-6 p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <fact.icon className="w-7 h-7 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-brand text-xl font-semibold mb-2 text-foreground">
                  {fact.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {fact.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
