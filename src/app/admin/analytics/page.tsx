// app/admin/analytics/page.tsx
'use client'
import { AdminLayout } from '../AdminLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Cart } from '../../lib/species';

export default function AdminAnalytics() {
  const data = Cart.map(species => ({
    name: species.name,
    price: species.price,
    status: species.forSale ? 'En venta' : 'No disponible'
  }));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Analytics
          </h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Precios por Especie</h3>
          <div className="w-full overflow-x-auto">
            <BarChart width={800} height={400} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="price" fill="#4ade80" />
            </BarChart>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}