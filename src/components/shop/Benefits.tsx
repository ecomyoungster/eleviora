import { Heart, Sparkles, Zap } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Weniger Gelenkschmerzen",
    description: "Spürbare Reduzierung von Steifheit und Gelenkbeschwerden"
  },
  {
    icon: Sparkles,
    title: "Strahlendere Haut",
    description: "Glattere, straffere Haut mit natürlichem Glow"
  },
  {
    icon: Zap,
    title: "Mehr Energie",
    description: "Gesteigerte Lebensqualität und Vitalität im Alltag"
  }
];

export const Benefits = () => {
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
