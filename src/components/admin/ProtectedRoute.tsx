"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const { checkAuth } = useAuthStore();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticación
    const verifyAuth = () => {
      const isAuth = checkAuth();

      setIsAuthorized(isAuth);
      setIsLoading(false);

      if (!isAuth) {
        // Redirigir al login si no está autenticado
        router.push("/admin/login");
      }
    };

    verifyAuth();
  }, [checkAuth, router]);

  // Mostrar un estado de carga mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-lg text-gray-700">Cargando...</p>
        </div>
      </div>
    );
  }

  // Renderizar children solo si está autorizado
  return isAuthorized ? <>{children}</> : null;
};

export default ProtectedRoute;
