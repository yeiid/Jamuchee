// app/admin/page.tsx
'use client'
import { AdminLayout } from './AdminLayout';
import { DashboardStats } from './DashboardStats';
import { useState, useEffect } from 'react';
import { cart } from './species'; // Asegúrate de mover tu array 'cart' a un archivo separado

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSpecies: 0,
    speciesForSale: 0,
    totalViews: 1234, // Esto podría venir de analytics
    totalSales: 5678, // Esto podría venir de un sistema de ventas
  });

  useEffect(() => {
    // Calcular estadísticas basadas en el cart
    setStats({
      ...stats,
      totalSpecies: cart.length,
      speciesForSale: cart.filter(species => species.forSale).length,
    });
  }, []);

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
        <DashboardStats stats={stats} />
      </div>
    </AdminLayout>
  );
}
