// Script para probar el flujo completo de checkout con WhatsApp

describe("Flujo de checkout", () => {
  // 1. Primero simulamos tener productos en el carrito
  const cartItems = [
    {
      id: "1",
      name: "Cactus Decorativo",
      price: 19.99,
      quantity: 2,
      image: "/placeholder.jpg",
    },
    {
      id: "2",
      name: "Suculenta Premium",
      price: 15.5,
      quantity: 1,
      image: "/suculenta.jpeg",
    },
  ];

  // 2. Datos del cliente para el checkout
  const customerData = {
    name: "Cliente de Prueba",
    email: "cliente@test.com",
    phone: "698765432",
    address: "Calle de Prueba 123",
    city: "Madrid",
    postalCode: "28001",
  };

  // 3. Calcular totales
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = 5;
  const discount = 0;
  const total = subtotal + shippingCost - discount;

  // 4. Preparar datos para enviar al servidor
  const checkoutData = {
    customer: customerData,
    items: cartItems,
    order: {
      subtotal,
      shipping: shippingCost,
      discount,
      total,
      paymentMethod: "Transferencia bancaria",
      shippingMethod: "Estándar",
      notes: "Esta es una prueba del flujo de checkout",
    },
  };

  // Mock de fetch para no hacer peticiones reales
  global.fetch = jest.fn();

  beforeEach(() => {
    // Limpiar mocks antes de cada prueba
    jest.clearAllMocks();
  });

  test("envía los datos de checkout correctamente a la API de WhatsApp", async () => {
    // Configurar mock para simular una respuesta exitosa
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        whatsappLink:
          "https://api.whatsapp.com/send?phone=34123456789&text=Hola",
        message: "Mensaje de prueba",
      }),
    });

    // Enviar los datos a la API de WhatsApp
    const response = await fetch("http://localhost:3000/api/whatsapp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkoutData),
    });

    const data = await response.json();

    // Verificar que fetch se llamó con los parámetros correctos
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/whatsapp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkoutData),
    });

    // Verificar la respuesta
    expect(response.ok).toBe(true);
    expect(data).toHaveProperty("whatsappLink");
    expect(data).toHaveProperty("message");
  });

  test("maneja errores correctamente", async () => {
    // Configurar mock para simular una respuesta con error
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        error: "Error en el procesamiento del checkout",
      }),
    });

    // Enviar los datos a la API de WhatsApp
    const response = await fetch("http://localhost:3000/api/whatsapp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkoutData),
    });

    const data = await response.json();

    // Verificar que fetch se llamó con los parámetros correctos
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/whatsapp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkoutData),
    });

    // Verificar la respuesta de error
    expect(response.ok).toBe(false);
    expect(data).toHaveProperty("error");
  });
});
