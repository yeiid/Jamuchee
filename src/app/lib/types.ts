


export interface CartProps {
    isOpen: boolean;
    onClose: () => void;
  }

export interface Product {
    id: string;
    quantity: number;
    price :number
    name:string
    // Add other properties if needed
  }

export  interface CartState {
    cart: Product[];
  }

export  interface Action {
    type: string;
    payload: any;
  }

export  interface Plants {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    forSale?: boolean; // Esta propiedad es opcional
  }
export  interface SpeciesSectionProps {
    title: string;
    species: Plants[];
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