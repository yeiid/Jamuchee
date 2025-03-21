"use client";

import React from "react";
import { Package, ShoppingBag, Users, DollarSign } from "lucide-react";

interface StatsProps {
  stats: {
    totalProducts: number;
    totalCustomers: number;
    totalOrders: number;
    totalRevenue: number;
  };
}

export const DashboardStats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ShoppingBag className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Productos Totales
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
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-6 w-6 text-primary-600" />
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
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Package className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Pedidos Totales
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
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Ingresos Totales
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
      </div>
    </div>
  );
};
