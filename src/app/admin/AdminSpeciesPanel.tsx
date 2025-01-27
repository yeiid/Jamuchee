'use client'

import { useState } from 'react';
import { Specie } from '@/app/lib/types';

interface AdminSpeciesPanelProps {
  species: Specie[];
  onAdd: (newSpecies: Omit<Specie, 'id'>) => void;
  onUpdate: (id: string, updatedData: Partial<Specie>) => void;
  onDelete: (id: string) => void;
}

export const AdminSpeciesPanel: React.FC<AdminSpeciesPanelProps> = ({ species, onAdd, onUpdate, onDelete }) => {
    const [newSpecies, setNewSpecies] = useState<Omit<Specie, 'id'>>({
        name: '',
        forSale: false,
        description: '',
        price: 0,
        image: '',
        care: ''
      });
      
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewSpecies(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = () => {
    if (newSpecies.name) {
      onAdd(newSpecies);
      setNewSpecies({         name: '',
        forSale: false,
        description: '',
        price: 0,
        image: '',
        care: ''});
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Administrar Especies</h3>
      
      <div className="mt-4 space-y-4">
        {species.map(specie => (
          <div key={specie.id} className="flex justify-between items-center border-b py-2">
            <span>{specie.name}</span>
            <div>
              <button onClick={() => onUpdate(specie.id, { forSale: !specie.forSale })} className="px-2 py-1 bg-blue-500 text-white rounded mr-2">
                {specie.forSale ? 'Desactivar Venta' : 'Poner en Venta'}
              </button>
              <button onClick={() => onDelete(specie.id)} className="px-2 py-1 bg-red-500 text-white rounded">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h4 className="text-md font-semibold">Añadir Nueva Especie</h4>
        <input type="text" name="name" value={newSpecies.name} onChange={handleChange} placeholder="Nombre" className="mt-2 p-2 border rounded w-full" />
        <label className="flex items-center mt-2">
          <input type="checkbox" name="forSale" checked={newSpecies.forSale} onChange={handleChange} className="mr-2" />
          En Venta
        </label>
        <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Agregar</button>
      </div>
    </div>
  );
};