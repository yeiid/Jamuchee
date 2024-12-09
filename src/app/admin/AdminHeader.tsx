// /admin/AdminHeader.tsx
import { BellIcon, UserCircle } from 'lucide-react';

export const AdminHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
      <div className="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1">
          {/* Puedes agregar un buscador aquí si lo necesitas */}
        </div>
        <div className="ml-4 flex items-center md:ml-6 space-x-4">
          <button className="p-1 rounded-full hover:bg-gray-100">
            <BellIcon className="h-6 w-6 text-gray-400" />
          </button>
          <div className="relative">
            <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100">
              <UserCircle className="h-8 w-8 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};