import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Maria K.",
    age: 58,
    text: "Meine Haut fühlt sich glatter an, meine Gelenke sind schmerzfrei – endlich wieder Wohlgefühl!",
    rating: 5
  },
  {
    name: "Hans D.",
    age: 62,
    text: "Nach nur 3 Wochen spüre ich deutlich mehr Beweglichkeit. Kann ich nur empfehlen!",
    rating: 5
  },
  {
    name: "Petra M.",
    age: 55,
    text: "Die Qualität überzeugt. Ich fühle mich vitaler und energiegeladener als je zuvor.",
    rating: 5
  }
];

export const Testimonials = () => {
  return (
    <section className="py-20 bg-wellness-beige/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold mb-4 text-foreground">
            Was unsere Kunden sagen
          </h2>
          <p className="text-muted-foreground text-lg">
            Echte Erfahrungen von zufriedenen Kunden
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 space-y-4">
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground italic">"{testimonial.text}"</p>
              <div className="pt-4 border-t">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.age} Jahre</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
