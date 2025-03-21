// Utilidades de prueba personalizadas
import { render } from "@testing-library/react";

// Renderizar con proveedores de contexto, si es necesario
export function renderWithProviders(ui, options = {}) {
  return render(ui, options);
}
