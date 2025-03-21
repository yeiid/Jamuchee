"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/useCartStore";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Trash2, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calcular totales
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = items.length > 0 ? 5 : 0;
  const total = subtotal + shippingCost;

  if (!mounted) {
    return <div className="container mx-auto px-4 py-8">Cargando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Carrito de compra</h1>

      {items.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="py-8">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-600 mb-6">
              Parece que aún no has añadido ningún producto a tu carrito.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Ver productos
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Lista de productos */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Producto
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Precio
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Cantidad
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            {item.image && (
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={64}
                                height={64}
                                className="h-full w-full object-cover object-center"
                              />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.price.toFixed(2)}€
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center border rounded-md w-28">
                          <button
                            className="px-3 py-1 text-gray-600 hover:text-gray-800"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-gray-800 border-x w-10 text-center">
                            {item.quantity}
                          </span>
                          <button
                            className="px-3 py-1 text-gray-600 hover:text-gray-800"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {(item.price * item.quantity).toFixed(2)}€
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <Link
                href="/"
                className="flex items-center text-primary-600 hover:text-primary-800"
              >
                <ArrowLeft className="mr-1 h-4 w-4" /> Seguir comprando
              </Link>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center py-2">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="text-sm font-medium text-gray-900">
                    {subtotal.toFixed(2)}€
                  </p>
                </div>
                <div className="flex justify-between items-center py-2">
                  <p className="text-sm text-gray-600">Envío</p>
                  <p className="text-sm font-medium text-gray-900">
                    {shippingCost.toFixed(2)}€
                  </p>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-gray-200">
                  <p className="text-base font-medium text-gray-900">Total</p>
                  <p className="text-base font-medium text-gray-900">
                    {total.toFixed(2)}€
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full bg-primary-600 text-white px-6 py-3 rounded-md font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Finalizar compra
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
