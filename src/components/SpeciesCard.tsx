"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Info, ShoppingBag } from "lucide-react";
import { Specie, SpeciesSection } from "@/app/lib/types";
import useCartStore from "@/store/useCartStore";

// Este array debería venir de useProductsStore o una API en un caso real
const cart: Specie[] = [
  {
    id: "1",
    name: "Cactus Mammillaria",
    description:
      "Cactus globular pequeño con espinas blancas y flores en corona.",
    price: 10,
    image: "/1.jpg",
    forSale: true,
    care: "Luz solar directa, riego escaso, sustrato bien drenado.",
  },
  {
    id: "2",
    name: "Echeveria Elegans",
    description:
      "Suculenta con rosetas de hojas carnosas de color azul-grisáceo.",
    price: 20,
    image: "/2.jpg",
    forSale: true,
    care: "Luz brillante indirecta, riego moderado, sustrato para suculentas.",
  },
  {
    id: "3",
    name: "Aloe Vera",
    description: "Suculenta medicinal con hojas gruesas y gel curativo.",
    price: 15,
    image: "/3.jpg",
    forSale: false,
    care: "Luz solar parcial, riego profundo pero infrecuente.",
  },
  {
    id: "4",
    name: "Sedum Morganianum",
    description: "Suculenta colgante conocida como 'cola de burro'.",
    price: 18,
    image: "/4.jpg",
    forSale: false,
    care: "Luz brillante, riego cuando el sustrato esté seco.",
  },
  {
    id: "5",
    name: "Opuntia Microdasys",
    description: "Cactus de pala con pequeñas espinas doradas.",
    price: 25,
    image: "/5.jpg",
    forSale: false,
    care: "Luz solar plena, riego mínimo, sustrato arenoso.",
  },
  {
    id: "6",
    name: "Haworthia Fasciata",
    description: "Suculenta pequeña con hojas rayadas en forma de roseta.",
    price: 12,
    image: "/5.jpg",
    forSale: false,
    care: "Luz indirecta, riego moderado, sustrato bien drenado.",
  },
];

const IntroSection: React.FC = () => (
  <div className="bg-primary-50 p-6 rounded-lg mb-8 shadow-md">
    <h2 className="text-2xl font-bold text-primary-800 mb-4">
      Bienvenido al Mundo de los Cactus y Suculentas
    </h2>
    <p className="text-gray-700 mb-4">
      Descubre la belleza y diversidad de nuestras especies de cactus y
      suculentas. Cada planta tiene características únicas y necesidades
      específicas de cuidado. Explora nuestra colección para encontrar la planta
      perfecta para tu hogar o jardín.
    </p>
    <div className="bg-white p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-primary-700 mb-2">
        Consejos Generales de Cuidado:
      </h3>
      <ul className="list-disc list-inside text-gray-600">
        <li>Proporciona luz adecuada según la especie</li>
        <li>Riega con moderación, evitando el exceso de agua</li>
        <li>
          Usa un sustrato bien drenado específico para cactus y suculentas
        </li>
        <li>Protege las plantas de temperaturas extremas</li>
        <li>Fertiliza ocasionalmente durante la temporada de crecimiento</li>
      </ul>
    </div>
  </div>
);

const Species: React.FC<SpeciesSection> = ({ title, species }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<Specie | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const isInCart = useCartStore((state) => state.isInCart);

  // Este useEffect asegura que el componente solo se renderice completamente en el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddToCart = (plant: Specie) => {
    addToCart({
      id: plant.id,
      name: plant.name,
      price: plant.price,
      quantity: 1,
      image: plant.image,
    });
  };

  return (
    <div className="mb-8">
      <button
        className="flex items-center justify-between w-full py-2 px-4 bg-primary-600 text-white rounded-t-lg focus:outline-none hover:bg-primary-700 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-xl font-bold">{title}</h2>
        {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>
      {isExpanded && (
        <div className="flex flex-wrap justify-center bg-primary-50 p-4 rounded-b-lg">
          {species.map((plant) => (
            <div
              key={plant.id}
              className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <Image
                  src={plant.image}
                  alt={plant.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                {plant.forSale && (
                  <div className="absolute top-2 right-2 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                    En Venta
                  </div>
                )}
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-primary-800">
                  {plant.name}
                </div>
                <p className="text-gray-700 text-base">{plant.description}</p>
                {plant.forSale && (
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-primary-600 font-semibold">
                      Precio: ${plant.price.toFixed(2)}
                    </p>
                    <button
                      className={`px-3 py-1 rounded-full flex items-center text-white ${
                        isMounted && isInCart(plant.id)
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-primary-600 hover:bg-primary-700"
                      } transition-colors`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={isMounted && isInCart(plant.id)}
                    >
                      <ShoppingBag size={16} className="mr-1" />
                      {isMounted && isInCart(plant.id) ? "Añadido" : "Comprar"}
                    </button>
                  </div>
                )}
                <button
                  className="mt-4 flex items-center text-primary-600 hover:text-primary-800 transition-colors"
                  onClick={() => setSelectedPlant(plant)}
                >
                  <Info size={16} className="mr-1" /> Información de cuidado
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedPlant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-2 text-primary-800">
              {selectedPlant.name}
            </h3>
            <div className="mb-4">
              <h4 className="font-semibold text-primary-700 mb-1">
                Cuidados recomendados:
              </h4>
              <p className="text-gray-700">{selectedPlant.care}</p>
            </div>
            <button
              className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors"
              onClick={() => setSelectedPlant(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const SpeciesCard: React.FC = () => {
  const allSpecies = cart;
  const speciesForSale = cart.filter((plant) => plant.forSale);

  return (
    <div className="container mx-auto px-4 py-8">
      <IntroSection />
      <Species
        title="Todas las Especies de Cactus y Suculentas"
        species={allSpecies}
      />
      <Species title="Especies en Venta" species={speciesForSale} />
    </div>
  );
};

export default SpeciesCard;
