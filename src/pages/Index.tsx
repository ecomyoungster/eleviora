import { Header } from "@/components/shop/Header";
import { Hero } from "@/components/shop/Hero";
import { PainPoints } from "@/components/shop/PainPoints";
import { Steps } from "@/components/shop/Steps";
import { Benefits } from "@/components/shop/Benefits";
import { ProductShowcase } from "@/components/shop/ProductShowcase";
import { Science } from "@/components/shop/Science";
import { Testimonials } from "@/components/shop/Testimonials";
import { FAQ } from "@/components/shop/FAQ";
import { Footer } from "@/components/shop/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <PainPoints />
      <Steps />
      <Benefits />
      <ProductShowcase />
      <Testimonials />
      <Science />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
