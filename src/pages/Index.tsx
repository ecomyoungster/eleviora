import { Header } from "@/components/shop/Header";
import { TrustBar } from "@/components/shop/TrustBar";
import { Hero } from "@/components/shop/Hero";
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
      <TrustBar />
      <Hero />
      <Benefits />
      <ProductShowcase />
      <Science />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
