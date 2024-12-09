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

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  forSale?: boolean; // Esta propiedad es opcional
  quantity: number;
}
export interface Specie {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  forSale?: boolean; // Esta propiedad es opcional
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

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export interface CartItemProps {
  product: Product;
  handleAddToCart: (id: string) => void;
  handleDecreaseQuantity: (id: string) => void;
  handleRemoveFromCart: (id: string) => void;
}
