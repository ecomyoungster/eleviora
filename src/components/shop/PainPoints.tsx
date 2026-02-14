import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const PainPoints = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-wellness-beige/20">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="font-brand text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
          Sag Lebewohl zu Falten, müder Haut & Energielosigkeit
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
          Du fühlst dich nicht mehr ganz wohl in deinem Körper? Du hast so vieles ausprobiert – doch nichts hilft langfristig? Unsere kraftvolle, natürliche Formel hat schon tausenden Frauen zu neuem Wohlbefinden verholfen – ganz ohne aggressive Behandlungen.
        </p>
        <Link to="/product/kollagen-hydrolysat-pulver">
          <Button
            size="lg"
            className="bg-wellness-dark hover:bg-wellness-dark/90 text-white text-lg px-8 py-6 gap-2 rounded-md font-semibold"
          >
            Jetzt ausprobieren
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
};
