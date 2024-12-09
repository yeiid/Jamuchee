import { Home, Plane, DollarSign, Settings, Users, BarChart } from 'lucide-react';
export interface DashboardStats {
    totalSpecies: number;
    speciesForSale: number;
    totalViews: number;
    totalSales: number;
  }
export const DashboardStats: React.FC<{ stats: DashboardStats }> = ({ stats }) => {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { name: 'Total Especies', value: stats.totalSpecies, icon: Plane },
          { name: 'Especies en Venta', value: stats.speciesForSale, icon: DollarSign },
          { name: 'Visitas Totales', value: stats.totalViews, icon: BarChart },
          { name: 'Ventas Totales', value: `$${stats.totalSales}`, icon: DollarSign },
        ].map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-green-500 p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
            </dd>
          </div>
        ))}
      </div>
    );
  };
  