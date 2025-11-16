import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";
import { TrustBar } from "@/components/shop/TrustBar";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TrustBar />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Willkommen bei wellbe
          </h1>
          <p className="text-xl text-primary font-semibold mb-4">
            Hol dir deine jugendliche Energie zurück!
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Hey, schön, dass du zu uns gefunden hast! Bei wellbe sind wir fest davon überzeugt, 
            dass man sich jung und voller Energie fühlen kann, egal wie alt man ist. Unser Team 
            ist total begeistert davon, dir dabei zu helfen, dich großartig zu fühlen und dabei 
            noch fantastisch auszusehen.
          </p>
        </div>

        {/* Mission Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-secondary/30 rounded-2xl p-8 md:p-12">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
              Unsere Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Bei wellbe ist es unsere Mission, Menschen dabei zu unterstützen, ein erfülltes und 
              vitalitätsreiches Leben zu führen. Wir glauben daran, dass jeder das Recht hat, sich 
              jugendlich, gesund und energiegeladen zu fühlen, unabhängig von Alter oder Lebensumständen. 
              Unser Ziel ist es, hochwertige Produkte anzubieten, die einen positiven Einfluss auf das 
              Wohlbefinden unserer Kunden haben. Wir streben danach, die besten Lösungen aus Natur, 
              Wissenschaft und Innovation zu kombinieren, um Menschen auf ihrem Weg zu einem vitalen 
              und erfüllten Leben zu begleiten.
            </p>
          </div>
        </section>

        {/* Geschichte Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
            Unsere Geschichte
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            wellbe ist entstanden, weil wir alle das Bedürfnis hatten, Menschen wie dich dabei zu 
            unterstützen, das Beste aus sich herauszuholen. Wir sind selbst total verrückt danach 
            unsere Gesundheit ständig zu verbessern und mit Hilfe von natürlichen Produkten und einer 
            gesunden Lebensweise ein erfülltes und unbeschwertes Leben zu führen.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Deshalb haben wir es uns zum Ziel gesetzt, natürliche Lösungen für die größten Schmerzpunkte 
            eines jeden Menschen zu entwickeln, die die Power der Natur, Wissenschaft und Innovation 
            vereinen, um Dich dabei zu unterstützen, die beste und gesündeste Version Deiner selbst zu 
            sein. Wie der Name schon sagt, wollen wir, dass es Dir gut geht und Du Dich in Deiner Haut 
            wohlfühlst.
          </p>
        </section>

        {/* Versprechen Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-primary/10 rounded-2xl p-8 md:p-12">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
              Unser Versprechen
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Bei wellbe legen wir sehr großen Wert auf hochwertige Produkte, die wirklich einen 
              Unterschied machen. Jeder einzelne Inhaltsstoff wird von uns sorgfältig ausgewählt, 
              um sicherzustellen, dass du nur das Beste zu Dir nimmst. Jedes einzelne Produkt ist 
              perfekt darauf abgestimmt, dir das ultimative Gefühl von jugendlicher Vitalität zu geben.
            </p>
          </div>
        </section>

        {/* Kernwerte Section */}
        <section className="max-w-5xl mx-auto mb-16">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-10 text-center">
            Unsere Kernwerte
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                Qualität
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Wir legen höchsten Wert auf Qualität und stellen sicher, dass unsere Produkte den 
                strengsten Standards entsprechen. Jeder einzelne Inhaltsstoff wird sorgfältig ausgewählt, 
                um sicherzustellen, dass wir nur die besten und wirksamsten Produkte anbieten.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                Innovation
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Wir sind bestrebt, stets neue Wege zu finden, um unsere Kunden zu begeistern. Durch 
                kontinuierliche Forschung und Entwicklung bringen wir innovative Produkte auf den Markt, 
                die den neuesten Erkenntnissen und Trends entsprechen.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                Integrität
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Wir handeln stets mit Integrität und Transparenz. Unsere Kunden können darauf vertrauen, 
                dass wir ihnen gegenüber ehrlich und aufrichtig sind. Wir halten uns an ethische Grundsätze 
                und setzen uns für Nachhaltigkeit ein.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                Kundenzentriertheit
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Die Bedürfnisse und Zufriedenheit unserer Kunden stehen bei uns an erster Stelle. Wir 
                hören aufmerksam zu, um ihre Anliegen zu verstehen, und bieten ihnen persönliche 
                Unterstützung und Beratung. Unser Ziel ist es, langfristige und vertrauensvolle 
                Beziehungen aufzubauen.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                Gemeinschaft
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Wir glauben an die Kraft der Gemeinschaft. Bei wellbe schaffen wir eine unterstützende 
                und inspirierende Umgebung, in der sich Menschen gegenseitig motivieren und zusammenwachsen 
                können. Wir ermutigen zum Austausch von Erfahrungen und Wissen, um gemeinsam eine positive 
                Veränderung zu bewirken.
              </p>
            </div>
          </div>
        </section>

        {/* Qualität und Reinheit Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
            Qualität und Reinheit
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Wir lassen nichts dem Zufall überlassen, wenn es um Qualität und Reinheit geht. Unsere 
            Produkte durchlaufen strenge Tests, um sicherzustellen, dass sie höchsten Standards entsprechen. 
            Wir beziehen unsere Zutaten von vertrauenswürdigen Lieferanten, die unsere Werte teilen und 
            Nachhaltigkeit großschreiben. Bei uns bekommst du nur die beste Qualität, denn du verdienst es!
          </p>
        </section>

        {/* Persönliche Note Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-secondary/30 rounded-2xl p-8 md:p-12">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
              Eine persönliche Note
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Wir wissen, dass jeder Mensch einzigartig ist und seine eigene Reise zu einem gesunden Leben 
              hat. Deshalb stehen wir dir zur Seite und helfen dir, die Produkte zu finden, die perfekt zu 
              dir passen. Ob du deine Haut wieder zum Strahlen bringen möchtest, deine Energie steigern willst 
              oder einfach rundum fit sein möchtest - wir haben genau das Richtige für dich! Wir wollen die 
              Anlaufstelle Nummer 1 für all deine gesundheitlichen Herausforderungen sein und dir für jede 
              einzigartige und natürliche Lösungen bieten, die wissenschaftlich bewiesen helfen!
            </p>
          </div>
        </section>

        {/* Community Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
            Sei Teil unserer Community
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Wenn du Teil der wellbe-Community wirst, trittst du einer unvergleichbaren Gruppe von Menschen 
            bei, die genauso lebensfroh und energiegeladen sind wie du und alles dafür tun, sich in ihrer 
            Haut wohlzufühlen. Wir unterstützen uns gegenseitig, teilen unser Wissen und motivieren uns auf 
            unserer gemeinsamen Reise zu einem vitalen Leben. Zusammen können wir alles schaffen!
          </p>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto text-center">
          <div className="bg-primary/20 rounded-2xl p-8 md:p-12">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
              Erlebe den wellbe-Effekt
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Entdecke die Kraft unserer Collagen-Drinks und anderer fantastischer Produkte und starte 
              deine Reise zu einem jugendlichen und gesunden Lebensstil. Bei wellbe sind wir immer für 
              dich da und freuen uns, dich auf deinem Weg zu einem unbeschwerten und gesunden Leben zu 
              begleiten.
            </p>
            <p className="text-2xl font-bold text-primary">
              Hole dir mit wellbe deine jugendliche Energie zurück!
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
