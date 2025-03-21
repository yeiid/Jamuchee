"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/useCartStore";
import { CustomerData, OrderSummary, CheckoutData } from "@/app/lib/types";
import Image from "next/image";
import { CreditCard, Lock } from "lucide-react";

export default function PaymentPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "pending" | "success" | "error"
  >("pending");
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);

  useEffect(() => {
    // Obtener los datos del pedido del localStorage
    const savedData = localStorage.getItem("paymentData");
    if (savedData) {
      setCheckoutData(JSON.parse(savedData));
    } else {
      // Si no hay datos guardados, redirigir al checkout
      router.push("/checkout");
    }
  }, [router]);

  // Simular proceso de pago
  const handlePayment = async () => {
    setIsLoading(true);
    try {
      // Aquí iría la integración con la pasarela de pago real
      // Por ahora simulamos un proceso de pago
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setPaymentStatus("success");
      clearCart();
      localStorage.removeItem("paymentData"); // Limpiar datos del pedido
    } catch (error) {
      console.error("Error en el pago:", error);
      setPaymentStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!checkoutData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Cargando datos del pedido...
          </h1>
        </div>
      </div>
    );
  }

  const { customer, order } = checkoutData;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Pago seguro</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Detalles del pedido */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Detalles del pedido</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4"
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
                        {item.quantity} × {item.price}€
                      </p>
                    </div>
                  </div>
                  <span className="font-medium">
                    {(item.price * item.quantity).toFixed(2)}€
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span>{order.subtotal.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Envío</span>
                <span>{order.shipping.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{order.total.toFixed(2)}€</span>
              </div>
            </div>
          </div>

          {/* Información del cliente */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Información de entrega</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Nombre:</span> {customer.name}
              </p>
              <p>
                <span className="font-medium">Teléfono:</span> {customer.phone}
              </p>
              <p>
                <span className="font-medium">Dirección:</span>{" "}
                {customer.address}
              </p>
            </div>
          </div>
        </div>

        {/* Formulario de pago */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-6">
              <Lock className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-600">
                Pago seguro con encriptación SSL
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Número de tarjeta
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="expiry"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Fecha de expiración
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    placeholder="MM/AA"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    placeholder="123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isLoading}
                className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {isLoading ? "Procesando pago..." : "Pagar ahora"}
              </button>

              {paymentStatus === "success" && (
                <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-md">
                  <p className="text-center">
                    ¡Pago exitoso! Tu pedido ha sido confirmado.
                  </p>
                  <button
                    onClick={() => router.push("/")}
                    className="w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Volver a la tienda
                  </button>
                </div>
              )}

              {paymentStatus === "error" && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
                  <p className="text-center">
                    Hubo un error al procesar el pago. Por favor, intenta de
                    nuevo.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
