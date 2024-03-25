"use client"
import  { useState } from 'react';
import Cart from './Cart';
import { useCart } from '@/context/Contex';



const Card: React.FC = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const {cart} = useCart()
  const productCount = cart.reduce((total, product) => total + product.quantity, 0);

  const handleToggleCart = () => {
    setCartOpen(!isCartOpen);
  };
  return (
<>
      <div className=" flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
        <button className="mt-2 bg-gray-700 text-white px-4 py-2 rounded" onClick={handleToggleCart}>🛒cart {productCount}</button>
      </div>
      <Cart isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
</>  );
};

export default Card;
