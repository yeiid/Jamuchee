"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ShoppingCart, X, ShoppingBag } from "lucide-react";
import Link from "next/link";
import CartItem from "./CartItem";
import useCartStore, { CartItem as CartItemType } from "@/store/useCartStore";
import { useRouter } from "next/navigation";

const CartComponent: React.FC = () => {
  const router = useRouter();
  const [isCartOpen, setCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Usar directamente el store de Zustand en lugar del contexto
  const items = useCartStore((state) => state.items);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  // Este useEffect asegura que el componente solo se renderice en el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Evita el scroll cuando el carrito está abierto
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  const handleToggleCart = useCallback(() => setCartOpen((prev) => !prev), []);

  const handleAddToCart = useCallback(
    (productId: string) => {
      const item = items.find((item) => item.id === productId);
      if (item) {
        updateQuantity(productId, item.quantity + 1);
      }
    },
    [items, updateQuantity]
  );

  const handleDecreaseQuantity = useCallback(
    (productId: string) => {
      const item = items.find((item) => item.id === productId);
      if (item && item.quantity > 1) {
        updateQuantity(productId, item.quantity - 1);
      } else if (item) {
        removeFromCart(productId);
      }
    },
    [items, updateQuantity, removeFromCart]
  );

  const handleRemoveFromCart = useCallback(
    (productId: string) => {
      removeFromCart(productId);
    },
    [removeFromCart]
  );

  // Redireccionar a la página de checkout
  const goToCheckout = useCallback(() => {
    setCartOpen(false);
    router.push("/checkout");
  }, [router]);

  // Si el componente no está montado, renderiza un placeholder para evitar errores de hidratación
  if (!isMounted) {
    return (
      <button
        className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-full hover:bg-primary-700 transition-colors duration-300 shadow-lg"
        aria-label="Ver carrito"
      >
        <ShoppingCart size={20} />
      </button>
    );
  }

  const productCount = getTotalItems();
  const totalPrice = getTotalPrice().toFixed(2);

  return (
    <>
      <button
        className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-full hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        onClick={handleToggleCart}
        aria-label="Ver carrito"
      >
        <ShoppingCart size={20} />
        {productCount > 0 && (
          <div className="bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold ml-2 animate-bounce">
            {productCount}
          </div>
        )}
      </button>

      {/* Overlay del carrito */}
      <div
        className={`fixed inset-0 z-50 ${
          isCartOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } bg-black bg-opacity-50 transition-all duration-300 backdrop-blur-sm`}
        onClick={handleToggleCart}
      >
        {/* Contenido del carrito */}
        <div
          className={`fixed top-0 right-0 h-full max-w-md w-full bg-white dark:bg-gray-900 shadow-2xl transform transition-all duration-300 ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          } flex flex-col`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white flex justify-between items-center">
            <h2 className="text-2xl font-bold">Carrito de Compras</h2>
            <button
              onClick={handleToggleCart}
              className="hover:text-primary-200 transition-colors duration-200 p-2 rounded-full hover:bg-primary-500"
              aria-label="Cerrar carrito"
            >
              <X size={24} />
            </button>
          </div>

          {/* Lista de productos */}
          <div className="flex-grow overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <ShoppingBag
                  size={64}
                  className="mb-4 text-primary-600 dark:text-primary-400 opacity-50 animate-pulse"
                />
                <p className="text-center text-lg font-medium">
                  Tu carrito está vacío
                </p>
                <p className="text-center text-sm mt-2">
                  ¡Agrega algunos productos maravillosos!
                </p>
                <Link href="/features/products" className="mt-4">
                  <button className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-all duration-300 hover:shadow-lg hover:scale-105">
                    Ver productos
                  </button>
                </Link>
              </div>
            ) : (
              items.map((product: CartItemType) => (
                <CartItem
                  key={product.id}
                  product={product}
                  handleAddToCart={handleAddToCart}
                  handleDecreaseQuantity={handleDecreaseQuantity}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-gradient-to-b from-white to-primary-50 dark:from-gray-900 dark:to-gray-800 border-t border-primary-200 dark:border-gray-700">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-300">
                Subtotal:
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                ${totalPrice}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600 dark:text-gray-300">
                Productos:
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {productCount}
              </span>
            </div>
            <hr className="border-primary-200 dark:border-gray-700 mb-4" />
            <p className="text-xl font-bold text-primary-800 dark:text-primary-400 mb-4">
              Total: ${totalPrice}
            </p>
            <button
              onClick={goToCheckout}
              className="w-full bg-primary-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg flex items-center justify-center"
              disabled={items.length === 0}
            >
              <ShoppingBag size={20} className="mr-2" />
              Finalizar Pedido
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartComponent;
