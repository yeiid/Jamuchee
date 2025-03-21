"use client";
import { create } from "zustand";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  category?: string;
  stock?: number;
  rating?: number;
  tags?: string[];
}

interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
  categories: string[];
  selectedCategory: string | null;
  searchQuery: string;
}

interface ProductsActions {
  fetchProducts: () => Promise<void>;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  filterProducts: () => void;
  filterProductsInternal: (
    products: Product[],
    category?: string | null,
    query?: string
  ) => Product[];
}

type ProductsStore = ProductsState & ProductsActions;

const useProductsStore = create<ProductsStore>()((set, get) => ({
  // State
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
  categories: [],
  selectedCategory: null,
  searchQuery: "",

  // Actions
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      // Replace with your actual API call
      const response = await fetch("/api/products");
      const data = await response.json();

      // Extract unique categories
      const categories = Array.from(
        new Set(
          data.map((product: Product) => product.category).filter(Boolean)
        )
      ) as string[];

      set({
        products: data,
        filteredProducts: data,
        categories,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        loading: false,
      });
    }
  },

  addProduct: (product) =>
    set((state) => {
      const newProducts = [...state.products, product];
      return {
        products: newProducts,
        filteredProducts: get().filterProductsInternal(newProducts),
        categories: Array.from(
          new Set(newProducts.map((p) => p.category).filter(Boolean))
        ) as string[],
      };
    }),

  updateProduct: (updatedProduct) =>
    set((state) => {
      const newProducts = state.products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      return {
        products: newProducts,
        filteredProducts: get().filterProductsInternal(newProducts),
        categories: Array.from(
          new Set(newProducts.map((p) => p.category).filter(Boolean))
        ) as string[],
      };
    }),

  deleteProduct: (productId) =>
    set((state) => {
      const newProducts = state.products.filter(
        (product) => product.id !== productId
      );
      return {
        products: newProducts,
        filteredProducts: get().filterProductsInternal(newProducts),
        categories: Array.from(
          new Set(newProducts.map((p) => p.category).filter(Boolean))
        ) as string[],
      };
    }),

  setSelectedCategory: (category) =>
    set((state) => {
      const newState = { ...state, selectedCategory: category };
      return {
        ...newState,
        filteredProducts: get().filterProductsInternal(
          state.products,
          category,
          state.searchQuery
        ),
      };
    }),

  setSearchQuery: (query) =>
    set((state) => {
      const newState = { ...state, searchQuery: query };
      return {
        ...newState,
        filteredProducts: get().filterProductsInternal(
          state.products,
          state.selectedCategory,
          query
        ),
      };
    }),

  getProductById: (id) => {
    return get().products.find((product) => product.id === id);
  },

  getProductsByCategory: (category) => {
    return get().products.filter((product) => product.category === category);
  },

  filterProducts: () => {
    const { products, selectedCategory, searchQuery } = get();
    set({
      filteredProducts: get().filterProductsInternal(
        products,
        selectedCategory,
        searchQuery
      ),
    });
  },

  // Internal helper (not exposed in the interface)
  filterProductsInternal: (
    products: Product[],
    category: string | null = get().selectedCategory,
    query: string = get().searchQuery
  ) => {
    return products
      .filter((product) => !category || product.category === category)
      .filter(
        (product) =>
          !query ||
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
      );
  },
}));

export default useProductsStore;
