"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/useCartStore";
import { processCheckout } from "@/app/lib/checkout";
import { CustomerData } from "@/app/lib/types";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Trash2, ShoppingBag, Package, Phone } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart, removeFromCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState("");
  const [orderSent, setOrderSent] = useState(false);
  const [showCustomOrder, setShowCustomOrder] = useState(false);

  // Estado para los datos del cliente
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    phone: "",
    address: "",
  });

  // Estado para pedido personalizado
  const [customOrder, setCustomOrder] = useState({
    description: "",
    quantity: "",
    budget: "",
  });

  // Calcular totales
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = 5;
  const total = subtotal + shippingCost;

  // Manejar cambios en los campos de formulario
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (!showCustomOrder) {
      setCustomerData((prev) => ({ ...prev, [name]: value }));
    } else {
      if (["name", "phone", "address"].includes(name)) {
        setCustomerData((prev) => ({ ...prev, [name]: value }));
      } else {
        setCustomOrder((prev) => ({ ...prev, [name]: value }));
      }
    }
  };

  // Verificar si el formulario está completo
  const isFormComplete = () => {
    if (!showCustomOrder) {
      return (
        customerData.name !== "" &&
        customerData.phone !== "" &&
        customerData.address !== ""
      );
    } else {
      return (
        customerData.name !== "" &&
        customerData.phone !== "" &&
        customerData.address !== "" &&
        customOrder.description !== "" &&
        customOrder.quantity !== "" &&
        customOrder.budget !== ""
      );
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!showCustomOrder && items.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    if (!isFormComplete()) {
      alert("Por favor, completa todos los campos requeridos");
      return;
    }

    setIsLoading(true);

    try {
      let link;
      if (!showCustomOrder) {
        // Procesar pedido normal
        link = await processCheckout(
          items,
          customerData,
          shippingCost,
          0,
          "Transferencia bancaria",
          "Estándar",
          ""
        );
      } else {
        // Procesar pedido personalizado
        const customOrderData = {
          customer: customerData,
          items: [],
          order: {
            subtotal: 0,
            shipping: 0,
            discount: 0,
            total: 0,
            paymentMethod: "Por determinar",
            shippingMethod: "Por determinar",
            notes: `Pedido personalizado:\nCantidad: ${customOrder.quantity}\nPresupuesto: ${customOrder.budget}€\nDescripción: ${customOrder.description}`,
          },
        };

        const response = await fetch("/api/whatsapp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customOrderData),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Error al enviar el pedido");
        }
        link = data.whatsappLink;
      }

      setWhatsappLink(link);
      setOrderSent(true);

      if (!showCustomOrder) {
        clearCart();
      }
    } catch (error) {
      console.error("Error al procesar el pedido:", error);
      alert(
        "Hubo un error al procesar tu pedido. Por favor, intenta de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Finalizar pedido</h1>

      {orderSent ? (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="text-center py-8">
            <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Phone className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ¡Pedido listo para enviar!
            </h2>
            <p className="text-gray-600 mb-6">
              Hemos preparado tu pedido. Para completar el proceso, haz clic en
              el botón a continuación y envíanos el mensaje por WhatsApp.
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Enviar pedido por WhatsApp
            </a>
            <div className="mt-6">
              <button
                onClick={() => router.push("/")}
                className="text-primary-600 hover:text-primary-700"
              >
                Volver a la tienda
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Formulario */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <Link
                  href="/cart"
                  className="flex items-center text-primary-600 hover:text-primary-700"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  <span>Volver al carrito</span>
                </Link>
                <button
                  className={`px-4 py-2 rounded-md ${
                    showCustomOrder
                      ? "bg-gray-200 text-gray-700"
                      : "bg-primary-100 text-primary-700 font-medium"
                  }`}
                  onClick={() => setShowCustomOrder(false)}
                >
                  Pedido normal
                </button>
                <button
                  className={`px-4 py-2 rounded-md ${
                    showCustomOrder
                      ? "bg-primary-100 text-primary-700 font-medium"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => setShowCustomOrder(true)}
                >
                  Pedido personalizado
                </button>
              </div>

              <h2 className="text-xl font-bold mb-4">
                {showCustomOrder
                  ? "Hacer pedido personalizado"
                  : "Datos de contacto"}
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4 mb-6">
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
                      name="name"
                      value={customerData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customerData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Dirección de entrega *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={customerData.address}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>

                  {showCustomOrder && (
                    <>
                      <div>
                        <label
                          htmlFor="quantity"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Cantidad aproximada *
                        </label>
                        <input
                          type="text"
                          id="quantity"
                          name="quantity"
                          value={customOrder.quantity}
                          onChange={handleChange}
                          placeholder="Ej: 50 plantas"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="budget"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Presupuesto aproximado (€) *
                        </label>
                        <input
                          type="number"
                          id="budget"
                          name="budget"
                          value={customOrder.budget}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Descripción del pedido *
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          value={customOrder.description}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Describe el tipo de plantas que necesitas, tamaño, color, etc."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          required
                        />
                      </div>
                    </>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                >
                  {isLoading ? "Procesando..." : "Continuar con WhatsApp"}
                </button>
              </form>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:w-1/3">
            {!showCustomOrder ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>
                {items.length === 0 ? (
                  <p className="text-gray-500">Tu carrito está vacío</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            {item.image && (
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={50}
                                height={50}
                                className="rounded-md"
                              />
                            )}
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">
                                {item.quantity} × {item.price.toFixed(2)}€
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Eliminar"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Subtotal</span>
                        <span>{subtotal.toFixed(2)}€</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Envío</span>
                        <span>{shippingCost.toFixed(2)}€</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>{total.toFixed(2)}€</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Pedidos por mayor</h2>
                <p className="text-gray-600 mb-4">
                  Envíanos tu pedido personalizado y te contactaremos para darte
                  el mejor precio y condiciones.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Package className="h-5 w-5" />
                    <span>Pedidos por mayor</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <ShoppingBag className="h-5 w-5" />
                    <span>Precios especiales</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
