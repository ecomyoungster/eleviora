import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Wie lange dauert es, bis ich Ergebnisse sehe?",
    answer: "Die meisten Kunden berichten von ersten spürbaren Verbesserungen nach 2-3 Wochen regelmäßiger Einnahme. Für optimale Ergebnisse empfehlen wir eine Anwendung über mindestens 8-12 Wochen."
  },
  {
    question: "Sind die Produkte vegan?",
    answer: "Unsere Kollagen-Produkte sind nicht vegan, da Kollagen aus natürlichen tierischen Quellen gewonnen wird. Jedoch sind alle unseren Vitamin- und Mineralstoff-Produkte 100% vegan und pflanzlich."
  },
  {
    question: "Wo werden die Produkte hergestellt?",
    answer: "Alle unsere Produkte werden in Deutschland unter strengsten Qualitätsstandards hergestellt und sind laborgeprüft. Wir garantieren höchste Reinheit und Bioverfügbarkeit."
  },
  {
    question: "Kann ich die Produkte kombinieren?",
    answer: "Ja, unsere Produkte sind so konzipiert, dass sie sicher miteinander kombiniert werden können. Für optimale Ergebnisse empfehlen wir unsere Bundle-Angebote, die aufeinander abgestimmte Produkte enthalten."
  },
  {
    question: "Gibt es Nebenwirkungen?",
    answer: "Unsere Produkte sind gut verträglich und bestehen aus natürlichen Inhaltsstoffen. Bei bekannten Allergien oder Unsicherheiten empfehlen wir, vor der Einnahme Ihren Arzt zu konsultieren."
  }
];

export const FAQ = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold mb-4 text-foreground">
            Häufig gestellte Fragen
          </h2>
          <p className="text-muted-foreground text-lg">
            Alles, was Sie wissen müssen
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-serif text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
