"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/context/Contex";
import products from '@/mook/datos.json'

// interface ProductData {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
// }



const ProductCard: React.FC = () => {
  const { dispatch } = useCart();

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          id: product.id,
          name: product.name,
          price: product.price /* otras propiedades del producto */,
        },
      });
    }
  };

  return (
    <div className="flex flex-wrap m-4 ">
      { products.map((product) => (
        <div
          key={product.id}
          className="max-w-sm rounded overflow-hidden shadow-lg m-4"
        >
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{product.name}</div>
            <p className="text-gray-700 text-base">{product.description}</p>
            <p className="mt-2">${product.price}</p>
          </div>
          <button className="mt-4 bg-gray-700 text-white px-4 py-2 rounded"  onClick={() => handleAddToCart(product.id)}>
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
