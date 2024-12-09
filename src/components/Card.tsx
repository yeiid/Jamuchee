"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { useCart } from "@/context/Contex";
import { ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react';
import Link from "next/link";
import {Product, CartItemProps} from '@/app/lib/types'

const CartItem: React.FC<CartItemProps> = ({ product, handleAddToCart, handleDecreaseQuantity, handleRemoveFromCart }) => {
  return (
    <div className="flex items-center border-b py-4">
      <div className="w-20 h-20 rounded-lg overflow-hidden mr-4">
        {/* <Image src={product.image} alt={product.name} width={80} height={80} className="object-cover" /> */}
      </div>
      <div className="flex-grow">
        <p className="font-semibold">{product.name}</p>
        <p className="text-sm text-gray-500">${product.price.toFixed(2)} x {product.quantity}</p>
        <div className="flex items-center mt-2">
          <button
            className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors duration-200"
            onClick={() => handleDecreaseQuantity(product.id)}
          >
            <Minus size={16} />
          </button>
          <span className="mx-2 font-semibold">{product.quantity}</span>
          <button
            className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors duration-200"
            onClick={() => handleAddToCart(product.id)}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      <button
        className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200 ml-2"
        onClick={() => handleRemoveFromCart(product.id)}
        aria-label="Eliminar del carrito"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

const CartComponent: React.FC = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const { cart, dispatch } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  const handleToggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  const handleAddToCart = (productId: string) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { id: productId },
    });
  };

  const handleDecreaseQuantity = (productId: string) => {
    dispatch({
      type: "DECREASE_QUANTITY",
      payload: productId,
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: productId,
    });
  };

  // Use useMemo to optimize expensive computations
  const productCount = useMemo(() => cart.reduce(
    (total, product) => total + product.quantity,
    0
  ), [cart]);

  const getTotalPrice = useMemo(() => cart.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  ), [cart]);

  return (
    <>
      <button
        className="flex items-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300 shadow-lg"
        onClick={handleToggleCart}
      >
        <ShoppingCart size={20} />
        {productCount > 0 && (
          <span className="bg-white text-green-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {productCount}
          </span>
        )}
      </button>

      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} bg-black bg-opacity-50`}
      >
        <div
          className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-lg transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}
        >
          <div className="p-4 bg-green-600 text-white flex justify-between items-center">
            <h2 className="text-2xl font-bold">Carrito de Compras</h2>
            <button
              className="text-white hover:text-green-200 transition-colors duration-200"
              onClick={handleToggleCart}
              aria-label="Cerrar carrito"
            >
              <X size={24} />
            </button>
          </div>
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
          <div className="p-4 bg-green-50 border-t border-green-200">
            <p className="text-xl font-bold text-green-800 mb-4">Total: ${getTotalPrice.toFixed(2)}</p>
            <Link href='/ui/products/productDetail/' passHref>
              <button
                className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={cart.length === 0}
              >
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
