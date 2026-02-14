import { Pill, FlaskConical, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Pill,
    step: "Schritt 1",
    title: "Dein täglicher Begleiter",
    desc: "Zwei Kapseln täglich – simpel, unkompliziert und perfekt für deine Routine.",
  },
  {
    icon: FlaskConical,
    step: "Schritt 2",
    title: "Wirkung, die überzeugt",
    desc: "Premium Kollagenhydrolysat trifft auf Hyaluronsäure, Vitamine und kraftvolle Antioxidantien aus Granatapfel.",
  },
  {
    icon: Sparkles,
    step: "Schritt 3",
    title: "Strahle Selbstvertrauen aus",
    desc: "In nur 4-6 Wochen zu strafferer Haut, mehr Elastizität und einem sicheren Gefühl.",
  },
];

export const Steps = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-brand text-3xl md:text-4xl font-bold text-foreground mb-4">
            Selbstvertrauen beginnt hier
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Straffere Haut, innere Balance und neue Vitalität – Schritt für Schritt.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <div key={i} className="bg-card rounded-xl p-8 text-center space-y-4 shadow-sm">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary">
                <s.icon className="w-7 h-7" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {s.step}
              </p>
              <h3 className="font-brand text-xl font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <p className="text-muted-foreground text-sm">
            Wohlfühlen beginnt hier · ✓ 60 Tage Geld-zurück-Garantie
          </p>
        </div>
      </div>
    </section>
  );
};
