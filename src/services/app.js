// Aplicación Express simulada para pruebas
const express = require("express");
const app = express();

app.use(express.json());

let usuarios = [
  { id: 1, nombre: "Usuario Ejemplo", email: "ejemplo@mail.com", edad: 30 },
];
let nextId = 2;

// GET /api/usuarios - Obtener todos los usuarios
app.get("/api/usuarios", (req, res) => {
  res.status(200).json(usuarios);
});

// POST /api/usuarios - Crear un nuevo usuario
app.post("/api/usuarios", (req, res) => {
  const nuevoUsuario = {
    id: nextId++,
    ...req.body,
  };
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});

// GET /api/usuarios/:id - Obtener un usuario específico
app.get("/api/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }

  res.status(200).json(usuario);
});

module.exports = app;
