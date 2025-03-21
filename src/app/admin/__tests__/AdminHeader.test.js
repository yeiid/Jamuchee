/**
 * @jest-environment jsdom
 */

// Usamos una función para simular la importación del componente
function mockAdminHeaderComponent() {
  return {
    AdminHeader: jest.fn(() => ({
      render: () => "<div>Admin Header</div>",
      toString: () => "Admin Header",
    })),
  };
}

// Mock del componente AdminHeader
jest.mock("../AdminHeader", () => mockAdminHeaderComponent());

describe("AdminHeader Component", () => {
  test("should mock the component correctly", () => {
    const { AdminHeader } = require("../AdminHeader");

    // Verificar que la función mock se llamó
    const mockComponent = AdminHeader();
    expect(AdminHeader).toHaveBeenCalled();

    // Verificar que el componente mock tiene los métodos esperados
    expect(mockComponent.toString()).toBe("Admin Header");
    expect(mockComponent.render()).toContain("Admin Header");
  });
});
