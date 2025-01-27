"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useCart } from "@/context/Contex";
import { ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import CartItem from "./CartItem";

const CartComponent: React.FC = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const { cart, dispatch } = useCart();

  // Evita el scroll cuando el carrito está abierto
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  const handleToggleCart = useCallback(() => setCartOpen((prev) => !prev), []);

  const handleAddToCart = useCallback((productId: string) => {
    dispatch({ type: "ADD_TO_CART", payload: { id: productId } });
  }, [dispatch]);

  const handleDecreaseQuantity = useCallback((productId: string) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: productId });
  }, [dispatch]);

  const handleRemoveFromCart = useCallback((productId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  }, [dispatch]);

  const productCount = cart.reduce((total, product) => total + product.quantity, 0);
  const totalPrice = cart.reduce((total, product) => total + product.quantity * product.price, 0).toFixed(2);

  return (
    <>
      <button
        className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300 shadow-lg"
        onClick={handleToggleCart}
      >
        <ShoppingCart size={20} />
        {productCount > 0 && (
          <span className="bg-white text-green-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {productCount}
          </span>
        )}
      </button>

      {/* Carrito */}
      <div className={`fixed inset-0 z-50 ${isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} bg-black bg-opacity-50 transition-opacity duration-300`}>
        <div className={`fixed top-0 right-0 h-full max-w-md w-full bg-white shadow-lg transform transition-transform duration-300 ${isCartOpen ? "translate-x-0" : "translate-x-full"} flex flex-col`}>
          {/* Header */}
          <div className="p-4 bg-green-600 text-white flex justify-between items-center">
            <h2 className="text-2xl font-bold">Carrito de Compras</h2>
            <button onClick={handleToggleCart} className="hover:text-green-200 transition-colors duration-200" aria-label="Cerrar carrito">
              <X size={24} />
            </button>
          </div>

          {/* Lista de productos */}
          <div className="flex-grow overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingCart size={64} className="mb-4 text-green-600" />
                <p className="text-center text-lg">Tu carrito está vacío</p>
                <p className="text-center text-sm mt-2">¡Agrega algunos productos maravillosos!</p>
              </div>
            ) : (
              cart.map((product) => (
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
          <div className="p-4 bg-green-50 border-t border-green-200">
            <p className="text-xl font-bold text-green-800 mb-4">Total: ${totalPrice}</p>
            <Link href="/features/products/productDetail/">
              <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed" disabled={cart.length === 0}>
                Finalizar Pedido
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartComponent;
