"use client";
// /admin/AdminHeader.tsx
import { useState } from "react";
import { BellIcon, UserCircle, LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

interface AdminHeaderProps {
  username?: string; // El nombre del usuario puede ser dinámico
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  username = "Admin",
}) => {
  const router = useRouter();
  const { logout, username: storeUsername } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const displayName = storeUsername || username;

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
              onClick={toggleMenu}
            >
              <UserCircle className="h-8 w-8 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                {displayName}
              </span>
            </button>
            {/* Menú desplegable */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Mi perfil
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Configuración
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    role="menuitem"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
