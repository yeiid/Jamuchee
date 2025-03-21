"use client";

import { useState } from "react";
import { Specie } from "@/app/lib/types";
import { PlusCircle, Pencil, Trash2, Check, X, ImagePlus } from "lucide-react";
import Image from "next/image";

interface AdminSpeciesPanelProps {
  species: Specie[];
  onAdd: (newSpecies: Omit<Specie, "id">) => void;
  onUpdate: (id: string, updatedData: Partial<Specie>) => void;
  onDelete: (id: string) => void;
}

export const AdminSpeciesPanel: React.FC<AdminSpeciesPanelProps> = ({
  species,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  const [newSpecies, setNewSpecies] = useState<Omit<Specie, "id">>({
    name: "",
    description: "",
        forSale: false,
        price: 0,
    image: "",
    care: "",
  });

  const [editMode, setEditMode] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Specie>>({});
  const [showForm, setShowForm] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (editMode) {
      setEditData((prev) => ({
        ...prev,
        [name]:
          type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : type === "number"
            ? parseFloat(value)
            : value,
      }));
    } else {
      setNewSpecies((prev) => ({
        ...prev,
        [name]:
          type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : type === "number"
            ? parseFloat(value)
            : value,
      }));
    }
  };

  const handleSubmit = () => {
    if (newSpecies.name) {
      onAdd(newSpecies);
      setNewSpecies({
        name: "",
        description: "",
        forSale: false,
        price: 0,
        image: "",
        care: "",
      });
      setShowForm(false);
    }
  };

  const handleEdit = (id: string) => {
    const specieToEdit = species.find((s) => s.id === id);
    if (specieToEdit) {
      setEditMode(id);
      setEditData({ ...specieToEdit });
    }
  };

  const handleSaveEdit = () => {
    if (editMode && Object.keys(editData).length > 0) {
      onUpdate(editMode, editData);
      setEditMode(null);
      setEditData({});
    }
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setEditData({});
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Especies</h3>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Añadir Especie
          </button>
        )}
      </div>

      {/* Formulario de nueva especie */}
      {showForm && (
        <div className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="text-md font-semibold mb-4">Nueva Especie</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                value={newSpecies.name}
                onChange={handleChange}
                placeholder="Nombre de la especie"
                className="w-full p-2 border rounded focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Precio
              </label>
              <input
                type="number"
                name="price"
                value={newSpecies.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full p-2 border rounded focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                name="description"
                value={newSpecies.description}
                onChange={handleChange}
                placeholder="Descripción detallada"
                className="w-full p-2 border rounded focus:ring-primary-500 focus:border-primary-500"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL de Imagen
              </label>
              <input
                type="text"
                name="image"
                value={newSpecies.image}
                onChange={handleChange}
                placeholder="/imagenes/mi-especie.jpg"
                className="w-full p-2 border rounded focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cuidados
              </label>
              <textarea
                name="care"
                value={newSpecies.care}
                onChange={handleChange}
                placeholder="Instrucciones de cuidado"
                className="w-full p-2 border rounded focus:ring-primary-500 focus:border-primary-500"
                rows={3}
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="forSale"
                  checked={newSpecies.forSale}
                  onChange={handleChange as any}
                  className="rounded text-primary-600 focus:ring-primary-500 h-4 w-4"
                />
                <span className="text-sm font-medium text-gray-700">
                  Disponible para la venta
                </span>
              </label>
            </div>
          </div>

          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              disabled={!newSpecies.name}
            >
              Guardar Especie
            </button>
          </div>
      </div>
      )}

      {/* Lista de especies */}
      <div className="mt-4 overflow-hidden ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Imagen
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Especie
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Precio
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Estado
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {species.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No hay especies registradas. ¡Añade la primera!
                </td>
              </tr>
            ) : (
              species.map((specie) => (
                <tr
                  key={specie.id}
                  className={editMode === specie.id ? "bg-primary-50" : ""}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-12 h-12 relative rounded overflow-hidden bg-gray-100">
                      {editMode === specie.id ? (
                        editData.image ? (
                          <Image
                            src={editData.image}
                            alt={editData.name || specie.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImagePlus className="w-6 h-6 text-gray-400" />
                          </div>
                        )
                      ) : specie.image ? (
                        <Image
                          src={specie.image}
                          alt={specie.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImagePlus className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {editMode === specie.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editData.name || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                      />
                    ) : (
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {specie.name}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {specie.description}
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editMode === specie.id ? (
                      <input
                        type="number"
                        name="price"
                        value={editData.price || 0}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className="w-24 p-2 border rounded"
                      />
                    ) : (
                      <div className="text-sm text-gray-900">
                        ${specie.price.toFixed(2)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editMode === specie.id ? (
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="forSale"
                          checked={editData.forSale || false}
                          onChange={handleChange as any}
                          className="rounded text-primary-600"
                        />
                        <span>Disponible</span>
        </label>
                    ) : (
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          specie.forSale
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {specie.forSale ? "En venta" : "No disponible"}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {editMode === specie.id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveEdit}
                          className="text-primary-600 hover:text-primary-900"
                          title="Guardar cambios"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-gray-600 hover:text-gray-900"
                          title="Cancelar"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(specie.id)}
                          className="text-primary-600 hover:text-primary-900"
                          title="Editar"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => onDelete(specie.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Eliminar"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
