import { NextResponse } from "next/server";

// Función auxiliar para formatear el mensaje de WhatsApp
const formatWhatsAppMessage = (data: any): string => {
  if (!data) return "No hay datos disponibles";

  let message = "🛒 *NUEVO PEDIDO EN JAMUCHE* 🛒\n\n";

  // Información del cliente
  if (data.customer) {
    message += "*DATOS DEL CLIENTE:*\n";
    message += `👤 Nombre: ${data.customer.name || "No disponible"}\n`;
    message += `📱 Teléfono: ${data.customer.phone || "No disponible"}\n`;
    message += `📧 Email: ${data.customer.email || "No disponible"}\n`;
    message += `🏠 Dirección: ${data.customer.address || "No disponible"}\n\n`;
  }

  // Información de los productos
  if (data.items && data.items.length > 0) {
    message += "*PRODUCTOS:*\n";

    data.items.forEach((item: any, index: number) => {
      message += `${index + 1}. ${item.name || "Producto"} - ${
        item.quantity || 1
      } × ${item.price || 0}€ = ${(item.quantity || 1) * (item.price || 0)}€\n`;
    });

    message += "\n";
  }

  // Información del total
  if (data.order) {
    message += "*RESUMEN DEL PEDIDO:*\n";
    message += `💰 Subtotal: ${data.order.subtotal || 0}€\n`;

    if (data.order.shipping) {
      message += `🚚 Envío: ${data.order.shipping}€\n`;
    }

    if (data.order.discount) {
      message += `🏷️ Descuento: -${data.order.discount}€\n`;
    }

    message += `💵 *TOTAL: ${data.order.total || 0}€*\n\n`;
  }

  // Método de pago y envío
  if (data.order) {
    message += "*DETALLES ADICIONALES:*\n";
    message += `💳 Método de pago: ${
      data.order.paymentMethod || "No especificado"
    }\n`;
    message += `📦 Método de envío: ${
      data.order.shippingMethod || "No especificado"
    }\n`;

    if (data.order.notes) {
      message += `📝 Notas: ${data.order.notes}\n`;
    }
  }

  message += "\n🙏 Gracias por su compra en Jamuche 🙏";

  return message;
};

// Validar la estructura de los datos
const validateOrderData = (data: any): string | null => {
  if (!data) {
    return "No se proporcionaron datos";
  }

  // Validar información del cliente
  if (!data.customer) {
    return "Falta la información del cliente";
  }

  // Validar productos
  if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
    return "No hay productos en el pedido";
  }

  // Validar información del pedido
  if (!data.order) {
    return "Falta la información del pedido";
  }

  return null; // Datos válidos
};

export async function GET() {
  return NextResponse.json({
    message: "API de WhatsApp funcionando correctamente",
    info: "Utiliza el método POST para enviar datos de pedido y obtener un enlace de WhatsApp",
    example: {
      customer: {
        name: "Nombre del Cliente",
        email: "cliente@ejemplo.com",
        phone: "612345678",
        address: "Dirección del cliente",
      },
      items: [
        { id: "1", name: "Producto 1", price: 19.99, quantity: 2 },
        { id: "2", name: "Producto 2", price: 12.5, quantity: 1 },
      ],
      order: {
        subtotal: 52.48,
        shipping: 5,
        discount: 0,
        total: 57.48,
        paymentMethod: "Transferencia bancaria",
        shippingMethod: "Estándar",
      },
    },
  });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validación de datos
    const validationError = validateOrderData(data);
    if (validationError) {
      return NextResponse.json(
        {
          error: validationError,
          success: false,
        },
        { status: 400 }
      );
    }

    // Formatear el mensaje para WhatsApp
    const formattedMessage = formatWhatsAppMessage(data);

    // Número de teléfono del negocio (debe incluir el código de país)
    const phoneNumber = process.env.WHATSAPP_BUSINESS_PHONE || "+573058348929";

    // Crear el enlace de WhatsApp
    const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      formattedMessage
    )}`;

    return NextResponse.json({
      success: true,
      whatsappLink,
      message: formattedMessage,
    });
  } catch (error) {
    console.error("Error al procesar la solicitud de WhatsApp:", error);

    return NextResponse.json(
      {
        error: "Error al procesar la solicitud",
        success: false,
      },
      { status: 500 }
    );
  }
}
