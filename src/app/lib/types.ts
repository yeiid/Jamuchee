import { Product } from "@/store/useProductsStore";
import { CartItem as StoreCartItem } from "@/store/useCartStore";

// Re-exportamos CartItem para usar en este módulo
export type CartItem = StoreCartItem;

export interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

export interface CartState {
  cart: Product[];
}

export interface Action {
  type: string;
  payload: any;
}

export interface Specie {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  forSale?: boolean;
  care: string;
}

export interface SpeciesSection {
  title: string;
  species: Specie[];
}

export type Plant = {
  id: string;
  name: string;
  price: number;
};

export type Pot = {
  id: string;
  color: string;
  price: number;
};

export type OrderItem = {
  id: string;
  plant: Plant;
  pot: Pot;
  quantity: number;
};

export interface CartItemProps {
  product: CartItem;
  handleAddToCart: (id: string) => void;
  handleDecreaseQuantity: (id: string) => void;
  handleRemoveFromCart: (id: string) => void;
}

export interface CustomerData {
  name: string;
  phone: string;
  address: string;
}

export interface CustomOrder {
  description: string;
  quantity: string;
  budget: string;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: string;
  shippingMethod: string;
  notes?: string;
}

export interface CheckoutData {
  customer: CustomerData;
  items: CartItem[];
  order: OrderSummary;
}

export interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}
