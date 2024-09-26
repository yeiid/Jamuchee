"use client";
import React, { useState } from 'react';
import { useCart } from "@/context/Contex";
import { ShoppingCart, Plus, Minus, Trash2, Link } from 'lucide-react';

const CartComponent: React.FC = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const { cart, dispatch } = useCart();

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

  const productCount = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const getTotalPrice = () => {
    return cart.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    );
  };

  const handleBuy = () => {
    if (cart.length === 0) {
      alert("El carrito está vacío");
      return;
    }
  
    const cartDetails = cart.map(
      (item) => `${item.quantity} x ${item.name} - $${item.price * item.quantity}`
    );
    const message = `¡Hola! Estoy interesado en comprar:\n${cartDetails.join(
      "\n"
    )}\nTotal: $${getTotalPrice()}`;
  
    const phoneNumber = "3160457939";
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
  
    window.open(whatsappLink, '_blank');
  };

  return (
    <>
      <button
        className="flex items-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300"
        onClick={handleToggleCart}
      >
        <ShoppingCart size={20} />
        <span>{productCount}</span>
      </button>

      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-lg transform transition-transform translate-x-0 overflow-y-auto">
            <div className="p-4 bg-green-600 text-white">
              <h2 className="text-2xl font-bold">Carrito de Compras</h2>
              <button
                className="absolute top-4 right-4 text-xl cursor-pointer"
                onClick={handleToggleCart}
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 my-4">El carrito está vacío</p>
              ) : (
                <>
                  {cart.map((product) => (
                    <div key={product.id} className="flex justify-between items-center border-b py-4">
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-gray-500">${product.price} x {product.quantity}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
                          onClick={() => handleDecreaseQuantity(product.id)}
                        >
                          <Minus size={16} />
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
                          onClick={() => handleAddToCart(product.id)}
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                          onClick={() => handleRemoveFromCart(product.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4">
                    <p className="text-xl font-bold">Total: ${getTotalPrice()}</p>
                    <button
                      className="mt-4 w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300"
                      >
                    
                    </button>
                    <Link href='/src/app/ui/products/productDetail/page.tsx'/>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartComponent;