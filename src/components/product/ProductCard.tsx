"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import useCartStore from "@/store/useCartStore";
import { products } from "@/app/lib/product";

const ProductCard: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const isInCart = useCartStore((state) => state.isInCart);

  // Este useEffect asegura que el componente solo se renderice completamente en el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover transition-transform duration-300 hover:scale-110"
              priority
            />
          </div>
          <div className="p-4">
            <h2 className="font-bold text-xl mb-2 text-gray-800 dark:text-white">
              {product.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {product.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                ${product.price.toFixed(2)}
              </span>
              <button
                className={`${
                  isMounted && isInCart(product.id)
                    ? "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                    : "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500"
                } text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-md`}
                onClick={() => handleAddToCart(product.id)}
              >
                {isMounted && isInCart(product.id)
                  ? "Añadido"
                  : "Añadir al carrito"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
