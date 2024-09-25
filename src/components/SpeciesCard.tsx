'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';
import cart from '@/mook/datos.json';
interface Plant {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  forSale?: boolean; // Esta propiedad es opcional
}
interface SpeciesSectionProps {
  title: string;
  species: Plant[];
}
const SpeciesSection: React.FC<SpeciesSectionProps> = ({ title, species }) => {
  const [isExpanded, setIsExpanded] = useState(false);
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
                  <p className="mt-2 text-green-600 font-semibold">Disponible para la venta</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SpeciesCard = () => {
  const allSpecies = cart;
  const speciesForSale = cart.filter((plant) => plant.forSale);

  return (
    <div className="container mx-auto px-4 py-8">
      <SpeciesSection title="Todas las Especies de Cactus y Suculentas" species={allSpecies} />
      <SpeciesSection title="Especies en Venta" species={speciesForSale} />
    </div>
  );
};

export default SpeciesCard;