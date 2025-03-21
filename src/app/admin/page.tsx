"use client";

import { AdminLayout } from "./AdminLayout";
import { DashboardStats } from "./DashboardStats";
import { AdminSpeciesPanel } from "./AdminSpeciesPanel";
import AdminImageUpload from "./AdminImageUpload";
import { useState, useEffect } from "react";
import { Cart } from "../lib/species";
import { v4 as uuidv4 } from "uuid";
import { Specie } from "@/app/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  ChevronRight,
  Clock,
  DollarSign,
  Package,
  ShoppingBag,
  Users,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Tipos para los datos de ejemplo
interface Order {
  id: string;
  customerName: string;
  date: Date;
  status: "pending" | "processing" | "completed" | "cancelled";
  total: number;
}

interface RevenueData {
  month: string;
  revenue: number;
}

// Datos de ejemplo para pedidos recientes
const recentOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "Ana García",
    date: new Date("2023-10-15"),
    status: "completed",
    total: 125.75,
  },
  {
    id: "ORD-002",
    customerName: "Carlos Rodríguez",
    date: new Date("2023-10-18"),
    status: "processing",
    total: 57.5,
  },
  {
    id: "ORD-003",
    customerName: "María López",
    date: new Date("2023-10-20"),
    status: "pending",
    total: 89.99,
  },
];

// Datos de ejemplo para el gráfico de ingresos
const revenueData: RevenueData[] = [
  { month: "Ene", revenue: 2500 },
  { month: "Feb", revenue: 3200 },
  { month: "Mar", revenue: 4100 },
  { month: "Abr", revenue: 5000 },
  { month: "May", revenue: 4800 },
  { month: "Jun", revenue: 5500 },
  { month: "Jul", revenue: 6000 },
  { month: "Ago", revenue: 6500 },
  { month: "Sep", revenue: 7000 },
  { month: "Oct", revenue: 6800 },
  { month: "Nov", revenue: 7500 },
  { month: "Dic", revenue: 8200 },
];

// Mapa para colores de estado
const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

// Mapa para íconos de estado
const StatusIcon = ({ status }: { status: Order["status"] }) => {
  switch (status) {
    case "pending":
      return <Clock className="w-4 h-4 mr-1" />;
    case "processing":
      return <ShoppingBag className="w-4 h-4 mr-1" />;
    case "completed":
      return <CheckCircle className="w-4 h-4 mr-1" />;
    case "cancelled":
      return <XCircle className="w-4 h-4 mr-1" />;
  }
};

export default function AdminDashboard() {
  // Estado para las especies
  const [species, setSpecies] = useState<Specie[]>([]);

  // Estado para las estadísticas
  const [stats, setStats] = useState({
    totalProducts: 24,
    totalCustomers: 87,
    totalOrders: 134,
    totalRevenue: 12650.75,
  });

  useEffect(() => {
    // Cargar especies
    if (Cart && Cart.length > 0) {
      setSpecies(Cart);

      // Actualizar estadísticas
      setStats((prevStats) => ({
        ...prevStats,
        totalProducts: Cart.length,
      }));
    }
  }, []);

  // Funciones para gestionar las especies
  const handleAddSpecies = (newSpeciesData: Omit<Specie, "id">) => {
    const newSpecies = {
      ...newSpeciesData,
      id: uuidv4(),
    };

    setSpecies((prev) => [...prev, newSpecies]);

    // Actualizar estadísticas
    setStats((prev) => ({
      ...prev,
      totalProducts: prev.totalProducts + 1,
    }));
  };

  const handleUpdateSpecies = (id: string, updatedData: Partial<Specie>) => {
    setSpecies((prev) =>
      prev.map((species) =>
        species.id === id ? { ...species, ...updatedData } : species
      )
    );

    // Actualizar estadísticas si cambia forSale
    if ("forSale" in updatedData) {
      setStats((prev) => ({
        ...prev,
        totalProducts: species.filter((s) =>
          s.id === id ? updatedData.forSale : s.forSale
        ).length,
      }));
    }
  };

  const handleDeleteSpecies = (id: string) => {
    const specieToDelete = species.find((s) => s.id === id);

    setSpecies((prev) => prev.filter((species) => species.id !== id));

    // Actualizar estadísticas
    if (specieToDelete) {
      setStats((prev) => ({
        ...prev,
        totalProducts: prev.totalProducts - 1,
      }));
    }
  };

  // Formatear fecha
  const formatDate = (date: Date) => {
    return format(date, "dd MMM yyyy", { locale: es });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Panel de Administración
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Bienvenido al panel de administración de Jamuche
          </p>
        </div>

        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                  <ShoppingBag
                    className="h-6 w-6 text-primary-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Productos
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stats.totalProducts}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link
                  href="/admin/products"
                  className="font-medium text-primary-700 hover:text-primary-900 flex items-center"
                >
                  Ver productos
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                  <Package
                    className="h-6 w-6 text-primary-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Pedidos
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stats.totalOrders}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link
                  href="/admin/orders"
                  className="font-medium text-primary-700 hover:text-primary-900 flex items-center"
                >
                  Ver pedidos
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                  <Users
                    className="h-6 w-6 text-primary-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Clientes
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stats.totalCustomers}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link
                  href="/admin/users"
                  className="font-medium text-primary-700 hover:text-primary-900 flex items-center"
                >
                  Ver clientes
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                  <DollarSign
                    className="h-6 w-6 text-primary-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Ingresos
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        ${stats.totalRevenue.toFixed(2)}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link
                  href="/admin/sales"
                  className="font-medium text-primary-700 hover:text-primary-900 flex items-center"
                >
                  Ver ventas
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal con pestañas */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Gráfico de ingresos */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Ingresos mensuales
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Últimos 12 meses</span>
              </div>
            </div>
            <div className="h-64">
              <div className="h-full flex items-end space-x-2">
                {revenueData.map((month, i) => (
                  <div
                    key={i}
                    className="flex-1 flex flex-col justify-end h-full"
                  >
                    <div
                      className="bg-primary-600 rounded-t"
                      style={{
                        height: `${(month.revenue / 8200) * 100}%`,
                        maxHeight: "100%",
                      }}
                    ></div>
                    <div className="text-xs text-center mt-1 text-gray-500">
                      {month.month}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pedidos recientes */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Pedidos recientes
              </h3>
            </div>
            <div className="overflow-hidden">
              <ul role="list" className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <li key={order.id}>
                    <div className="px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <Package className="h-5 w-5 text-gray-500" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {order.id}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.customerName}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-4 text-right">
                          <div className="text-sm font-medium text-gray-900">
                            ${order.total.toFixed(2)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatDate(order.date)}
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full items-center ${
                            statusColors[order.status]
                          }`}
                        >
                          <StatusIcon status={order.status} />
                          {order.status === "pending" && "Pendiente"}
                          {order.status === "processing" && "En proceso"}
                          {order.status === "completed" && "Completado"}
                          {order.status === "cancelled" && "Cancelado"}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-200 px-6 py-3">
                <div className="text-sm">
                  <Link
                    href="/admin/orders"
                    className="font-medium text-primary-700 hover:text-primary-900 flex items-center justify-center"
                  >
                    Ver todos los pedidos
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
