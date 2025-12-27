import { useTranslation, useLocaleStore } from "@/stores/localeStore";
import { Beaker, Shield, Leaf, Award, FileCheck, ExternalLink } from "lucide-react";

export const Science = () => {
  const t = useTranslation();
  const locale = useLocaleStore(state => state.locale);

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

  const scientificContent = locale.startsWith('de') ? {
    title: "Die Wissenschaft hinter Kollagen – Warum Qualität entscheidend ist",
    intro: "Kollagen ist das häufigste Protein im menschlichen Körper und macht etwa 30 Prozent der gesamten Proteinmasse aus. Es bildet das strukturelle Gerüst für Haut, Knochen, Knorpel, Sehnen und Bindegewebe. Ab dem 25. Lebensjahr reduziert sich die körpereigene Kollagenproduktion jährlich um etwa ein Prozent. Mit 45 Jahren hat der Körper bereits rund 20 Prozent seiner ursprünglichen Kollagenmenge verloren – ein natürlicher Prozess, der sich in der Hautstruktur, Gelenkfunktion und Bindegewebselastizität bemerkbar macht.",
    nutrition: "Die entscheidende Frage bei Kollagenpräparaten lautet: Kann der Körper das zugeführte Kollagen überhaupt verwerten? Hier zeigt die Forschung eindeutige Ergebnisse. Während natives Kollagen aus der Nahrung zu große Moleküle aufweist, um effektiv aufgenommen zu werden, durchläuft hydrolysiertes Kollagen einen enzymatischen Spaltungsprozess. Dabei entstehen kleine Peptide mit einem Molekulargewicht zwischen 2000 und 5000 Dalton. Wissenschaftliche Studien belegen, dass Kollagenpeptide dieser Molekülgröße vom Körper aufgenommen und ins Blut transportiert werden können, wo sie bis zu 14 Tage nachweisbar bleiben.",
    bioavailability: "Besonders wichtig ist die Kombination mit Mikronährstoffen. Vitamin C trägt nachweislich zu einer normalen Kollagenbildung für die normale Funktion der Haut bei. Auch Zink trägt zur Erhaltung normaler Haut bei. Diese synergistische Zusammensetzung unterscheidet hochwertige Präparate von reinen Kollagenpulvern und unterstützt die körpereigenen Prozesse optimal.",
    source: 'Frontiers in Nutrition (2024): "Absorption of bioactive peptides following collagen hydrolysate intake"',
    sourceUrl: "https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2024.1416643/full",
    sourceLabel: "Wissenschaftliche Quelle"
  } : {
    title: "The Science Behind Collagen – Why Quality Matters",
    intro: "Collagen is the most abundant protein in the human body, making up about 30 percent of total protein mass. It forms the structural framework for skin, bones, cartilage, tendons, and connective tissue. From age 25, the body's own collagen production decreases by about one percent annually. By age 45, the body has already lost around 20 percent of its original collagen amount – a natural process that becomes noticeable in skin structure, joint function, and connective tissue elasticity.",
    nutrition: "The crucial question with collagen supplements is: Can the body actually utilize the ingested collagen? Research shows clear results here. While native collagen from food has molecules too large to be effectively absorbed, hydrolyzed collagen undergoes an enzymatic splitting process. This creates small peptides with a molecular weight between 2000 and 5000 Daltons. Scientific studies demonstrate that collagen peptides of this molecular size can be absorbed by the body and transported into the bloodstream, where they remain detectable for up to 14 days.",
    bioavailability: "Particularly important is the combination with micronutrients. Vitamin C demonstrably contributes to normal collagen formation for the normal function of the skin. Zinc also contributes to the maintenance of normal skin. This synergistic composition distinguishes high-quality preparations from pure collagen powders and optimally supports the body's own processes.",
    source: 'Frontiers in Nutrition (2024): "Absorption of bioactive peptides following collagen hydrolysate intake"',
    sourceUrl: "https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2024.1416643/full",
    sourceLabel: "Scientific Source"
  };

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

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
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
              <h3 className="font-brand text-xl font-bold mb-2 text-foreground">
                  {fact.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {fact.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Scientific Content Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary/5 via-background to-primary/5 rounded-2xl p-8 md:p-12 border">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-brand text-2xl font-semibold text-foreground">
                {scientificContent.title}
              </h3>
            </div>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>{scientificContent.intro}</p>
              <p>{scientificContent.nutrition}</p>
              <p>{scientificContent.bioavailability}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-border/50">
              <a 
                href={scientificContent.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <ExternalLink className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:text-primary" />
                <p>
                  <span className="font-medium">{scientificContent.sourceLabel}:</span>{" "}
                  <span className="italic underline decoration-muted-foreground/30 group-hover:decoration-primary">{scientificContent.source}</span>
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
