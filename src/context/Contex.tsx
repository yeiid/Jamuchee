"use client";

import { createContext, useReducer, useContext } from "react";
import {Product,CartState,Action} from "@/app/lib/types"


const CartContext = createContext<{ cart: Product[]; dispatch: React.Dispatch<Action> } | undefined>(undefined);

const cartReducer = (state: CartState, action: Action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingProduct = state.cart.find((item: Product) => item.id === action.payload.id);

      if (existingProduct) {
        // Si el producto ya está en el carrito, incrementa la cantidad
        return { cart: state.cart.map((item: Product) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        )};
      } else {
        // Si el producto no está en el carrito, agrégalo con cantidad 1
        return { cart: [...state.cart, { ...action.payload, quantity: 1 }] };
      }
    case "REMOVE_FROM_CART":
      return { cart: state.cart.filter((item: Product) => item.id !== action.payload) };
    case "INCREASE_QUANTITY":
      return { cart: state.cart.map((item: Product) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )};
    case "DECREASE_QUANTITY":
      return { cart: state.cart.map((item: Product) =>
        item.id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )};
    default:
      return state;
  }
};

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, { cart: [] });

  return (
    <CartContext.Provider value={{ cart: cart.cart, dispatch }}>
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
