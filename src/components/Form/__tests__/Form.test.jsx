import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Form from "../Form";

describe("Componente Form", () => {
  test("renderiza todos los campos del formulario", () => {
    render(<Form />);
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /enviar/i })).toBeInTheDocument();
  });

  test("muestra error cuando se envía con campos vacíos", async () => {
    render(<Form />);

    // Enviar formulario vacío
    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    // Verificar mensajes de error
    await waitFor(() => {
      expect(screen.getByText(/el nombre es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/el email es requerido/i)).toBeInTheDocument();
    });
  });

  test("llama a onSubmit con datos cuando el formulario es válido", async () => {
    const handleSubmit = jest.fn();
    render(<Form onSubmit={handleSubmit} />);

    // Completar formulario
    fireEvent.change(screen.getByLabelText(/nombre/i), {
      target: { value: "Juan Pérez" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "juan@ejemplo.com" },
    });
    fireEvent.change(screen.getByLabelText(/mensaje/i), {
      target: { value: "Hola, esto es un mensaje de prueba" },
    });

    // Enviar formulario
    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    // Verificar que se llamó onSubmit con los datos correctos
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        nombre: "Juan Pérez",
        email: "juan@ejemplo.com",
        mensaje: "Hola, esto es un mensaje de prueba",
      });
    });
  });
});
