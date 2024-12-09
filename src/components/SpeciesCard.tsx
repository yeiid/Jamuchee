'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import {Specie,SpeciesSection} from '@/app/lib/types'

const cart: Specie[] = [
  {
    "id": "1",
    "name": "Cactus Mammillaria",
    "description": "Cactus globular pequeño con espinas blancas y flores en corona.",
    "price": 10,
    "image": "/1.jpg",
    "forSale": true,
    "care": "Luz solar directa, riego escaso, sustrato bien drenado."
  },
  {
    "id": "2",
    "name": "Echeveria Elegans",
    "description": "Suculenta con rosetas de hojas carnosas de color azul-grisáceo.",
    "price": 20,
    "image": "/2.jpg",
    "forSale": true,
    "care": "Luz brillante indirecta, riego moderado, sustrato para suculentas."
  },
  {
    "id": "3",
    "name": "Aloe Vera",
    "description": "Suculenta medicinal con hojas gruesas y gel curativo.",
    "price": 15,
    "image": "/3.jpg",
    "forSale": false,
    "care": "Luz solar parcial, riego profundo pero infrecuente."
  },
  {
    "id": "4",
    "name": "Sedum Morganianum",
    "description": "Suculenta colgante conocida como 'cola de burro'.",
    "price": 18,
    "image": "/4.jpg",
    "forSale": false,
    "care": "Luz brillante, riego cuando el sustrato esté seco."
  },
  {
    "id": "5",
    "name": "Opuntia Microdasys",
    "description": "Cactus de pala con pequeñas espinas doradas.",
    "price": 25,
    "image": "/5.jpg",
    "forSale": false,
    "care": "Luz solar plena, riego mínimo, sustrato arenoso."
  },
  {
    "id": "6",
    "name": "Haworthia Fasciata",
    "description": "Suculenta pequeña con hojas rayadas en forma de roseta.",
    "price": 12,
    "image": "/5.jpg",
    "forSale": false,
    "care": "Luz indirecta, riego moderado, sustrato bien drenado."
  }
];

const IntroSection: React.FC = () => (
  <div className="bg-green-100 p-6 rounded-lg mb-8 shadow-md">
    <h2 className="text-2xl font-bold text-green-800 mb-4">Bienvenido al Mundo de los Cactus y Suculentas</h2>
    <p className="text-gray-700 mb-4">
      Descubre la belleza y diversidad de nuestras especies de cactus y suculentas. Cada planta tiene características únicas y necesidades específicas de cuidado. Explora nuestra colección para encontrar la planta perfecta para tu hogar o jardín.
    </p>
    <div className="bg-white p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-green-700 mb-2">Consejos Generales de Cuidado:</h3>
      <ul className="list-disc list-inside text-gray-600">
        <li>Proporciona luz adecuada según la especie</li>
        <li>Riega con moderación, evitando el exceso de agua</li>
        <li>Usa un sustrato bien drenado específico para cactus y suculentas</li>
        <li>Protege las plantas de temperaturas extremas</li>
        <li>Fertiliza ocasionalmente durante la temporada de crecimiento</li>
      </ul>
    </div>
  </div>
);

const Species: React.FC<SpeciesSection> = ({ title, species }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<Specie | null>(null);

  return (
    <div className="mb-8">
      <button
        className="flex items-center justify-between w-full py-2 px-4 bg-green-600 text-white rounded-t-lg focus:outline-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-xl font-bold">{title}</h2>
        {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>
      {isExpanded && (
        <div className="flex flex-wrap justify-center bg-green-100 p-4 rounded-b-lg">
          {species.map((plant) => (
            <div
              key={plant.id}
              className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white"
            >
              <Image
                src={plant.image}
                alt={plant.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-green-800">{plant.name}</div>
                <p className="text-gray-700 text-base">{plant.description}</p>
                {plant.forSale && (
                  <p className="mt-2 text-green-600 font-semibold">Precio: ${plant.price}</p>
                )}
                <button
                  className="mt-2 flex items-center text-blue-600 hover:text-blue-800"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <h3 className="text-xl font-bold mb-2">{selectedPlant.name}</h3>
            <p className="mb-4">{selectedPlant.care}</p>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
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
      <Species title="Todas las Especies de Cactus y Suculentas" species={allSpecies} />
      <Species title="Especies en Venta" species={speciesForSale} />
    </div>
  );
};

export default SpeciesCard;