import { CartDrawer } from "./CartDrawer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useLocaleStore, useTranslation, Locale } from "@/stores/localeStore";
import { FlagIcon } from "@/components/FlagIcon";
import { Logo } from "@/components/Logo";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const { locale, setLocale } = useLocaleStore();
  const t = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  const languages = [
    { code: 'de-DE' as Locale, country: 'DE' as const, name: t('germany'), currency: 'EUR €' },
    { code: 'de-AT' as Locale, country: 'AT' as const, name: t('austria'), currency: 'EUR €' },
    { code: 'en-US' as Locale, country: 'US' as const, name: t('unitedStates'), currency: 'EUR €' },
  ];
  
  const currentLanguage = languages.find(lang => lang.code === locale);

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        section?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      section?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: t('navProduct'), action: () => scrollToSection('product') },
    { label: t('navBenefits'), action: () => scrollToSection('benefits') },
    { label: t('navScience'), action: () => scrollToSection('science') },
    { label: t('navReviews'), action: () => scrollToSection('reviews') },
    { label: t('navFAQ'), action: () => scrollToSection('faq') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="p-6">
                  <div className="space-y-1">
                    <Link
                      to="/"
                      onClick={() => setIsOpen(false)}
                      className="flex w-full items-center justify-between py-3 text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Home
                    </Link>

                    <Link
                      to="/about"
                      onClick={() => setIsOpen(false)}
                      className="flex w-full items-center justify-between py-3 text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t('navAbout')}
                    </Link>

                    {navItems.slice(1).map((item, index) => (
                      <button
                        key={index}
                        onClick={item.action}
                        className="flex w-full items-center justify-between py-3 text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}

                    <Link
                      to="/about"
                      onClick={() => setIsOpen(false)}
                      className="flex w-full items-center justify-between py-3 text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t('navContact')}
                    </Link>

                    <Collapsible open={languageOpen} onOpenChange={setLanguageOpen}>
                      <CollapsibleTrigger className="flex w-full items-center justify-between py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border-t mt-4 pt-4">
                        <div className="flex items-center gap-3">
                          {currentLanguage && (
                            <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center shadow-sm">
                              <FlagIcon country={currentLanguage.country} className="w-7 h-7" />
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <span className="uppercase tracking-wider text-sm font-medium">{currentLanguage?.name}</span>
                            <span className="text-xs text-muted-foreground">• {currentLanguage?.currency}</span>
                          </div>
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${languageOpen ? 'rotate-90' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="space-y-1 pl-4 pt-2">
                          {languages.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => {
                                setLocale(lang.code);
                                setIsOpen(false);
                              }}
                              className="flex w-full items-center justify-between py-3 text-sm hover:bg-muted/50 rounded-md px-3 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center shadow-sm flex-shrink-0">
                                  <FlagIcon country={lang.country} className="w-7 h-7" />
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-foreground">{lang.name}</span>
                                  <span className="text-xs text-muted-foreground">• {lang.currency}</span>
                                </div>
                              </div>
                              {locale === lang.code && (
                                <Check className="h-4 w-4 text-primary" />
                              )}
                            </button>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <div className="hidden lg:flex items-center gap-6">
              <Link
                to="/about"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {t('navAbout')}
              </Link>
              <button
                onClick={() => scrollToSection('benefits')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {t('navBenefits')}
              </button>
              <button
                onClick={() => scrollToSection('science')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {t('navScience')}
              </button>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <Logo size="md" />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <CartDrawer />
          </div>
        </div>
      </div>
    </header>
  );
};
