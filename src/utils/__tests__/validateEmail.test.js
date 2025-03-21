const validateEmail = require("../validateEmail");

describe("Validación de email", () => {
  test("detecta emails válidos", () => {
    expect(validateEmail("usuario@dominio.com")).toBeTruthy();
    expect(validateEmail("usuario.nombre@dominio.co")).toBeTruthy();
    expect(validateEmail("usuario-nombre@dominio.com.mx")).toBeTruthy();
  });

  test("rechaza emails inválidos", () => {
    expect(validateEmail("usuario@")).toBeFalsy();
    expect(validateEmail("usuario@dominio")).toBeFalsy();
    expect(validateEmail("@dominio.com")).toBeFalsy();
    expect(validateEmail("usuario dominio.com")).toBeFalsy();
    expect(validateEmail("")).toBeFalsy();
  });
});
