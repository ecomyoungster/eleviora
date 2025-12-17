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
    intro: "Kollagen ist ein wichtiger Bestandteil des Bindegewebes und trägt unter anderem zur Erhaltung normaler Haut bei. Diese Wirkung ist von der European Food Safety Authority (EFSA) geprüft und als zugelassene gesundheitsbezogene Angabe bestätigt (Health Claim ID 4017). Studien zeigen, dass Kollagen-Hydrolysat die Versorgung mit spezifischen Aminosäuren unterstützt, die für die Struktur und Funktion des Hautgewebes notwendig sind.",
    nutrition: "Unser Kollagen-Hydrolysat liefert diese Aminosäuren in leicht verwertbarer Form und ergänzt eine ausgewogene Ernährung, die entscheidend für die allgemeine Hautgesundheit ist. Dabei ist wichtig zu betonen, dass Nahrungsergänzungsmittel kein Ersatz für eine gesunde Ernährung und einen ausgewogenen Lebensstil darstellen.",
    bioavailability: "Zahlreiche wissenschaftliche Untersuchungen haben die Bioverfügbarkeit von Kollagen-Hydrolysat belegt. Nach oraler Einnahme werden die Peptide im Körper aufgenommen und können die körpereigene Kollagenproduktion unterstützen. EFSA betont, dass solche zugelassenen Aussagen nur im Kontext einer ausgewogenen Ernährung und eines gesunden Lebensstils verwendet werden dürfen.",
    conclusion: "Mit unserem Produkt bieten wir eine Möglichkeit, die tägliche Ernährung gezielt zu ergänzen. Dabei setzen wir auf geprüfte Qualität, Reinheit und Transparenz – unterstützt durch wissenschaftliche Erkenntnisse, ohne über das Zulässige hinauszugehen.",
    source: "Scientific Opinion on the substantiation of a health claim related to VeriSol®P and a change in skin elasticity leading to an improvement in skin function pursuant to Article 13(5) of Regulation (EC) No 1924/2006 - EFSA Journal - Wiley Online Library",
    sourceLabel: "Quelle"
  } : {
    intro: "Collagen is an important component of connective tissue and contributes to the maintenance of normal skin. This effect has been reviewed by the European Food Safety Authority (EFSA) and confirmed as an authorized health claim (Health Claim ID 4017). Studies show that collagen hydrolysate supports the supply of specific amino acids necessary for the structure and function of skin tissue.",
    nutrition: "Our collagen hydrolysate provides these amino acids in an easily absorbable form and complements a balanced diet, which is crucial for overall skin health. It is important to emphasize that dietary supplements are not a substitute for a healthy diet and balanced lifestyle.",
    bioavailability: "Numerous scientific studies have demonstrated the bioavailability of collagen hydrolysate. After oral intake, the peptides are absorbed in the body and can support the body's own collagen production. EFSA emphasizes that such authorized claims may only be used in the context of a balanced diet and healthy lifestyle.",
    conclusion: "With our product, we offer a way to specifically supplement your daily diet. We rely on tested quality, purity, and transparency – supported by scientific findings, without exceeding what is permissible.",
    source: "Scientific Opinion on the substantiation of a health claim related to VeriSol®P and a change in skin elasticity leading to an improvement in skin function pursuant to Article 13(5) of Regulation (EC) No 1924/2006 - EFSA Journal - Wiley Online Library",
    sourceLabel: "Source"
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
                {locale.startsWith('de') ? 'Wissenschaftliche Grundlage' : 'Scientific Foundation'}
              </h3>
            </div>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>{scientificContent.intro}</p>
              <p>{scientificContent.nutrition}</p>
              <p>{scientificContent.bioavailability}</p>
              <p className="text-foreground font-medium">{scientificContent.conclusion}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-border/50">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <ExternalLink className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>
                  <span className="font-medium">{scientificContent.sourceLabel}:</span>{" "}
                  <span className="italic">{scientificContent.source}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
