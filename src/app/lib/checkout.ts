import { CartItem, CustomerData, OrderSummary, CheckoutData } from "./types";

/**
 * Calcula el resumen del pedido
 */
const calculateOrderSummary = (
  items: CartItem[],
  shippingCost: number = 5,
  discountAmount: number = 0
): OrderSummary => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return {
    subtotal,
    shipping: shippingCost,
    discount: discountAmount,
    total: subtotal + shippingCost - discountAmount,
    paymentMethod: "Por determinar",
    shippingMethod: "Estándar",
  };
};

/**
 * Envía el pedido a WhatsApp y devuelve el enlace
 */
const sendOrderToWhatsApp = async (
  checkoutData: CheckoutData
): Promise<string> => {
  try {
    const response = await fetch("/api/whatsapp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkoutData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Error al enviar el pedido");
    }

    return data.whatsappLink;
  } catch (error) {
    console.error("Error al enviar el pedido a WhatsApp:", error);
    throw error;
  }
};

/**
 * Función para procesar el checkout completo
 */
export const processCheckout = async (
  items: CartItem[],
  customerData: CustomerData,
  shippingCost: number = 5,
  discountAmount: number = 0,
  paymentMethod: string = "Por determinar",
  shippingMethod: string = "Estándar",
  notes?: string
): Promise<string> => {
  // Calcular el resumen del pedido
  const orderSummary = calculateOrderSummary(
    items,
    shippingCost,
    discountAmount
  );

  // Actualizar métodos de pago y envío
  orderSummary.paymentMethod = paymentMethod;
  orderSummary.shippingMethod = shippingMethod;
  orderSummary.notes = notes;

  // Preparar los datos completos del checkout
  const checkoutData: CheckoutData = {
    customer: customerData,
    items,
    order: orderSummary,
  };

  // Enviar a WhatsApp y obtener el enlace
  return await sendOrderToWhatsApp(checkoutData);
};
