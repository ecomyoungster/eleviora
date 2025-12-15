import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";
import { TrustBar } from "@/components/shop/TrustBar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Leaf, Award, Users } from "lucide-react";
import heroImage from "@/assets/about-woman-collagen.png";
import qualityImage from "@/assets/about-product-lifestyle.png";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TrustBar />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h1 className="font-brand text-4xl md:text-5xl font-semibold text-foreground mb-6">
                Über Eleviora
              </h1>
              <p className="text-xl text-primary font-semibold mb-4">
                Premium Kollagen für ein vitales Leben
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Bei Eleviora haben wir uns einem Ziel verschrieben: Menschen dabei zu unterstützen, 
                sich in ihrer Haut wohlzufühlen – in jedem Alter. Unser Kollagen-Hydrolysat wurde 
                speziell für Ihre Bedürfnisse entwickelt.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img 
                src={heroImage} 
                alt="Eleviora - Premium Kollagen" 
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Werte Section */}
        <section className="max-w-5xl mx-auto mb-20">
          <h2 className="font-brand text-3xl font-semibold text-foreground mb-10 text-center">
            Unsere Werte
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Qualität", desc: "Laborgeprüft und HACCP-zertifiziert" },
              { icon: Leaf, title: "Reinheit", desc: "Ohne Zusatzstoffe oder Füllstoffe" },
              { icon: Award, title: "Transparenz", desc: "Offene Kommunikation über Inhaltsstoffe" },
              { icon: Users, title: "Kundenfokus", desc: "30 Tage Zufriedenheitsgarantie" },
            ].map((value, index) => (
              <div key={index} className="bg-card border rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-brand text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Qualität Section */}
        <section className="max-w-6xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={qualityImage} 
                alt="Höchste Qualitätsstandards" 
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
              />
            </div>
            <div>
              <h2 className="font-brand text-3xl font-semibold text-foreground mb-6">
                Höchste Qualitätsstandards
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Unser Kollagen-Hydrolysat wird nach strengsten Qualitätsstandards hergestellt. 
                Jede Charge durchläuft unabhängige Laborkontrollen auf Reinheit, Schwermetalle 
                und Mikroorganismen.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Wir verzichten bewusst auf Konservierungsstoffe, Füllstoffe und künstliche Aromen – 
                für ein reines Produkt, dem Sie vertrauen können.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto text-center">
          <div className="bg-primary/10 rounded-2xl p-8 md:p-12">
            <h2 className="font-brand text-3xl font-semibold text-foreground mb-4">
              Entdecken Sie Eleviora Kollagen
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Überzeugen Sie sich selbst von der Qualität unseres Premium-Kollagens.
            </p>
            <Link to="/product/kollagen-hydrolysat-pulver">
              <Button size="lg" className="gap-2">
                Jetzt entdecken
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
