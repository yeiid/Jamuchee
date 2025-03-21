const sum = require("../sum");

test("suma 1 + 2 para obtener 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("suma números negativos correctamente", () => {
  expect(sum(-1, -2)).toBe(-3);
});

test("suma decimales correctamente", () => {
  expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
});

test("maneja valores no numéricos", () => {
  expect(() => sum("a", 2)).toThrow();
  expect(() => sum(1, "b")).toThrow();
});
