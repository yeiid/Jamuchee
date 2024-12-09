import { create } from 'zustand';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  forSale: boolean;
}

interface ProductsStore {
  products: Product[];
  addProduct: (product: Product) => void;
  editProduct: (id: string, updatedProduct: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

export const useProductsStore = create<ProductsStore>((set) => ({
  products: [
    {
      id: '1',
      name: 'Cactus Mammillaria',
      description: 'Cactus pequeño con flores en corona.',
      price: 10,
      image: '/1.jpg',
      forSale: true,
    },
  ],
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
  editProduct: (id, updatedProduct) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...updatedProduct } : p
      ),
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
}));
