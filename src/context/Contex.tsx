"use client";

import { createContext, useContext, ReactNode } from "react";
import useCartStore, { CartItem } from "@/store/useCartStore";

interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isInCart: (itemId: string) => boolean;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const cartStore = useCartStore();

  return (
    <CartContext.Provider
      value={{
        cart: cartStore.items,
        addToCart: cartStore.addToCart,
        removeFromCart: cartStore.removeFromCart,
        clearCart: cartStore.clearCart,
        updateQuantity: cartStore.updateQuantity,
        getTotalItems: cartStore.getTotalItems,
        getTotalPrice: cartStore.getTotalPrice,
        isInCart: cartStore.isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
