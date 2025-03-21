"use client";
import { useState, useEffect } from "react";
import { AdminLayout } from "../AdminLayout";
import {
  PlusCircle,
  Edit,
  Trash2,
  Search,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

// Tipo para los productos
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  inStock: boolean;
  category: string;
}

// Datos de ejemplo para productos
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Cactus Mammillaria",
    description:
      "Cactus pequeño y redondeado con espinas blancas y flores en forma de corona.",
    price: 15.99,
    image: "/1.jpg",
    inStock: true,
    category: "Cactus",
  },
  {
    id: "2",
    name: "Echeveria Elegans",
    description:
      "Suculenta con rosetas de hojas carnosas de color verde azulado.",
    price: 12.5,
    image: "/2.jpg",
    inStock: true,
    category: "Suculentas",
  },
  {
    id: "3",
    name: "Aloe Vera",
    description: "Planta medicinal con hojas gruesas y gel curativo interior.",
    price: 18.75,
    image: "/3.jpg",
    inStock: false,
    category: "Suculentas",
  },
  {
    id: "4",
    name: "Haworthia Fasciata",
    description: "Suculenta pequeña con hojas rayadas verticalmente.",
    price: 9.99,
    image: "/4.jpg",
    inStock: true,
    category: "Suculentas",
  },
];

// Categorías de productos
const productCategories = [
  "Todas",
  "Cactus",
  "Suculentas",
  "Plantas de interior",
  "Plantas de exterior",
  "Accesorios",
];

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [editForm, setEditForm] = useState<Product>({
    id: "",
    name: "",
    description: "",
    price: 0,
    image: "",
    inStock: true,
    category: "Cactus",
  });

  // Filtrar productos según búsqueda y categoría
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todas" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Abrir modal de edición
  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setEditForm(product);
    setIsEditing(true);
  };

  // Abrir modal para crear nuevo producto
  const handleCreate = () => {
    const newProduct: Product = {
      id: "",
      name: "",
      description: "",
      price: 0,
      image: "/placeholder.jpg",
      inStock: true,
      category: "Cactus",
    };
    setSelectedProduct(null);
    setEditForm(newProduct);
    setIsEditing(true);
  };

  // Guardar cambios (crear o actualizar)
  const handleSave = () => {
    if (selectedProduct) {
      // Actualizar producto existente
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === selectedProduct.id ? editForm : p))
      );
    } else {
      // Crear nuevo producto
      const newProduct = {
        ...editForm,
        id: uuidv4(),
      };
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    }

    setIsEditing(false);
  };

  // Eliminar producto
  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
    }
  };

  // Manejar cambios en el formulario
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  // Manejar cambio en el estado de stock
  const handleInStockChange = (value: boolean) => {
    setEditForm((prev) => ({
      ...prev,
      inStock: value,
    }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Gestión de Productos
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Administra tu catálogo de productos
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Nuevo Producto
          </button>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar productos..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="block w-full sm:w-48 py-2 px-3 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {productCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Lista de productos */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                  >
                    No se encontraron productos
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 mr-3 relative">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            <Image
                              src={product.image || "/placeholder.jpg"}
                              alt={product.name}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.inStock
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.inStock ? "En stock" : "Agotado"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-primary-600 hover:text-primary-900 mr-4"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de edición/creación */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedProduct ? "Editar Producto" : "Nuevo Producto"}
                </h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              {/* Formulario */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Descripción
                  </label>
                  <textarea
                    name="description"
                    value={editForm.description}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Precio
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        name="price"
                        value={editForm.price}
                        onChange={handleChange}
                        className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Categoría
                    </label>
                    <select
                      name="category"
                      value={editForm.category}
                      onChange={handleChange}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    >
                      {productCategories.slice(1).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    URL de la imagen
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={editForm.image}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                  {editForm.image && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-1">
                        Vista previa:
                      </p>
                      <div className="h-24 w-24 relative rounded overflow-hidden bg-gray-100">
                        <Image
                          src={editForm.image || "/placeholder.jpg"}
                          alt={editForm.name || "Vista previa de producto"}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado
                  </label>
                  <div className="flex space-x-4">
                    <div
                      className={`flex items-center space-x-2 p-2 rounded cursor-pointer ${
                        editForm.inStock
                          ? "bg-green-50 border border-green-200"
                          : "bg-white border border-gray-200"
                      }`}
                      onClick={() => handleInStockChange(true)}
                    >
                      <CheckCircle
                        className={`h-5 w-5 ${
                          editForm.inStock ? "text-green-500" : "text-gray-400"
                        }`}
                      />
                      <span>En stock</span>
                    </div>
                    <div
                      className={`flex items-center space-x-2 p-2 rounded cursor-pointer ${
                        !editForm.inStock
                          ? "bg-red-50 border border-red-200"
                          : "bg-white border border-gray-200"
                      }`}
                      onClick={() => handleInStockChange(false)}
                    >
                      <XCircle
                        className={`h-5 w-5 ${
                          !editForm.inStock ? "text-red-500" : "text-gray-400"
                        }`}
                      />
                      <span>Agotado</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsEditing(false)}
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
