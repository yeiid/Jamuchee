// pages/contact.jsx

import React from "react";

const ContactPage = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>Contacto</h1>

      <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <p style={{ color: "#4B5563" }}>contacto@tuecommercedecactus.com</p>
      </div>

      <div style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <p style={{ color: "#4B5563" }}>instagram.com/tuecommercedecactus</p>
      </div>

      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Envíanos un mensaje:</h2>

      <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input type="text" placeholder="Nombre" style={{ border: "1px solid #D1D5DB", borderRadius: "0.375rem", padding: "0.5rem" }} />
        <input type="email" placeholder="Correo electrónico" style={{ border: "1px solid #D1D5DB", borderRadius: "0.375rem", padding: "0.5rem" }} />
        <textarea placeholder="Mensaje" rows={4} style={{ border: "1px solid #D1D5DB", borderRadius: "0.375rem", padding: "0.5rem" }} />
        <button type="submit" style={{ backgroundColor: "#34D399", color: "white", fontWeight: "bold", padding: "0.5rem", borderRadius: "0.375rem", cursor: "pointer" }}>Enviar</button>
      </form>
    </div>
  );
};

export default ContactPage;
