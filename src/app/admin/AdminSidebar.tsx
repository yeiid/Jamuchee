"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  ShoppingBag,
  Package,
  Settings,
  Users,
  Menu,
  X,
  LogOut,
} from "lucide-react";

export const AdminSidebar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Define navigation items
  const navigation = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Productos", href: "/admin/products", icon: ShoppingBag },
    { name: "Pedidos", href: "/admin/orders", icon: Package },
    { name: "Usuarios", href: "/admin/users", icon: Users },
    { name: "Configuración", href: "/admin/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 z-40 w-full bg-white border-b border-gray-200 p-4">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Abrir menú principal</span>
          {mobileMenuOpen ? (
            <X className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="block h-6 w-6" aria-hidden="true" />
          )}
        </button>
        <span className="ml-3 text-lg font-semibold text-primary-600">
          Panel de Administración
        </span>
      </div>

      {/* Mobile menu, show/hide based on state */}
      <div
        className={`fixed inset-0 flex z-40 lg:hidden ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          aria-hidden="true"
        />

        <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Cerrar barra lateral</span>
              <X className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-shrink-0 flex items-center px-4">
            <span className="text-xl font-bold text-primary-600">Jamuche</span>
          </div>
          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    pathname === item.href
                      ? "bg-primary-100 text-primary-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon
                    className={`mr-4 flex-shrink-0 h-6 w-6 ${
                      pathname === item.href
                        ? "text-primary-600"
                        : "text-gray-400 group-hover:text-gray-500"
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <a href="#" className="flex-shrink-0 group block">
              <div className="flex items-center">
                <div>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                    <span className="text-xs font-medium leading-none text-gray-600">
                      A
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                    Administrador
                  </p>
                  <Link
                    href="/api/auth/signout"
                    className="text-sm font-medium text-gray-500 group-hover:text-gray-700 flex items-center"
                  >
                    <LogOut className="mr-1 h-4 w-4" /> Cerrar sesión
                  </Link>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <span className="text-xl font-bold text-primary-600">Jamuche</span>
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    pathname === item.href
                      ? "bg-primary-100 text-primary-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-6 w-6 ${
                      pathname === item.href
                        ? "text-primary-600"
                        : "text-gray-400 group-hover:text-gray-500"
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <a href="#" className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                    <span className="text-xs font-medium leading-none text-gray-600">
                      A
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    Administrador
                  </p>
                  <Link
                    href="/api/auth/signout"
                    className="text-xs font-medium text-gray-500 group-hover:text-gray-700 flex items-center"
                  >
                    <LogOut className="mr-1 h-3 w-3" /> Cerrar sesión
                  </Link>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
