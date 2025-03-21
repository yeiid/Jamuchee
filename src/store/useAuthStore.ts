"use client";
import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  role: string | null;
  login: (username: string, role: string) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

const useAuthStore = create<AuthState>((set, get) => ({
  isLoggedIn: false,
  username: null,
  role: null,

  login: (username: string, role: string) => {
    // Guardar en localStorage para persistir la sesión
    localStorage.setItem(
      "adminAuth",
      JSON.stringify({
        isLoggedIn: true,
        username,
        role,
      })
    );

    set({ isLoggedIn: true, username, role });
  },

  logout: () => {
    // Eliminar datos de localStorage al cerrar sesión
    localStorage.removeItem("adminAuth");
    set({ isLoggedIn: false, username: null, role: null });
  },

  checkAuth: () => {
    // Verificar si hay datos de sesión en localStorage
    try {
      const authData = localStorage.getItem("adminAuth");
      if (authData) {
        const { isLoggedIn, username, role } = JSON.parse(authData);
        if (isLoggedIn && username && role) {
          // Actualizar el estado con los datos almacenados
          set({ isLoggedIn, username, role });
          return true;
        }
      }
    } catch (error) {
      console.error("Error al verificar autenticación:", error);
    }

    return get().isLoggedIn;
  },
}));

export default useAuthStore;
