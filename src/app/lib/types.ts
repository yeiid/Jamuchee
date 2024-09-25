


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