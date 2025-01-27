"use client";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  updateQuantity: (itemId: string, quantity: number) => void;
}

const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (item) => set((state) => {
        const existingItem = state.items.find(i => i.id === item.id);
        if (existingItem) {
          return {
            items: state.items.map(i => 
              i.id === item.id 
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          };
        }
        return { items: [...state.items, item] };
      }),
      removeFromCart: (itemId) => set((state) => ({
        items: state.items.filter(item => item.id !== itemId)
      })),
      clearCart: () => set({ items: [] }),
      updateQuantity: (itemId, quantity) => set((state) => ({
        items: state.items.map(item => 
          item.id === itemId ? { ...item, quantity } : item
        )
      })),
    }),
    {
      name: 'cart-storage', // unique name
      // Optional: customize storage (localStorage by default)
    }
  )
);

export default useCartStore;
