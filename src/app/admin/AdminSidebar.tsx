// app/admin/AdminSidebar.tsx
import { Home, Plane, DollarSign, Settings, Users, BarChart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavigationItem = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  current: boolean;
};

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const navigation: NavigationItem[] = [
    { name: 'Dashboard', href: '/admin', icon: Home, current: pathname === '/admin' },
    { name: 'Especies', href: '/admin/species', icon: Plane, current: pathname === '/admin/species' },
    { name: 'Ventas', href: '/admin/sales', icon: DollarSign, current: pathname === '/admin/sales' },
    { name: 'Usuarios', href: '/admin/users', icon: Users, current: pathname === '/admin/users' },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart, current: pathname === '/admin/analytics' },
    { name: 'Configuración', href: '/admin/settings', icon: Settings, current: pathname === '/admin/settings' },
  ];

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex flex-col flex-grow bg-green-700 pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-white text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${
                item.current
                  ? 'bg-green-800 text-white'
                  : 'text-green-100 hover:bg-green-600'
              } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
            >
              <item.icon
                className="mr-3 h-6 w-6 flex-shrink-0"
                aria-hidden="true"
              />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};