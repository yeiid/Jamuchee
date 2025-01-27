// /admin/AdminHeader.tsx
import { BellIcon, UserCircle } from 'lucide-react';

interface AdminHeaderProps {
  username?: string; // El nombre del usuario puede ser dinámico
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ username = 'Admin' }) => {
  return (
    <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
      <div className="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
        {/* Sección izquierda: puedes agregar un buscador aquí si lo necesitas */}
        <div className="flex flex-1">
          <input
            type="text"
            placeholder="Buscar..."
            className="hidden sm:block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          />
        </div>

        {/* Sección derecha: íconos y usuario */}
        <div className="ml-4 flex items-center md:ml-6 space-x-4">
          {/* Botón de notificaciones */}
          <button
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Notificaciones"
          >
            <BellIcon className="h-6 w-6 text-gray-400" />
          </button>

          {/* Menú de usuario */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100"
              aria-label="Menú de usuario"
            >
              <UserCircle className="h-8 w-8 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">{username}</span>
            </button>
            {/* Aquí puedes agregar un menú desplegable */}
          </div>
        </div>
      </div>
    </header>
  );
};
