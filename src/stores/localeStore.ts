import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Locale = 'de-DE' | 'de-AT' | 'en-US';

interface LocaleStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleStore>()(
  persist(
    (set) => ({
      locale: 'de-DE',
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: 'vitalage-locale',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const translations = {
  'de-DE': {
    // Navigation
    navAbout: 'Über uns',
    navProduct: 'Produkt',
    navBenefits: 'Vorteile',
    navScience: 'Wissenschaft',
    navReviews: 'Bewertungen',
    navFAQ: 'FAQ',
    navContact: 'Kontakt',
    
    // General
    shop: 'SHOP',
    bestsellers: 'BESTSELLERS',
    bundles: 'BUNDLES',
    addToCart: 'In den Warenkorb',
    shoppingCart: 'Warenkorb',
    cartEmpty: 'Ihr Warenkorb ist leer',
    total: 'Gesamt',
    checkout: 'Zur Kasse',
    itemsInCart: 'Artikel in Ihrem Warenkorb',
    language: 'Sprache & Region',
    germany: 'Deutschland',
    austria: 'Österreich',
    unitedStates: 'Vereinigte Staaten',
    creatingCheckout: 'Checkout wird erstellt...',
    checkoutWith: 'Zur Kasse',
    
    // Hero
    heroTitle: 'Reine Wirkstoffe.<br />Präzise Formulierung.<br />Geprüfte Qualität.',
    heroSubtitle: 'Premium Kollagen-Hydrolysat – entwickelt für Ihre Bedürfnisse.',
    heroButton: 'Jetzt entdecken',
    learnMore: 'Mehr erfahren',
    
    // Benefits
    benefit1Title: 'Straffere Haut',
    benefit1Desc: 'Unterstützt die natürliche Elastizität und Festigkeit Ihrer Haut',
    benefit2Title: 'Flexible Gelenke',
    benefit2Desc: 'Fördert Beweglichkeit und mindert Gelenkbeschwerden',
    benefit3Title: 'Mehr Vitalität',
    benefit3Desc: 'Für ein aktives Leben voller Energie und Wohlbefinden',
    
    // Product Showcase
    premiumQuality: 'Premium Qualität',
    shopNow: 'Jetzt kaufen',
    freeShippingFrom: 'Gratis Versand ab 49€',
    returnPolicy: '30 Tage Rückgabe',
    
    // Science Section
    scienceTitle: 'Die Wissenschaft hinter Kollagen',
    scienceSubtitle: 'Kollagen ist das am häufigsten vorkommende Protein in unserem Körper und spielt eine entscheidende Rolle für Haut, Haare, Nägel und Gelenke.',
    scienceFact1Title: 'Hohe Bioverfügbarkeit',
    scienceFact1Desc: 'Unser hydrolysiertes Kollagen wird durch ein spezielles Verfahren in kleine Peptide zerlegt, die der Körper optimal aufnehmen kann.',
    scienceFact2Title: 'Laborgeprüfte Qualität',
    scienceFact2Desc: 'Jede Charge wird von unabhängigen Laboren auf Reinheit, Schwermetalle und Mikroorganismen getestet.',
    scienceFact3Title: 'Ohne Zusatzstoffe',
    scienceFact3Desc: 'Reines Kollagen-Hydrolysat ohne Konservierungsstoffe, Füllstoffe oder künstliche Aromen.',
    scienceFact4Title: 'HACCP Zertifiziert',
    scienceFact4Desc: 'Hergestellt nach höchsten Qualitätsstandards mit lückenloser Rückverfolgbarkeit.',
    
    // FAQ
    faqTitle: 'Häufig gestellte Fragen',
    faqSubtitle: 'Alles, was Sie über unser Kollagen wissen müssen',
    faq1Q: 'Wie lange dauert es, bis ich Ergebnisse sehe?',
    faq1A: 'Die meisten Kunden berichten von ersten spürbaren Verbesserungen nach 2-3 Wochen regelmäßiger Einnahme. Für optimale Ergebnisse empfehlen wir eine Anwendung über mindestens 8-12 Wochen.',
    faq2Q: 'Wie nehme ich das Kollagen ein?',
    faq2A: 'Lösen Sie täglich 10g (ca. 1 Messlöffel) in Wasser, Saft, Kaffee oder Smoothie auf. Das Pulver löst sich schnell auf und ist geschmacksneutral.',
    faq3Q: 'Woher stammt das Kollagen?',
    faq3A: 'Unser Kollagen wird aus nachhaltiger Rinderhaltung gewonnen und nach höchsten Qualitätsstandards verarbeitet.',
    faq4Q: 'Gibt es Nebenwirkungen?',
    faq4A: 'Unser Kollagen ist gut verträglich und besteht aus natürlichen Inhaltsstoffen. Bei bekannten Allergien empfehlen wir, vor der Einnahme Ihren Arzt zu konsultieren.',
    faq5Q: 'Kann ich jederzeit kündigen?',
    faq5A: 'Ja, bei unseren Abo-Optionen können Sie jederzeit flexibel kündigen. Es gibt keine Mindestlaufzeit.',
    
    // Testimonials
    testimonialsTitle: 'Was unsere Kunden sagen',
    testimonialsDesc: 'Echte Erfahrungen von zufriedenen Kunden',
    years: 'Jahre',
    
    // Footer
    footerTagline: 'Premium Kollagen für ein vitales Leben.',
    footerLegal: 'Rechtliches',
    footerImprint: 'Impressum',
    footerPrivacy: 'Datenschutzerklärung',
    footerRevocation: 'Widerrufsbelehrung',
    footerShipping: 'Versand',
    footerTerms: 'AGB',
    footerNewsletter: 'Newsletter',
    footerNewsletterDesc: 'Erhalten Sie Gesundheitstipps und exklusive Angebote',
    footerEmailPlaceholder: 'Ihre E-Mail',
    footerSubscribe: 'Anmelden',
    footerRights: '© 2024 Eleviora. Alle Rechte vorbehalten.',
    footerPayment: 'Sichere Zahlung mit:',
    
    // Trust & Shipping
    freeShipping: 'Kostenloser Versand',
    freeShippingDesc: 'Deine Bestellung wird kostenlos versendet',
    freeShippingRemaining: 'Noch €{amount} bis zum kostenlosen Versand',
    savings: 'Du sparst €{amount}',
    savingsDesc: 'Durch Mengenrabatte',
    trustReturn: '30 Tage Rückgaberecht',
    trustShipping: 'Kostenloser Versand ab 49€',
    trustPayLater: 'Bezahle in 30 Tagen',
    
    // Product Page
    productNotFound: 'Produkt nicht gefunden',
    backToHome: 'Zurück zur Startseite',
    noImage: 'Kein Bild verfügbar',
    moreInfo: 'Mehr Informationen',
    ingredients: 'Inhaltsstoffe & Anwendung',
    addedToCart: '{quantity} Stück zum Warenkorb hinzugefügt',
    selectQuantity: 'Menge auswählen:',
    pieces: 'Stück',
    save: 'Spare {discount}%',
    wasSaved: 'Du sparst',
    mostPopular: 'Beliebteste',
    forOneMonth: 'für einen Monat',
    forThreeMonths: 'für 3 Monate',
    forSixMonths: 'für 6 Monate',
    
    // Legacy (keep for compatibility)
    searchPlaceholder: 'Produkte durchsuchen...',
    noProductsFound: 'Keine Produkte gefunden',
    bestsellersTitle: 'Bestsellers',
    bestsellersDesc: 'Unsere beliebtesten Produkte für Ihre Gesundheit',
    bundlesTitle: 'Bundles',
    bundlesDesc: 'Sparen Sie mit unseren Produkt-Kombinationen',
    productsTitle: 'Unsere Premium-Produkte',
    productsDesc: 'Hochwertige Nahrungsergänzung für mehr Wohlbefinden',
    noProducts: 'Noch keine Produkte verfügbar',
    noProductsDesc: 'Bitte erstellen Sie Produkte, indem Sie im Chat beschreiben, was Sie anbieten möchten.',
  },
  'de-AT': {
    // Navigation
    navAbout: 'Über uns',
    navProduct: 'Produkt',
    navBenefits: 'Vorteile',
    navScience: 'Wissenschaft',
    navReviews: 'Bewertungen',
    navFAQ: 'FAQ',
    navContact: 'Kontakt',
    
    // General
    shop: 'SHOP',
    bestsellers: 'BESTSELLERS',
    bundles: 'BUNDLES',
    addToCart: 'In den Warenkorb',
    shoppingCart: 'Warenkorb',
    cartEmpty: 'Ihr Warenkorb ist leer',
    total: 'Summe',
    checkout: 'Zur Kassa',
    itemsInCart: 'Artikel in Ihrem Warenkorb',
    language: 'Sprache & Region',
    germany: 'Deutschland',
    austria: 'Österreich',
    unitedStates: 'Vereinigte Staaten',
    creatingCheckout: 'Kassa wird erstellt...',
    checkoutWith: 'Zur Kassa',
    
    // Hero
    heroTitle: 'Reine Wirkstoffe.<br />Präzise Formulierung.<br />Geprüfte Qualität.',
    heroSubtitle: 'Premium Kollagen-Hydrolysat – entwickelt für Ihre Bedürfnisse.',
    heroButton: 'Jetzt entdecken',
    learnMore: 'Mehr erfahren',
    
    // Benefits
    benefit1Title: 'Straffere Haut',
    benefit1Desc: 'Unterstützt die natürliche Elastizität und Festigkeit Ihrer Haut',
    benefit2Title: 'Flexible Gelenke',
    benefit2Desc: 'Fördert Beweglichkeit und mindert Gelenkbeschwerden',
    benefit3Title: 'Mehr Vitalität',
    benefit3Desc: 'Für ein aktives Leben voller Energie und Wohlbefinden',
    
    // Product Showcase
    premiumQuality: 'Premium Qualität',
    shopNow: 'Jetzt kaufen',
    freeShippingFrom: 'Gratis Versand ab 49€',
    returnPolicy: '30 Tage Rückgabe',
    
    // Science Section
    scienceTitle: 'Die Wissenschaft hinter Kollagen',
    scienceSubtitle: 'Kollagen ist das am häufigsten vorkommende Protein in unserem Körper und spielt eine entscheidende Rolle für Haut, Haare, Nägel und Gelenke.',
    scienceFact1Title: 'Hohe Bioverfügbarkeit',
    scienceFact1Desc: 'Unser hydrolysiertes Kollagen wird durch ein spezielles Verfahren in kleine Peptide zerlegt, die der Körper optimal aufnehmen kann.',
    scienceFact2Title: 'Laborgeprüfte Qualität',
    scienceFact2Desc: 'Jede Charge wird von unabhängigen Laboren auf Reinheit, Schwermetalle und Mikroorganismen getestet.',
    scienceFact3Title: 'Ohne Zusatzstoffe',
    scienceFact3Desc: 'Reines Kollagen-Hydrolysat ohne Konservierungsstoffe, Füllstoffe oder künstliche Aromen.',
    scienceFact4Title: 'HACCP Zertifiziert',
    scienceFact4Desc: 'Hergestellt nach höchsten Qualitätsstandards mit lückenloser Rückverfolgbarkeit.',
    
    // FAQ
    faqTitle: 'Häufig gestellte Fragen',
    faqSubtitle: 'Alles, was Sie über unser Kollagen wissen müssen',
    faq1Q: 'Wie lange dauert es, bis ich Ergebnisse sehe?',
    faq1A: 'Die meisten Kunden berichten von ersten spürbaren Verbesserungen nach 2-3 Wochen regelmäßiger Einnahme. Für optimale Ergebnisse empfehlen wir eine Anwendung über mindestens 8-12 Wochen.',
    faq2Q: 'Wie nehme ich das Kollagen ein?',
    faq2A: 'Lösen Sie täglich 10g (ca. 1 Messlöffel) in Wasser, Saft, Kaffee oder Smoothie auf. Das Pulver löst sich schnell auf und ist geschmacksneutral.',
    faq3Q: 'Woher stammt das Kollagen?',
    faq3A: 'Unser Kollagen wird aus nachhaltiger Rinderhaltung gewonnen und nach höchsten Qualitätsstandards verarbeitet.',
    faq4Q: 'Gibt es Nebenwirkungen?',
    faq4A: 'Unser Kollagen ist gut verträglich und besteht aus natürlichen Inhaltsstoffen. Bei bekannten Allergien empfehlen wir, vor der Einnahme Ihren Arzt zu konsultieren.',
    faq5Q: 'Kann ich jederzeit kündigen?',
    faq5A: 'Ja, bei unseren Abo-Optionen können Sie jederzeit flexibel kündigen. Es gibt keine Mindestlaufzeit.',
    
    // Testimonials
    testimonialsTitle: 'Was unsere Kunden sagen',
    testimonialsDesc: 'Echte Erfahrungen von zufriedenen Kunden',
    years: 'Jahre',
    
    // Footer
    footerTagline: 'Premium Kollagen für ein vitales Leben.',
    footerLegal: 'Rechtliches',
    footerImprint: 'Impressum',
    footerPrivacy: 'Datenschutzerklärung',
    footerRevocation: 'Widerrufsbelehrung',
    footerShipping: 'Versand',
    footerTerms: 'AGB',
    footerNewsletter: 'Newsletter',
    footerNewsletterDesc: 'Erhalten Sie Gesundheitstipps und exklusive Angebote',
    footerEmailPlaceholder: 'Ihre E-Mail',
    footerSubscribe: 'Anmelden',
    footerRights: '© 2024 Eleviora. Alle Rechte vorbehalten.',
    footerPayment: 'Sichere Zahlung mit:',
    
    // Trust & Shipping
    freeShipping: 'Kostenloser Versand',
    freeShippingDesc: 'Deine Bestellung wird kostenlos versendet',
    freeShippingRemaining: 'Noch €{amount} bis zum kostenlosen Versand',
    savings: 'Du sparst €{amount}',
    savingsDesc: 'Durch Mengenrabatte',
    trustReturn: '30 Tage Rückgaberecht',
    trustShipping: 'Kostenloser Versand ab 49€',
    trustPayLater: 'Bezahle in 30 Tagen',
    
    // Product Page
    productNotFound: 'Produkt nicht gefunden',
    backToHome: 'Zurück zur Startseite',
    noImage: 'Kein Bild verfügbar',
    moreInfo: 'Mehr Informationen',
    ingredients: 'Inhaltsstoffe & Anwendung',
    addedToCart: '{quantity} Stück zum Warenkorb hinzugefügt',
    selectQuantity: 'Menge auswählen:',
    pieces: 'Stück',
    save: 'Spare {discount}%',
    wasSaved: 'Du sparst',
    mostPopular: 'Beliebteste',
    forOneMonth: 'für einen Monat',
    forThreeMonths: 'für 3 Monate',
    forSixMonths: 'für 6 Monate',
    
    // Legacy
    searchPlaceholder: 'Produkte durchsuchen...',
    noProductsFound: 'Keine Produkte gefunden',
    bestsellersTitle: 'Bestsellers',
    bestsellersDesc: 'Unsere beliebtesten Produkte für Ihre Gesundheit',
    bundlesTitle: 'Bundles',
    bundlesDesc: 'Sparen Sie mit unseren Produkt-Kombinationen',
    productsTitle: 'Unsere Premium-Produkte',
    productsDesc: 'Hochwertige Nahrungsergänzung für mehr Wohlbefinden',
    noProducts: 'Noch keine Produkte verfügbar',
    noProductsDesc: 'Bitte erstellen Sie Produkte, indem Sie im Chat beschreiben, was Sie anbieten möchten.',
  },
  'en-US': {
    // Navigation
    navAbout: 'About Us',
    navProduct: 'Product',
    navBenefits: 'Benefits',
    navScience: 'Science',
    navReviews: 'Reviews',
    navFAQ: 'FAQ',
    navContact: 'Contact',
    
    // General
    shop: 'SHOP',
    bestsellers: 'BESTSELLERS',
    bundles: 'BUNDLES',
    addToCart: 'Add to Cart',
    shoppingCart: 'Shopping Cart',
    cartEmpty: 'Your cart is empty',
    total: 'Total',
    checkout: 'Checkout',
    itemsInCart: 'items in your cart',
    language: 'Language & Region',
    germany: 'Germany',
    austria: 'Austria',
    unitedStates: 'United States',
    creatingCheckout: 'Creating checkout...',
    checkoutWith: 'Checkout',
    
    // Hero
    heroTitle: 'Pure Ingredients.<br />Precise Formulation.<br />Tested Quality.',
    heroSubtitle: 'Premium collagen hydrolysate – developed for your needs.',
    heroButton: 'Discover Now',
    learnMore: 'Learn More',
    
    // Benefits
    benefit1Title: 'Firmer Skin',
    benefit1Desc: 'Supports the natural elasticity and firmness of your skin',
    benefit2Title: 'Flexible Joints',
    benefit2Desc: 'Promotes mobility and reduces joint discomfort',
    benefit3Title: 'More Vitality',
    benefit3Desc: 'For an active life full of energy and well-being',
    
    // Product Showcase
    premiumQuality: 'Premium Quality',
    shopNow: 'Shop Now',
    freeShippingFrom: 'Free Shipping over €49',
    returnPolicy: '30-Day Returns',
    
    // Science Section
    scienceTitle: 'The Science Behind Collagen',
    scienceSubtitle: 'Collagen is the most abundant protein in our body and plays a crucial role for skin, hair, nails, and joints.',
    scienceFact1Title: 'High Bioavailability',
    scienceFact1Desc: 'Our hydrolyzed collagen is broken down into small peptides through a special process, allowing optimal absorption by the body.',
    scienceFact2Title: 'Laboratory Tested Quality',
    scienceFact2Desc: 'Each batch is tested by independent laboratories for purity, heavy metals, and microorganisms.',
    scienceFact3Title: 'No Additives',
    scienceFact3Desc: 'Pure collagen hydrolysate without preservatives, fillers, or artificial flavors.',
    scienceFact4Title: 'HACCP Certified',
    scienceFact4Desc: 'Manufactured according to the highest quality standards with complete traceability.',
    
    // FAQ
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Everything you need to know about our collagen',
    faq1Q: 'How long does it take to see results?',
    faq1A: 'Most customers report noticeable improvements after 2-3 weeks of regular use. For optimal results, we recommend use for at least 8-12 weeks.',
    faq2Q: 'How do I take the collagen?',
    faq2A: 'Dissolve 10g (about 1 scoop) daily in water, juice, coffee, or a smoothie. The powder dissolves quickly and is tasteless.',
    faq3Q: 'Where does the collagen come from?',
    faq3A: 'Our collagen is sourced from sustainable cattle farming and processed according to the highest quality standards.',
    faq4Q: 'Are there any side effects?',
    faq4A: 'Our collagen is well tolerated and consists of natural ingredients. If you have known allergies, we recommend consulting your doctor before use.',
    faq5Q: 'Can I cancel anytime?',
    faq5A: 'Yes, with our subscription options you can cancel flexibly at any time. There is no minimum term.',
    
    // Testimonials
    testimonialsTitle: 'What Our Customers Say',
    testimonialsDesc: 'Real experiences from satisfied customers',
    years: 'years',
    
    // Footer
    footerTagline: 'Premium collagen for a vital life.',
    footerLegal: 'Legal',
    footerImprint: 'Imprint',
    footerPrivacy: 'Privacy Policy',
    footerRevocation: 'Right of Withdrawal',
    footerShipping: 'Shipping',
    footerTerms: 'Terms & Conditions',
    footerNewsletter: 'Newsletter',
    footerNewsletterDesc: 'Receive health tips and exclusive offers',
    footerEmailPlaceholder: 'Your email',
    footerSubscribe: 'Subscribe',
    footerRights: '© 2024 Eleviora. All rights reserved.',
    footerPayment: 'Secure payment with:',
    
    // Trust & Shipping
    freeShipping: 'Free Shipping',
    freeShippingDesc: 'Your order will be shipped free of charge',
    freeShippingRemaining: '€{amount} more for free shipping',
    savings: 'You save €{amount}',
    savingsDesc: 'Through quantity discounts',
    trustReturn: '30-Day Return Policy',
    trustShipping: 'Free Shipping over €49',
    trustPayLater: 'Pay in 30 Days',
    
    // Product Page
    productNotFound: 'Product not found',
    backToHome: 'Back to Home',
    noImage: 'No image available',
    moreInfo: 'More Information',
    ingredients: 'Ingredients & Application',
    addedToCart: '{quantity} item(s) added to cart',
    selectQuantity: 'Select quantity:',
    pieces: 'pieces',
    save: 'Save {discount}%',
    wasSaved: 'You save',
    mostPopular: 'Most Popular',
    forOneMonth: 'for one month',
    forThreeMonths: 'for 3 months',
    forSixMonths: 'for 6 months',
    
    // Legacy
    searchPlaceholder: 'Search products...',
    noProductsFound: 'No products found',
    bestsellersTitle: 'Bestsellers',
    bestsellersDesc: 'Our most popular products for your health',
    bundlesTitle: 'Bundles',
    bundlesDesc: 'Save with our product combinations',
    productsTitle: 'Our Premium Products',
    productsDesc: 'High-quality nutritional supplements for more well-being',
    noProducts: 'No products available yet',
    noProductsDesc: 'Please create products by describing what you would like to offer in the chat.',
  },
};

export const useTranslation = () => {
  const locale = useLocaleStore((state) => state.locale);
  return (key: keyof typeof translations['de-DE']) => translations[locale][key];
};
