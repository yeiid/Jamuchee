const userService = require("../userService");
const apiClient = require("../apiClient");
jest.mock("../apiClient");

describe("UserService", () => {
  beforeEach(() => {
    // Limpiamos todas las simulaciones entre pruebas
    jest.clearAllMocks();
  });

  test("getUserDetails obtiene datos del usuario correctamente", async () => {
    // Configuramos el mock para que devuelva datos simulados
    const mockUsuario = {
      id: 1,
      nombre: "Ana López",
      email: "ana@ejemplo.com",
    };
    apiClient.get.mockResolvedValue({ data: mockUsuario });

    // Llamamos a la función que queremos probar
    const result = await userService.getUserDetails(1);

    // Verificamos que se llamó a la API con los parámetros correctos
    expect(apiClient.get).toHaveBeenCalledWith("/users/1");

    // Verificamos que el resultado es el esperado
    expect(result).toEqual(mockUsuario);
  });

  test("getUserDetails maneja errores correctamente", async () => {
    // Simulamos un error de la API
    const mockError = new Error("Error de red");
    apiClient.get.mockRejectedValue(mockError);

    // Verificamos que se lance una excepción
    await expect(userService.getUserDetails(1)).rejects.toThrow(
      "No se pudo obtener el usuario"
    );
  });
});
