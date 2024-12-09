// app/admin/sales/page.tsx
'use client'
import { AdminLayout } from '../AdminLayout';
import { cart } from '../species';

export default function AdminSales() {
  const forSaleSpecies = cart.filter(species => species.forSale);
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Gestión de Ventas
          </h2>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Especies en Venta</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {forSaleSpecies.map((species) => (
              <div key={species.id} className="border rounded-lg p-4">
                <h4 className="font-medium">{species.name}</h4>
                <p className="text-green-600">${species.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}