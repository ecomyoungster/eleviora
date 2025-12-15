import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useTranslation } from "@/stores/localeStore";

export const Footer = () => {
  const t = useTranslation();
  
  return (
    <footer className="bg-foreground/5 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <Logo size="md" className="mb-4" />
            <p className="text-muted-foreground">
              {t('footerTagline')}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t('footerLegal')}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">{t('footerImprint')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('footerPrivacy')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('footerRevocation')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('footerShipping')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('footerTerms')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t('footerNewsletter')}</h4>
            <p className="text-muted-foreground mb-4">
              {t('footerNewsletterDesc')}
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder={t('footerEmailPlaceholder')}
                className="bg-background"
              />
              <Button className="bg-primary hover:bg-primary/90">
                {t('footerSubscribe')}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            {t('footerRights')}
          </p>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="text-sm">{t('footerPayment')}</span>
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
