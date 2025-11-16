import { Header } from "@/components/shop/Header";
import { Hero } from "@/components/shop/Hero";
import { Benefits } from "@/components/shop/Benefits";
import { Products } from "@/components/shop/Products";
import { Testimonials } from "@/components/shop/Testimonials";
import { FAQ } from "@/components/shop/FAQ";
import { Footer } from "@/components/shop/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Benefits />
      <Products />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
