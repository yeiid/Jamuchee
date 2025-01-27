'use client';

import { AdminLayout } from './AdminLayout';
import { DashboardStats } from './DashboardStats';
import { useState, useEffect } from 'react';
import { Cart } from '../lib/species'; // Importación del array desde un archivo separado

export default function AdminDashboard() {
  // Estado inicial para las estadísticas
  const [stats, setStats] = useState({
    totalSpecies: 0,
    speciesForSale: 0,
    totalViews: 123444, // Ejemplo: Se puede conectar con analytics
    totalSales: 5678, // Ejemplo: Se puede conectar con ventas
  });

  useEffect(() => {
    // Calcular estadísticas dinámicas basadas en el array 'Cart'
    if (Cart && Cart.length > 0) {
      setStats((prevStats) => ({
        ...prevStats,
        totalSpecies: Cart.length,
        speciesForSale: Cart.filter((species) => species.forSale).length,
      }));
    }
  }, []); // Escuchar cambios en el array 'Cart'

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Dashboard
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Bienvenido al panel de administración
          </p>
        </div>
        {/* Componente para mostrar estadísticas */}
        <DashboardStats stats={stats} />
      </div>
    </AdminLayout>
  );
}
