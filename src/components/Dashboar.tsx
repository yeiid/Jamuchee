import React from "react";

const Dashboard = () => {
  return (
    <div className="container">
      <h1>Dashboard</h1>

      <div className="form-group">
        <label htmlFor="price">Precio:</label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Ingrese el nuevo precio"
          required
          className="w-full p-4 border border-gray-300 rounded"
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Imagen:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          required
          className="block mt-1"
        />
      </div>

      <div className="form-group">
        <button className="p-4 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700">
          Actualizar
        </button>
      </div>
    </div>
  );
};

export default Dashboard;