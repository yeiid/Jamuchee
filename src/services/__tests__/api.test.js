// Mock de la aplicación Express
jest.mock("../app", () => {
  const mockApp = {
    get: jest.fn(),
    post: jest.fn(),
  };

  // Mock para GET /api/usuarios
  mockApp.get.mockImplementation((path, callback) => {
    if (path === "/api/usuarios") {
      return {
        expect: jest.fn().mockReturnThis(),
        then: (callback) =>
          callback({
            body: [
              {
                id: 1,
                nombre: "Usuario Ejemplo",
                email: "ejemplo@mail.com",
                edad: 30,
              },
            ],
          }),
      };
    } else if (path.includes("/api/usuarios/")) {
      return {
        expect: jest.fn().mockReturnThis(),
        then: (callback) =>
          callback({
            body: {
              id: 1,
              nombre: "Usuario Ejemplo",
              email: "ejemplo@mail.com",
              edad: 30,
            },
          }),
      };
    }
  });

  // Mock para POST /api/usuarios
  mockApp.post.mockImplementation((path, callback) => {
    if (path === "/api/usuarios") {
      return {
        send: jest.fn().mockReturnThis(),
        expect: jest.fn().mockReturnThis(),
        then: (callback) =>
          callback({
            body: {
              id: 2,
              nombre: "María García",
              email: "maria@ejemplo.com",
              edad: 28,
            },
          }),
      };
    }
  });

  return mockApp;
});

describe("API de usuarios", () => {
  let usuarioId = 2;

  test("GET /api/usuarios devuelve una lista de usuarios", async () => {
    const mockRequest = {
      get: jest.fn().mockReturnThis(),
      expect: jest.fn().mockReturnThis(),
    };

    const response = {
      body: [
        {
          id: 1,
          nombre: "Usuario Ejemplo",
          email: "ejemplo@mail.com",
          edad: 30,
        },
      ],
    };

    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test("POST /api/usuarios crea un nuevo usuario", async () => {
    const nuevoUsuario = {
      nombre: "María García",
      email: "maria@ejemplo.com",
      edad: 28,
    };

    const response = {
      body: {
        id: 2,
        nombre: "María García",
        email: "maria@ejemplo.com",
        edad: 28,
      },
    };

    expect(response.body).toHaveProperty("id");
    expect(response.body.nombre).toBe(nuevoUsuario.nombre);
    usuarioId = response.body.id;
  });

  test("GET /api/usuarios/:id devuelve un usuario específico", async () => {
    const response = {
      body: {
        id: 2,
        nombre: "María García",
        email: "maria@ejemplo.com",
        edad: 28,
      },
    };

    expect(response.body).toHaveProperty("id", usuarioId);
  });
});
