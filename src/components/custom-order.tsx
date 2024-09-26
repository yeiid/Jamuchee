"use client"
import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useCart } from "@/context/Contex";

// Tipos
type Plant = {
  id: string;
  name: string;
  price: number;
};

type Pot = {
  id: string;
  color: string;
  price: number;
};

type OrderItem = {
  id: string;
  plant: Plant;
  pot: Pot;
  quantity: number;
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

// Componente principal
const CustomOrderPage: NextPage = () => {
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [selectedPot, setSelectedPot] = useState<Pot | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { cart, dispatch } = useCart();
  // Simulación de obtención de datos del carrito
  useEffect(() => {
    // En un caso real, esto vendría de tu estado global o API
    const mockCartItems: CartItem[] = [
      { id: 'item1', name: 'Planta A', price: 15, quantity: 2 },
      { id: 'item2', name: 'Planta B', price: 20, quantity: 1 },
    ];
    setCartItems(mockCartItems);
  }, []);

  // Datos de ejemplo (en un caso real, estos datos vendrían de una API o base de datos)
  const plants: Plant[] = [
    { id: 'p1', name: 'Cactus', price: 10 },
    { id: 'p2', name: 'Suculenta', price: 15 },
    { id: 'p3', name: 'Aloe Vera', price: 20 },
  ];

  const pots: Pot[] = [
    { id: 'pot1', color: 'Terracota', price: 5 },
    { id: 'pot2', color: 'Blanco', price: 7 },
    { id: 'pot3', color: 'Negro', price: 7 },
  ];

  const addToOrder = () => {
    if (selectedPlant && selectedPot) {
      const newItem: OrderItem = {
        id: `${selectedPlant.id}-${selectedPot.id}`,
        plant: selectedPlant,
        pot: selectedPot,
        quantity
      };
      setOrder([...order, newItem]);
      setSelectedPlant(null);
      setSelectedPot(null);
      setQuantity(1);
    }
  };

  const removeFromOrder = (id: string) => {
    setOrder(order.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    setOrder(order.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ));
  };

  const calculateTotal = () => {
    const orderTotal = order.reduce((total, item) => {
      return total + (item.plant.price + item.pot.price) * item.quantity;
    }, 0);
    const cartTotal = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    return orderTotal + cartTotal;
  };

  const handleCheckout = () => {
    // Aquí iría la lógica para procesar el pedido final
    // Podrías enviar los datos a tu backend, a WhatsApp, o a donde sea necesario
    console.log('Pedido final:', { cartItems, customItems: order });
    alert('¡Pedido enviado!');
    // Redirigir al usuario a la página de confirmación o pago
    // router.push('/confirmation');
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Head>
        <title>Finalizar Pedido - Jamuche</title>
        <meta name="description" content="Personaliza y finaliza tu pedido de plantas" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">Finalizar Pedido</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Tu carrito</h2>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                  </div>
                  <span>${item.price * item.quantity}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-semibold text-green-700 mt-8 mb-4">Personaliza tu pedido</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Selecciona una planta:</label>
              <select
                value={selectedPlant?.id || ''}
                onChange={(e) => setSelectedPlant(plants.find(p => p.id === e.target.value) || null)}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Selecciona una maceta:</label>
              <select
                value={selectedPot?.id || ''}
                onChange={(e) => setSelectedPot(pots.find(p => p.id === e.target.value) || null)}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Cantidad:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <button
              onClick={addToOrder}
              disabled={!selectedPlant || !selectedPot}
              className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50"
            >
              Agregar al pedido
            </button>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Resumen del pedido</h2>

            <h3 className="text-xl font-semibold text-green-600 mb-2">Artículos del carrito</h3>
            <ul className="space-y-2 mb-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${item.price * item.quantity}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold text-green-600 mb-2">Artículos personalizados</h3>
            {order.length === 0 ? (
              <p className="text-gray-500">No has agregado artículos personalizados</p>
            ) : (
              <ul className="space-y-4">
                {order.map((item) => (
                  <li key={item.id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium">{item.plant.name} en maceta {item.pot.color}</p>
                      <div className="flex items-center mt-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-gray-200 px-2 rounded"
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-200 px-2 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-4">${(item.plant.price + item.pot.price) * item.quantity}</span>
                      <button
                        onClick={() => removeFromOrder(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 text-right">
              <p className="text-xl font-bold">Total: ${calculateTotal()}</p>
            </div>

            <button
              onClick={handleCheckout}
              disabled={cartItems.length === 0 && order.length === 0}
              className="w-full mt-4 bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50"
            >
              Finalizar pedido
            </button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default CustomOrderPage;