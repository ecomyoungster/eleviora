import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, createStorefrontCheckout } from '@/lib/shopify';
import { useLocaleStore } from './localeStore';

const normalizeCartItem = (item: CartItem): CartItem => {
  // Migration: product was changed from "500g" powder to "180 Kapseln".
  if (item?.product?.node?.handle !== 'kollagen-hydrolysat-pulver') return item;

  return {
    ...item,
    variantTitle: item.variantTitle?.includes('500g')
      ? item.variantTitle.replace('500g', '180 Kapseln')
      : item.variantTitle,
    selectedOptions: (item.selectedOptions || []).map((opt) =>
      opt.value === '500g' ? { ...opt, value: '180 Kapseln' } : opt
    ),
  };
};

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  
  addItem: (item: CartItem) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  setCartId: (cartId: string) => void;
  setCheckoutUrl: (url: string) => void;
  setLoading: (loading: boolean) => void;
  createCheckout: () => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,

      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find(i => i.variantId === item.variantId);
        
        if (existingItem) {
          set({
            items: items.map(i =>
              i.variantId === item.variantId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          });
        } else {
          set({ items: [...items, item] });
        }
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.variantId === variantId ? { ...item, quantity } : item
          )
        });
      },

      removeItem: (variantId) => {
        set({
          items: get().items.filter(item => item.variantId !== variantId)
        });
      },

      clearCart: () => {
        set({ items: [], cartId: null, checkoutUrl: null });
      },

      setCartId: (cartId) => set({ cartId }),
      setCheckoutUrl: (checkoutUrl) => set({ checkoutUrl }),
      setLoading: (isLoading) => set({ isLoading }),

      createCheckout: async () => {
        const { items, setLoading, setCheckoutUrl } = get();
        if (items.length === 0) return;

        setLoading(true);
        try {
          const locale = useLocaleStore.getState().locale;
          const checkoutUrl = await createStorefrontCheckout(items, locale);
          setCheckoutUrl(checkoutUrl);
        } catch (error) {
          if (import.meta.env.DEV) {
            console.error('Failed to create checkout:', error);
          }
        } finally {
          setLoading(false);
        }
      }
    }),
    {
      name: 'shopify-cart',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState) => {
        if (!persistedState || typeof persistedState !== 'object') return persistedState;
        const state = persistedState as { items?: CartItem[] };
        if (!Array.isArray(state.items) || state.items.length === 0) return persistedState;
        return {
          ...state,
          items: state.items.map(normalizeCartItem),
        };
      },
    }
  )
);
