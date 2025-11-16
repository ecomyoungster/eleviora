import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Locale = 'de-DE' | 'de-AT';

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
    creatingCheckout: 'Checkout wird erstellt...',
    checkoutWith: 'Zur Kasse',
  },
  'de-AT': {
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
    creatingCheckout: 'Kassa wird erstellt...',
    checkoutWith: 'Zur Kassa',
  },
};

export const useTranslation = () => {
  const locale = useLocaleStore((state) => state.locale);
  return (key: keyof typeof translations['de-DE']) => translations[locale][key];
};
