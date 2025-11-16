import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground/5 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4 text-foreground">
              VitalAge
            </h3>
            <p className="text-muted-foreground">
              Premium-Nahrungsergänzung für ein vitales Leben ab 50.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Rechtliches</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Impressum</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Datenschutz</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">AGB</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Widerrufsrecht</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Newsletter</h4>
            <p className="text-muted-foreground mb-4">
              Bleib informiert über neue Angebote und Gesundheitstipps
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Ihre E-Mail" 
                className="bg-background"
              />
              <Button className="bg-primary hover:bg-primary/90">
                Anmelden
              </Button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 VitalAge. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="text-sm">Sichere Zahlung mit:</span>
            <div className="flex gap-2">
              <CreditCard className="w-8 h-8" />
              <span className="text-sm">Visa, Mastercard, PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
