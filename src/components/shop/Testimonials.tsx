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
      text: "My skin feels smoother, my joints are pain-free – finally feeling well again!",
      rating: 5
    },
    {
      name: "Hans D.",
      age: 62,
      text: "After only 3 weeks, I notice significantly more mobility. Highly recommended!",
      rating: 5
    },
    {
      name: "Petra M.",
      age: 55,
      text: "The quality is convincing. I feel more vital and energetic than ever before.",
      rating: 5
    }
  ] : [
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

  return (
    <section className="py-20 bg-wellness-beige/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold mb-4 text-foreground">
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
