import { Star, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

const testimonials = [
  {
    name: "Sabine Müller",
    text: "Ich nehme die Kollagen-Kapseln jetzt seit 6 Wochen und bin begeistert! Meine Haut fühlt sich deutlich straffer an und die feinen Linien um meine Augen sind sichtbar weniger geworden. Was mich am meisten überrascht hat: Auch meine Nägel sind viel kräftiger. Endlich ein Produkt, das hält, was es verspricht!",
    badge: "Verifizierte Kundin",
  },
  {
    name: "Andrea Schneider",
    text: "Nach nur 4 Wochen sehe ich bereits Ergebnisse! Mein Hautbild wirkt frischer und ebenmäßiger. Freundinnen haben mich gefragt, ob ich etwas an meiner Pflegeroutine geändert habe. Die Kapseln sind leicht zu schlucken und ich vertrage sie ausgezeichnet. Für mich absolut empfehlenswert!",
    badge: "Verifizierte Kundin",
  },
  {
    name: "Claudia Weber",
    text: "Ich war anfangs skeptisch, aber Eleviøra hat mich eines Besseren belehrt. Nach 8 Wochen fühle ich mich vitaler und meine Haut sieht merklich jünger aus. Besonders die Elastizität meiner Haut hat sich verbessert. Die Kombination mit Hyaluronsäure und Vitaminen ist wirklich durchdacht. Werde definitiv nachbestellen!",
    badge: "Verifizierte Kundin",
  },
  {
    name: "Petra Hoffmann",
    text: "Endlich ein Kollagen-Produkt, das wirklich wirkt! Seit ich die Kapseln nehme, sind meine Haare fülliger und glänzender. Auch meine Gelenke fühlen sich beweglicher an. Die Qualität spürt man einfach. Ich nehme morgens 2 Kapseln mit einem Glas Wasser – super unkompliziert. Bin rundum zufrieden!",
    badge: "Verifizierte Kundin",
  },
  {
    name: "Martina Koch",
    text: "Mit 52 Jahren hatte ich nicht mehr erwartet, dass sich an meinem Hautbild noch so viel verbessern kann. Die Eleviøra Kollagen-Kapseln haben meine Erwartungen übertroffen! Meine Haut ist strahlender, fester und ich fühle mich einfach wohler in meiner Haut. Das Preis-Leistungs-Verhältnis ist auch top!",
    badge: "Verifizierte Kundin",
  },
  {
    name: "Elisabeth Becker",
    text: "Ich bin absolut begeistert von der Wirkung! Nach 5 Wochen regelmäßiger Einnahme sind nicht nur meine Nägel kräftiger geworden, sondern auch meine Haut wirkt viel praller und hydratisierter. Die Tiefenhaut scheint regelrecht von innen aufgepolstert zu sein. Kann ich nur wärmstens empfehlen – besonders die Kombination mit Granatapfel-Extrakt ist genial!",
    badge: "Verifizierte Kundin",
  },
];

export const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section id="reviews" className="py-20 bg-wellness-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-brand text-3xl md:text-4xl font-bold mb-4 text-white italic">
            Wahre Geschichten, Spürbare Veränderungen
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Entdecke, wie Eleviøra das Selbstvertrauen von Frauen nachhaltig gestärkt hat.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((t, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(33.333%-16px)]"
                >
                  <div className="bg-wellness-dark/80 border border-white/10 text-white rounded-xl p-6 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-white/85 text-sm leading-relaxed mb-6">
                        {t.text}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 pt-4 border-t border-white/15">
                      <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span className="text-sm font-semibold text-white">
                        {t.name} | {t.badge}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={scrollPrev}
              className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-white/70" />
            </button>
            <div className="flex gap-2">
              {scrollSnaps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === selectedIndex ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={scrollNext}
              className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-white/70" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
