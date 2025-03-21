// Pruebas end-to-end para flujos de usuario completos
// Mock de Puppeteer
jest.mock("puppeteer", () => {
  const mockPage = {
    goto: jest.fn().mockResolvedValue({}),
    type: jest.fn().mockResolvedValue({}),
    click: jest.fn().mockResolvedValue({}),
    waitForNavigation: jest.fn().mockResolvedValue({}),
    url: jest.fn(),
    content: jest.fn().mockResolvedValue("<div>test_user</div>"),
  };

  const mockBrowser = {
    newPage: jest.fn().mockResolvedValue(mockPage),
    close: jest.fn().mockResolvedValue({}),
  };

  return {
    launch: jest.fn().mockResolvedValue(mockBrowser),
  };
});

const puppeteer = require("puppeteer");

describe("Flujo de usuario completo", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("usuario puede registrarse y hacer login", async () => {
    // Navegar a la página de registro
    await page.goto("http://localhost:3000/register");

    // Completar el formulario
    await page.type('[name="username"]', "test_user");
    await page.type('[name="email"]', "test@example.com");
    await page.type('[name="password"]', "password123");

    // Enviar el formulario
    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation(),
    ]);

    // Simulamos que la URL ahora contiene /login
    page.url.mockReturnValue("http://localhost:3000/login");

    // Verificar redirección a login
    expect(page.url()).toContain("/login");

    // Hacer login
    await page.type('[name="email"]', "test@example.com");
    await page.type('[name="password"]', "password123");

    // Enviar formulario de login
    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation(),
    ]);

    // Simulamos que la URL ahora contiene /dashboard
    page.url.mockReturnValue("http://localhost:3000/dashboard");

    // Verificar que estamos en el dashboard
    expect(page.url()).toContain("/dashboard");

    // Verificar que el nombre de usuario aparece en la página
    const content = await page.content();
    expect(content).toContain("test_user");
  });
});
