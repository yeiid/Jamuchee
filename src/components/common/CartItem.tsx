import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItemProps } from "@/app/lib/types";

const CartItem: React.FC<CartItemProps> = ({ product, handleAddToCart, handleDecreaseQuantity, handleRemoveFromCart }) => (
  <div className="flex items-center border-b py-4">
    <div className="w-20 h-20 rounded-lg overflow-hidden mr-4 bg-gray-100">
      {/* <Image src={product.image} alt={product.name} width={80} height={80} className="object-cover" /> */}
    </div>
    <div className="flex-grow">
      <p className="font-semibold">{product.name}</p>
      <p className="text-sm text-gray-500">${product.price.toFixed(2)} x {product.quantity}</p>
      <div className="flex items-center mt-2">
        <button className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition" onClick={() => handleDecreaseQuantity(product.id)}>
          <Minus size={16} />
        </button>
        <span className="mx-2 font-semibold">{product.quantity}</span>
        <button className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition" onClick={() => handleAddToCart(product.id)}>
          <Plus size={16} />
        </button>
      </div>
    </div>
    <button className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition ml-2" onClick={() => handleRemoveFromCart(product.id)} aria-label="Eliminar del carrito">
      <Trash2 size={20} />
    </button>
  </div>
);

export default CartItem;
