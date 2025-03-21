// app/admin/sales/page.tsx
"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "../AdminLayout";
import {
  BarChart,
  Calendar,
  DollarSign,
  Download,
  ShoppingBag,
  TrendingUp,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { format, subDays, subMonths, parseISO } from "date-fns";
import { es } from "date-fns/locale";

// Tipos para los datos
interface SalesData {
  date: string;
  amount: number;
}

interface ProductSale {
  name: string;
  quantity: number;
  revenue: number;
}

interface SalesSummary {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  monthlyGrowth: number;
}

// Datos de ejemplo para ventas diarias (últimos 14 días)
const generateDailySalesData = (): SalesData[] => {
  return Array.from({ length: 14 }, (_, i) => {
    const date = subDays(new Date(), i);
    // Generar un valor aleatorio entre 500 y 1500
    const amount = Math.floor(Math.random() * 1000) + 500;
    return {
      date: format(date, "yyyy-MM-dd"),
      amount,
    };
  }).reverse();
};

// Datos de ejemplo para ventas mensuales (últimos 12 meses)
const generateMonthlySalesData = (): SalesData[] => {
  return Array.from({ length: 12 }, (_, i) => {
    const date = subMonths(new Date(), i);
    // Generar un valor aleatorio entre 10000 y 25000
    const amount = Math.floor(Math.random() * 15000) + 10000;
    return {
      date: format(date, "yyyy-MM"),
      amount,
    };
  }).reverse();
};

// Datos de ejemplo para productos más vendidos
const topSellingProducts: ProductSale[] = [
  { name: "Producto Premium A", quantity: 42, revenue: 4200 },
  { name: "Producto Especial B", quantity: 38, revenue: 3800 },
  { name: "Producto Clásico C", quantity: 35, revenue: 3150 },
  { name: "Kit Especial D", quantity: 28, revenue: 2520 },
  { name: "Producto Estándar E", quantity: 25, revenue: 1875 },
];

export default function SalesPage() {
  const [timeRange, setTimeRange] = useState<"daily" | "monthly">("daily");
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [summary, setSummary] = useState<SalesSummary>({
    totalSales: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    monthlyGrowth: 0,
  });

  // Cargar datos según el rango de tiempo seleccionado
  useEffect(() => {
    if (timeRange === "daily") {
      setSalesData(generateDailySalesData());
    } else {
      setSalesData(generateMonthlySalesData());
    }

    // Calcular el resumen de ventas
    const totalSales = timeRange === "daily" ? 12750 : 153000;
    const totalOrders = timeRange === "daily" ? 145 : 1740;

    setSummary({
      totalSales,
      totalOrders,
      averageOrderValue: totalSales / totalOrders,
      monthlyGrowth: 12.5,
    });
  }, [timeRange]);

  // Función para formatear fechas según el rango
  const formatDate = (dateString: string) => {
    if (timeRange === "daily") {
      return format(parseISO(dateString), "dd MMM", { locale: es });
    } else {
      return format(parseISO(`${dateString}-01`), "MMM yyyy", { locale: es });
    }
  };

  // Calcular el valor máximo para el gráfico
  const maxSalesValue = Math.max(...salesData.map((item) => item.amount));
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Análisis de Ventas
          </h2>
            <p className="mt-2 text-sm text-gray-600">
              Visualiza el desempeño de ventas y tendencias
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <Download
                className="mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Exportar
            </button>
          </div>
        </div>

        {/* Tarjetas de resumen */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                      Ventas Totales
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        ${summary.totalSales.toLocaleString("es-ES")}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

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
                      Pedidos Totales
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {summary.totalOrders}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                  <BarChart
                    className="h-6 w-6 text-primary-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Valor Promedio
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        ${summary.averageOrderValue.toFixed(2)}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                  <TrendingUp
                    className="h-6 w-6 text-primary-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Crecimiento Mensual
                    </dt>
                    <dd className="flex items-center">
                      <div className="text-lg font-medium text-gray-900">
                        {summary.monthlyGrowth}%
                      </div>
                      <ArrowUp className="ml-1 h-4 w-4 text-green-500" />
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selector de rango de tiempo y gráfico */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Tendencia de Ventas
              </h3>
              <div className="mt-3 sm:mt-0">
                <div className="inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    className={`relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      timeRange === "daily"
                        ? "text-primary-700 bg-primary-50"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setTimeRange("daily")}
                  >
                    Diario
                  </button>
                  <button
                    type="button"
                    className={`relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      timeRange === "monthly"
                        ? "text-primary-700 bg-primary-50"
                        : "text-gray-700 hover:bg-gray-50"
                    } -ml-px`}
                    onClick={() => setTimeRange("monthly")}
                  >
                    Mensual
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="h-80">
              <div className="h-full flex items-end space-x-2">
                {salesData.map((item, i) => (
                  <div
                    key={i}
                    className="flex-1 flex flex-col justify-end h-full"
                  >
                    <div
                      className="bg-primary-600 rounded-t"
                      style={{
                        height: `${(item.amount / maxSalesValue) * 100}%`,
                        maxHeight: "100%",
                      }}
                    ></div>
                    <div className="text-xs text-center mt-1 text-gray-500 truncate">
                      {formatDate(item.date)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de productos más vendidos */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Productos Más Vendidos
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Producto
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Cantidad
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Ingresos
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topSellingProducts.map((product, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.quantity} unidades
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${product.revenue.toLocaleString("es-ES")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
