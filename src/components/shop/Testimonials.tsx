import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTranslation, useLocaleStore } from "@/stores/localeStore";

export const Testimonials = () => {
  const t = useTranslation();
  const locale = useLocaleStore(state => state.locale);
  
  const testimonials = locale === 'en-US' ? [
    {
      name: "Maria K.",
      age: 58,
      text: "I've been using the product regularly for 10 weeks now. Taking it is uncomplicated, fits well into my daily routine.",
      rating: 5
    },
    {
      name: "Hans D.",
      age: 62,
      text: "Positively surprised by the quality. Capsules are pleasant to take, no problems swallowing. Delivery arrived on time. Price is fair, I'm satisfied. Clear recommendation.",
      rating: 5
    },
    {
      name: "Petra M.",
      age: 55,
      text: "I've been taking the capsules daily for 8 weeks. Easy to swallow, no aftertaste. Delivery was fast, packaging high-quality. Value for money is right. Will reorder!",
      rating: 5
    }
  ] : [
    {
      name: "Maria K.",
      age: 58,
      text: "Verwende das Produkt jetzt seit 10 Wochen regelmäßig. Die Einnahme ist unkompliziert, passt gut in meinen Alltag.",
      rating: 5
    },
    {
      name: "Hans D.",
      age: 62,
      text: "Bin positiv überrascht von der Qualität. Kapseln sind angenehm zu nehmen, keine Probleme beim Schlucken. Lieferung kam pünktlich. Preis fair, bin zufrieden. Klare Empfehlung.",
      rating: 5
    },
    {
      name: "Petra M.",
      age: 55,
      text: "Nehme die Kapseln seit 8 Wochen täglich. Lassen sich gut schlucken, kein Nachgeschmack. Lieferung war schnell, Verpackung hochwertig. Preis-Leistung stimmt. Werde nachbestellen!",
      rating: 5
    }
  ];

  return (
    <section id="reviews" className="py-20 bg-wellness-beige/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-brand text-4xl font-semibold mb-4 text-foreground">
            {t('testimonialsTitle')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('testimonialsDesc')}
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
                <p className="text-sm text-muted-foreground">{testimonial.age} {t('years')}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
