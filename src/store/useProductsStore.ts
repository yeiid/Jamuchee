"use client";
import { create } from 'zustand';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  // Add other product properties
}

interface ProductsStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
}

const useProductsStore = create<ProductsStore>()((set) => ({
  products: [],
  loading: false,
  error: null,
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      // Replace with your actual API call
      const response = await fetch('/api/products');
      const data = await response.json();
      set({ products: data, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred', 
        loading: false 
      });
    }
  },
  addProduct: (product) => set((state) => ({
    products: [...state.products, product]
  })),
  updateProduct: (updatedProduct) => set((state) => ({
    products: state.products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    )
  })),
  deleteProduct: (productId) => set((state) => ({
    products: state.products.filter(product => product.id !== productId)
  })),
}));

export default useProductsStore;
