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
    unitedStates: 'Vereinigte Staaten',
    creatingCheckout: 'Kassa wird erstellt...',
    checkoutWith: 'Zur Kassa',
  },
  'en-US': {
    shop: 'SHOP',
    bestsellers: 'BESTSELLERS',
    bundles: 'BUNDLES',
    addToCart: 'Add to Cart',
    shoppingCart: 'Shopping Cart',
    cartEmpty: 'Your cart is empty',
    total: 'Total',
    checkout: 'Checkout',
    itemsInCart: 'Items in your cart',
    language: 'Language & Region',
    germany: 'Germany',
    austria: 'Austria',
    unitedStates: 'United States',
    creatingCheckout: 'Creating checkout...',
    checkoutWith: 'Checkout',
  },
};

export const useTranslation = () => {
  const locale = useLocaleStore((state) => state.locale);
  return (key: keyof typeof translations['de-DE']) => translations[locale][key];
};
