// app/admin/users/page.tsx
"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "../AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Trash2, Search, UserPlus, UserCheck, UserX } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Tipos para los datos de usuarios
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  registrationDate: Date;
  lastOrder: Date | null;
  orderCount: number;
  status: "active" | "inactive";
  avatar: string;
}

// Datos de ejemplo para usuarios
const mockUsers: User[] = [
  {
    id: "USR-001",
    name: "Juan Pérez",
    email: "juan.perez@ejemplo.com",
    phone: "612345678",
    address: "Calle Principal 123",
    city: "Madrid",
    postalCode: "28001",
    registrationDate: new Date("2023-01-15"),
    lastOrder: new Date("2023-10-05"),
    orderCount: 8,
    status: "active",
    avatar: "/placeholder.jpg",
  },
  {
    id: "USR-002",
    name: "María García",
    email: "maria.garcia@ejemplo.com",
    phone: "623456789",
    address: "Avenida Central 45",
    city: "Barcelona",
    postalCode: "08001",
    registrationDate: new Date("2023-02-20"),
    lastOrder: new Date("2023-09-28"),
    orderCount: 5,
    status: "active",
    avatar: "/placeholder.jpg",
  },
  {
    id: "USR-003",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@ejemplo.com",
    phone: "634567890",
    address: "Plaza Mayor 8",
    city: "Valencia",
    postalCode: "46001",
    registrationDate: new Date("2023-03-10"),
    lastOrder: null,
    orderCount: 0,
    status: "inactive",
    avatar: "/placeholder.jpg",
  },
  {
    id: "USR-004",
    name: "Laura Martínez",
    email: "laura.martinez@ejemplo.com",
    phone: "645678901",
    address: "Calle Nueva 56",
    city: "Sevilla",
    postalCode: "41001",
    registrationDate: new Date("2023-04-05"),
    lastOrder: new Date("2023-10-10"),
    orderCount: 3,
    status: "active",
    avatar: "/placeholder.jpg",
  },
  {
    id: "USR-005",
    name: "Antonio López",
    email: "antonio.lopez@ejemplo.com",
    phone: "656789012",
    address: "Calle Antigua 12",
    city: "Zaragoza",
    postalCode: "50001",
    registrationDate: new Date("2023-05-15"),
    lastOrder: new Date("2023-08-20"),
    orderCount: 2,
    status: "inactive",
    avatar: "/placeholder.jpg",
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Filtrar usuarios según la pestaña activa y el término de búsqueda
  const filteredUsers = users.filter((user) => {
    // Filtrar por estado (pestaña)
    if (activeTab === "active" && user.status !== "active") return false;
    if (activeTab === "inactive" && user.status !== "inactive") return false;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.id.toLowerCase().includes(term)
      );
    }

    return true;
  });

  // Formatear fecha
  const formatDate = (date: Date | null) => {
    if (!date) return "N/A";
    return format(date, "dd MMM yyyy", { locale: es });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Gestión de Clientes
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Administra los usuarios registrados en la plataforma
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              <UserPlus className="mr-1.5 h-5 w-5" aria-hidden="true" />
              Nuevo Cliente
            </button>
          </div>
        </div>

        {/* Filtro y búsqueda */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-4 sm:mb-0">
                <Tabs
                  defaultValue="all"
                  className="w-full"
                  onValueChange={setActiveTab}
                >
                  <TabsList>
                    <TabsTrigger value="all" className="relative">
                      Todos
                      <span className="ml-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                        {users.length}
                      </span>
                    </TabsTrigger>
                    <TabsTrigger value="active" className="relative">
                      <div className="flex items-center">
                        <UserCheck className="mr-1 h-4 w-4" />
                        Activos
                        <span className="ml-2 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          {
                            users.filter((user) => user.status === "active")
                              .length
                          }
                        </span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="inactive" className="relative">
                      <div className="flex items-center">
                        <UserX className="mr-1 h-4 w-4" />
                        Inactivos
                        <span className="ml-2 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                          {
                            users.filter((user) => user.status === "inactive")
                              .length
                          }
                        </span>
                      </div>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  placeholder="Buscar cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de clientes */}
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Cliente
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Contacto
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Registro
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Último Pedido
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Pedidos
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Estado
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Acciones</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <Image
                                className="h-10 w-10 rounded-full"
                                src={user.avatar}
                                alt=""
                                width={40}
                                height={40}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {user.name}
                              </div>
                              <div className="text-gray-500">{user.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">{user.email}</div>
                          <div className="text-gray-500">{user.phone}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {formatDate(user.registrationDate)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {formatDate(user.lastOrder)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {user.orderCount}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span
                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                              user.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {user.status === "active" ? "Activo" : "Inactivo"}
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            type="button"
                            className="text-primary-600 hover:text-primary-900 mr-2"
                            onClick={() => setSelectedUser(user)}
                          >
                            <Edit className="h-5 w-5" aria-hidden="true" />
                            <span className="sr-only">Editar {user.name}</span>
                          </button>
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-900"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "¿Estás seguro de que deseas eliminar este cliente?"
                                )
                              ) {
                                setUsers(users.filter((u) => u.id !== user.id));
                              }
                            }}
                          >
                            <Trash2 className="h-5 w-5" aria-hidden="true" />
                            <span className="sr-only">
                              Eliminar {user.name}
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredUsers.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-sm text-gray-500">
                      No se encontraron clientes que coincidan con los criterios
                      de búsqueda.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
