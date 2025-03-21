import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItemProps } from "@/app/lib/types";
import Image from "next/image";

const CartItem: React.FC<CartItemProps> = ({
  product,
  handleAddToCart,
  handleDecreaseQuantity,
  handleRemoveFromCart,
}) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
    <div className="flex items-center space-x-4">
      <div className="relative w-16 h-16">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg">
        <button
          onClick={() => handleDecreaseQuantity(product.id)}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-l-lg transition-colors duration-200"
          aria-label="Disminuir cantidad"
        >
          <Minus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
        <span className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {product.quantity}
        </span>
        <button
          onClick={() => handleAddToCart(product.id)}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-lg transition-colors duration-200"
          aria-label="Aumentar cantidad"
        >
          <Plus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
      <button
        onClick={() => handleRemoveFromCart(product.id)}
        className="p-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors duration-200"
        aria-label="Eliminar producto"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default CartItem;
