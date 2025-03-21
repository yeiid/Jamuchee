// Datos de productos para pruebas
module.exports = {
  singleProduct: {
    id: 1,
    nombre: "Producto de prueba",
    precio: 99.99,
    disponible: true,
    categorias: ["electrónica", "gadgets"],
  },
  multipleProducts: [
    {
      id: 1,
      nombre: "Producto A",
      precio: 99.99,
      disponible: true,
      categorias: ["electrónica", "gadgets"],
    },
    {
      id: 2,
      nombre: "Producto B",
      precio: 49.99,
      disponible: false,
      categorias: ["hogar"],
    },
    {
      id: 3,
      nombre: "Producto C",
      precio: 149.99,
      disponible: true,
      categorias: ["electrónica", "computadoras"],
    },
  ],
};
