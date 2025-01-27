// app/admin/species/page.tsx
'use client'
import { AdminLayout } from '../AdminLayout';
import { AdminSpeciesPanel } from '../AdminSpeciesPanel';
import { useState } from 'react';
import { Cart } from '../../lib/species';
import { Specie } from '@/app/lib/types';

export default function AdminSpecies() {
  const [species, setSpecies] = useState<Specie[]>(Cart);

  const handleAdd = (newSpecies: Omit<Specie, 'id'>) => {
    const newId = (Math.max(...species.map(s => parseInt(s.id))) + 1).toString();
    setSpecies([...species, { ...newSpecies, id: newId }]);
  };

  const handleUpdate = (id: string, updatedData: Partial<Specie>) => {
    setSpecies(species.map(species => 
      species.id === id ? { ...species, ...updatedData } : species
    ));
  };

  const handleDelete = (id: string) => {
    setSpecies(species.filter(species => species.id !== id));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Gestión de Especies
          </h2>
        </div>

      <AdminSpeciesPanel
          species={species}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        /> 
      </div>
    </AdminLayout>
  );
}
