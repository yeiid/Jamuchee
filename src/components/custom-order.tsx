"use client";

import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useCart } from "@/context/Contex";
import { Plant, Pot, OrderItem } from "@/app/lib/types";

const CustomOrderPage: NextPage = () => {
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [selectedPot, setSelectedPot] = useState<Pot | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { cart } = useCart();

  useEffect(() => {
    console.log("Carrito actualizado:", cart);
  }, [cart]);

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
        id: `${selectedPlant.id}-${selectedPot.id}`,
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
    setOrder(
      order.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const calculateTotal = () => {
    const orderTotal = order.reduce((total, item) => {
      return total + (item.plant.price + item.pot.price) * item.quantity;
    }, 0);
    const cartTotal = cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    return orderTotal + cartTotal;
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    const cartDetails = cart.map(
      (item) =>
        `${item.quantity} x ${item.name} - $${
          item.price * item.quantity
        } ${order}`
    );
    const message = `¡Hola! Estoy interesado en comprar:\n${cartDetails.join(
      "\n"
    )}\nTotal: $${calculateTotal()}`;

    const phoneNumber = "3160457939";
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Head>
        <title>Finalizar Pedido - Jamuche</title>
        <meta
          name="description"
          content="Personaliza y finaliza tu pedido de plantas"
        />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">
          Finalizar Pedido
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Sección del carrito */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Tu carrito
            </h2>
            {cart.length === 0 ? (
              <p className="text-gray-500">Tu carrito está vacío</p>
            ) : (
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <p className="font-medium text-green-600">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Cantidad: {item.quantity}
                      </p>
                    </div>
                    <span className="text-green-700 font-semibold">
                      ${item.price * item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Sección de personalización */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
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
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Selecciona una planta</option>
                {plants.map((plant) => (
                  <option key={plant.id} value={plant.id}>
                    {plant.name} - ${plant.price}
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
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Selecciona una maceta</option>
                {pots.map((pot) => (
                  <option key={pot.id} value={pot.id}>
                    {pot.color} - ${pot.price}
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
                  setQuantity(Math.max(1, parseInt(e.target.value)))
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <button
              onClick={addToOrder}
              disabled={!selectedPlant || !selectedPot}
              className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50 transition-all"
            >
              Agregar al pedido
            </button>

            {/* Resumen de artículos personalizados */}
            <h3 className="text-xl font-semibold text-green-600 mt-8 mb-2">
              Resumen del pedido
            </h3>
            {order.length === 0 ? (
              <p className="text-gray-500">No has agregado artículos</p>
            ) : (
              <ul className="space-y-4">
                {order.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <p className="font-medium text-green-600">
                        {item.plant.name} en maceta {item.pot.color}
                      </p>
                      <div className="flex items-center mt-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="bg-gray-200 px-2 rounded"
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="bg-gray-200 px-2 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <span className="text-green-700 font-semibold">
                      ${item.plant.price + item.pot.price}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <div className="mt-8 bg-green-200 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold text-green-900 mb-4">
            Total del pedido: ${calculateTotal()}
          </h3>
          <button
            onClick={handleCheckout}
            className="bg-green-700 text-white font-bold py-2 px-4 rounded hover:bg-green-800 transition-all"
          >
            Finalizar Pedido
          </button>
        </div>
      </main>
    </div>
  );
};

export default CustomOrderPage;
