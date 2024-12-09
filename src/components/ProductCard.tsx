"use client";

import Image from "next/image";
import { useCart } from "@/context/Contex";
// import products from "@/mook/datos.json";
const products = [

  {
    "id": "1",
    "name": "cactus mammillaria",
    "description": "Descripción del producto 1",
    "price": 10,
    "image": "/1.jpg",
    "forSale": true
  },
  {
    "id": "2",
    "name": "ey sigueme ",
    "description": "Descripción del producto 2",
    "price": 20,
    "image": "/2.jpg",
    "forSale": true
  },
  {
    "id": "3",
    "name": "Producto 1",
    "description": "Descripción del producto 1",
    "price": 10,
    "image": "/3.jpg",
    "forSale": false
  },
  {
    "id": "4",
    "name": "Producto 2",
    "description": "Descripción del producto 2",
    "price": 20,
    "image": "/4.jpg",
    "forSale": false
  },
  {
    "id": "5",
    "name": "Producto 1",
    "description": "Descripción del producto 1",
    "price": 10,
    "image": "/5.jpg",
    "forSale": false
  },
  {
    "id": "6",
    "name": "Producto 2",
    "description": "Descripción del producto 2",
    "price": 20,
    "image": "/5.jpg",
    "forSale": false
  }
]

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
    <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
    {products.map((product) => (
      <div
        key={product.id}
        className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
      >
        <div className="relative h-48">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-4">
          <h2 className="font-bold text-xl mb-2 text-gray-800">{product.name}</h2>
          <p className="text-gray-600 text-sm mb-4">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-blue-600">${product.price.toFixed(2)}</span>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105"
              onClick={() => handleAddToCart(product.id)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    ))}
  </div></>

  );
};

export default ProductCard;
