"use client";

import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import useCartStore from "@/store/useCartStore";
import { Plant, Pot, OrderItem } from "@/app/lib/types";
import { ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";

const CustomOrderPage: NextPage = () => {
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [selectedPot, setSelectedPot] = useState<Pot | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  // Usar Zustand directamente
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  // Este useEffect asegura que el componente solo se renderice completamente en el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const plants: Plant[] = [
    { id: "p1", name: "Cactus", price: 10 },
    { id: "p2", name: "Suculenta", price: 15 },
    { id: "p3", name: "Aloe Vera", price: 20 },
  ];

  const pots: Pot[] = [
    { id: "pot1", color: "Terracota", price: 5 },
    { id: "pot2", color: "Blanco", price: 7 },
    { id: "pot3", color: "Negro", price: 7 },
  ];

  const addToOrder = () => {
    if (selectedPlant && selectedPot) {
      const newItem: OrderItem = {
        id: `${selectedPlant.id}-${selectedPot.id}-${Date.now()}`,
        plant: selectedPlant,
        pot: selectedPot,
        quantity,
      };
      setOrder([...order, newItem]);
      setSelectedPlant(null);
      setSelectedPot(null);
      setQuantity(1);
    }
  };

  const removeFromOrder = (id: string) => {
    setOrder(order.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromOrder(id);
      return;
    }

    setOrder(
      order.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateTotal = () => {
    if (!isMounted) return "0.00";

    const orderTotal = order.reduce((total, item) => {
      return total + (item.plant.price + item.pot.price) * item.quantity;
    }, 0);
    const cartTotal = getTotalPrice();
    return (orderTotal + cartTotal).toFixed(2);
  };

  const calculateOrderTotal = () => {
    return order
      .reduce((total, item) => {
        return total + (item.plant.price + item.pot.price) * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    if (items.length === 0 && order.length === 0) {
      alert("No hay productos en tu pedido");
      return;
    }

    let message = "¡Hola! Estoy interesado en comprar:\n";

    // Agregar items del carrito al mensaje
    if (items.length > 0) {
      message += "\nPRODUCTOS DEL CATÁLOGO:\n";
      items.forEach((item) => {
        message += `${item.quantity} x ${item.name} - $${(
          item.price * item.quantity
        ).toFixed(2)}\n`;
      });
    }

    // Agregar pedidos personalizados al mensaje
    if (order.length > 0) {
      message += "\nPRODUCTOS PERSONALIZADOS:\n";
      order.forEach((item) => {
        message += `${item.quantity} x ${item.plant.name} en maceta ${
          item.pot.color
        } - $${((item.plant.price + item.pot.price) * item.quantity).toFixed(
          2
        )}\n`;
      });
    }

    message += `\nTotal: $${calculateTotal()}`;

    const phoneNumber = "3058079573";
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary-800 mb-8 text-center">
          Finalizar Pedido
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Sección del carrito */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-primary-700 mb-4 flex items-center">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Tu carrito
            </h2>
            {!isMounted || items.length === 0 ? (
              <div className="text-gray-500 bg-gray-50 p-4 rounded-lg text-center">
                <p>Tu carrito está vacío</p>
                <p className="text-sm mt-1">
                  Puedes agregar productos desde nuestra tienda
                </p>
              </div>
            ) : (
              <div>
                <ul className="space-y-4 mb-4">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center border-b pb-3"
                    >
                      <div>
                        <p className="font-medium text-primary-700">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <span className="text-primary-700 font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="text-right font-medium text-primary-800">
                  Subtotal: ${isMounted ? getTotalPrice().toFixed(2) : "0.00"}
                </div>
              </div>
            )}
          </section>

          {/* Sección de personalización */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-primary-700 mb-4">
              Personaliza tu pedido
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecciona una planta:
              </label>
              <select
                value={selectedPlant?.id || ""}
                onChange={(e) =>
                  setSelectedPlant(
                    plants.find((p) => p.id === e.target.value) || null
                  )
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Selecciona una planta</option>
                {plants.map((plant) => (
                  <option key={plant.id} value={plant.id}>
                    {plant.name} - ${plant.price.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecciona una maceta:
              </label>
              <select
                value={selectedPot?.id || ""}
                onChange={(e) =>
                  setSelectedPot(
                    pots.find((p) => p.id === e.target.value) || null
                  )
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Selecciona una maceta</option>
                {pots.map((pot) => (
                  <option key={pot.id} value={pot.id}>
                    {pot.color} - ${pot.price.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cantidad:
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <button
              onClick={addToOrder}
              disabled={!selectedPlant || !selectedPot}
              className="w-full bg-primary-600 text-white font-bold py-2 px-4 rounded hover:bg-primary-700 disabled:opacity-50 transition-colors"
            >
              Agregar al pedido
            </button>

            {/* Resumen de artículos personalizados */}
            <h3 className="text-lg font-semibold text-primary-600 mt-8 mb-3">
              Artículos personalizados
            </h3>
            {order.length === 0 ? (
              <div className="text-gray-500 bg-gray-50 p-4 rounded-lg text-center">
                <p>No has agregado artículos personalizados</p>
                <p className="text-sm mt-1">
                  Combina plantas y macetas para crear tu pedido único
                </p>
              </div>
            ) : (
              <div>
                <ul className="space-y-4 mb-4">
                  {order.map((item) => (
                    <li
                      key={item.id}
                      className="border rounded-lg p-3 bg-gray-50"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-primary-700">
                            {item.plant.name} en maceta {item.pot.color}
                          </p>
                          <p className="text-sm text-gray-500">
                            ${(item.plant.price + item.pot.price).toFixed(2)} x{" "}
                            {item.quantity}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromOrder(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          aria-label="Eliminar"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-white rounded border">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 hover:bg-gray-100 text-gray-600 rounded-l"
                            aria-label="Disminuir cantidad"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-gray-100 text-gray-600 rounded-r"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="font-semibold text-primary-700">
                          $
                          {(
                            (item.plant.price + item.pot.price) *
                            item.quantity
                          ).toFixed(2)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="text-right font-medium text-primary-800">
                  Subtotal personalizado: ${calculateOrderTotal()}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Total y botón de finalizar */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-primary-800">
              Total del pedido
            </h2>
            <span className="text-2xl font-bold text-primary-700">
              ${calculateTotal()}
            </span>
          </div>
          <p className="text-gray-600 mb-4">
            Al hacer clic en "Finalizar pedido", serás redirigido a WhatsApp
            para completar tu compra.
          </p>
          <button
            onClick={handleCheckout}
            className="w-full bg-primary-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
            disabled={!isMounted || (items.length === 0 && order.length === 0)}
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Finalizar pedido
          </button>
        </div>
      </main>
    </div>
  );
};

export default CustomOrderPage;
