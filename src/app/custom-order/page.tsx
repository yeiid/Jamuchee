"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useCartStore from "@/store/useCartStore";

export default function CustomOrderPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    if (!name || !email || !description || !budget) {
      alert("Por favor, complete todos los campos obligatorios");
      return;
    }

    // En un caso real, aquí enviaríamos los datos al servidor
    // Para este ejemplo, simplemente agregaremos un item personalizado al carrito

    if (isMounted) {
      addToCart({
        id: `custom-${Date.now()}`,
        name: `Pedido personalizado: ${name}`,
        price: parseFloat(budget),
        quantity: 1,
        image: "/placeholder.jpg", // Usar una imagen existente en public
      });

      // Redirigir al carrito
      router.push("/cart");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-primary-50 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-primary-800 mb-6">
          Crear Pedido Personalizado
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-primary-700 mb-4">
              ¿Cómo funciona?
            </h2>
            <div className="bg-white p-4 rounded-lg mb-6">
              <ol className="list-decimal list-inside text-gray-700 space-y-2">
                <li>Describe el tipo de arreglo o planta que estás buscando</li>
                <li>Indica tu presupuesto aproximado</li>
                <li>Opcionalmente, sube una imagen de referencia</li>
                <li>Proporciona tus datos de contacto</li>
                <li>
                  Nuestro equipo evaluará tu solicitud y te responderá en 24-48
                  horas
                </li>
              </ol>
            </div>

            <h2 className="text-xl font-semibold text-primary-700 mb-4">
              Beneficios de un pedido personalizado
            </h2>
            <div className="bg-white p-4 rounded-lg">
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Creaciones únicas adaptadas a tus necesidades</li>
                <li>Asesoramiento personalizado</li>
                <li>
                  Posibilidad de incluir plantas no disponibles en catálogo
                </li>
                <li>Diseños exclusivos para ocasiones especiales</li>
                <li>Adaptación a espacios específicos</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Descripción detallada *
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[120px]"
                  required
                  placeholder="Describe qué tipo de arreglo buscas, qué plantas te gustaría incluir, para qué ocasión, etc."
                />
              </div>

              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Presupuesto aproximado (USD) *
                </label>
                <input
                  type="number"
                  id="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  min="1"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Imagen de referencia (opcional)
                </label>
                <input
                  type="file"
                  id="image"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  accept="image/*"
                />
              </div>

              {preview && (
                <div className="mt-4">
                  <p className="text-sm text-gray-700 mb-2">Vista previa:</p>
                  <Image
                    src={preview}
                    alt="Vista previa"
                    width={200}
                    height={150}
                    className="rounded-md"
                  />
                </div>
              )}

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Enviar solicitud
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
