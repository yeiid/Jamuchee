"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "../AdminLayout";
import {
  Search,
  Filter,
  Download,
  Eye,
  Phone,
  CheckCircle,
  XCircle,
  Clock,
  TruckIcon,
  FileText,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Tipos para los datos
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Order {
  id: string;
  date: Date;
  status: "pending" | "processing" | "completed" | "cancelled";
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: string;
  shippingMethod: string;
  notes?: string;
}

// Datos de ejemplo para pedidos
const generateMockOrders = (): Order[] => {
  return [
    {
      id: "ORD-001",
      date: new Date("2023-10-15"),
      status: "completed",
      customer: {
        name: "Ana García",
        email: "ana.garcia@ejemplo.com",
        phone: "612345678",
        address: "Calle Principal 123, Madrid",
      },
      items: [
        { name: "Producto A", quantity: 2, price: 25.99 },
        { name: "Producto B", quantity: 1, price: 19.99 },
      ],
      subtotal: 71.97,
      shipping: 5,
      discount: 0,
      total: 76.97,
      paymentMethod: "Transferencia bancaria",
      shippingMethod: "Estándar",
    },
    {
      id: "ORD-002",
      date: new Date("2023-10-18"),
      status: "processing",
      customer: {
        name: "Carlos Rodríguez",
        email: "carlos.rodriguez@ejemplo.com",
        phone: "623456789",
        address: "Avenida Central 45, Barcelona",
      },
      items: [{ name: "Producto C", quantity: 1, price: 59.99 }],
      subtotal: 59.99,
      shipping: 5,
      discount: 5,
      total: 59.99,
      paymentMethod: "Efectivo contra reembolso",
      shippingMethod: "Express",
      notes: "Llamar antes de entregar",
    },
    {
      id: "ORD-003",
      date: new Date("2023-10-20"),
      status: "pending",
      customer: {
        name: "María López",
        email: "maria.lopez@ejemplo.com",
        phone: "634567890",
        address: "Plaza Mayor 8, Valencia",
      },
      items: [
        { name: "Producto A", quantity: 3, price: 25.99 },
        { name: "Producto D", quantity: 1, price: 45.5 },
      ],
      subtotal: 123.47,
      shipping: 5,
      discount: 10,
      total: 118.47,
      paymentMethod: "Transferencia bancaria",
      shippingMethod: "Estándar",
    },
    {
      id: "ORD-004",
      date: new Date("2023-10-22"),
      status: "cancelled",
      customer: {
        name: "Pedro Sánchez",
        email: "pedro.sanchez@ejemplo.com",
        phone: "645678901",
        address: "Calle Nueva 56, Sevilla",
      },
      items: [{ name: "Producto B", quantity: 2, price: 19.99 }],
      subtotal: 39.98,
      shipping: 5,
      discount: 0,
      total: 44.98,
      paymentMethod: "Efectivo contra reembolso",
      shippingMethod: "Estándar",
    },
  ];
};

// Mapa para colores de estado
const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

// Mapa para íconos de estado
const StatusIcon = ({ status }: { status: Order["status"] }) => {
  switch (status) {
    case "pending":
      return <Clock className="w-4 h-4 mr-1" />;
    case "processing":
      return <TruckIcon className="w-4 h-4 mr-1" />;
    case "completed":
      return <CheckCircle className="w-4 h-4 mr-1" />;
    case "cancelled":
      return <XCircle className="w-4 h-4 mr-1" />;
  }
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Order["status"] | "all">(
    "all"
  );
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Cargar datos de pedidos (simulado)
    setOrders(generateMockOrders());
  }, []);

  // Filtrar pedidos según los criterios
  const filteredOrders = orders.filter((order) => {
    // Filtrar por estado
    if (statusFilter !== "all" && order.status !== statusFilter) return false;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        order.id.toLowerCase().includes(term) ||
        order.customer.name.toLowerCase().includes(term) ||
        order.customer.email.toLowerCase().includes(term)
      );
    }

    return true;
  });

  // Formatear fecha
  const formatDate = (date: Date) => {
    return format(date, "dd MMM yyyy", { locale: es });
  };

  // Función para generar el mensaje de WhatsApp
  const generateWhatsAppMessage = (order: Order): string => {
    let message = `🛒 *RESUMEN DE PEDIDO: ${order.id}* 🛒\n\n`;

    // Información del cliente
    message += "*DATOS DEL CLIENTE:*\n";
    message += `👤 Nombre: ${order.customer.name}\n`;
    message += `📱 Teléfono: ${order.customer.phone}\n`;
    message += `📧 Email: ${order.customer.email}\n`;
    message += `🏠 Dirección: ${order.customer.address}\n\n`;

    // Información de los productos
    message += "*PRODUCTOS:*\n";
    order.items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - ${item.quantity} × ${
        item.price
      }€ = ${(item.quantity * item.price).toFixed(2)}€\n`;
    });
    message += "\n";

    // Información del total
    message += "*RESUMEN DEL PEDIDO:*\n";
    message += `💰 Subtotal: ${order.subtotal.toFixed(2)}€\n`;
    message += `🚚 Envío: ${order.shipping.toFixed(2)}€\n`;

    if (order.discount > 0) {
      message += `🏷️ Descuento: -${order.discount.toFixed(2)}€\n`;
    }

    message += `💵 *TOTAL: ${order.total.toFixed(2)}€*\n\n`;

    // Método de pago y envío
    message += "*DETALLES ADICIONALES:*\n";
    message += `💳 Método de pago: ${order.paymentMethod}\n`;
    message += `📦 Método de envío: ${order.shippingMethod}\n`;

    if (order.notes) {
      message += `📝 Notas: ${order.notes}\n`;
    }

    return message;
  };

  // Función para reenviar pedido por WhatsApp
  const resendOrderToWhatsApp = (order: Order) => {
    const message = generateWhatsAppMessage(order);
    const phoneNumber =
      process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS_PHONE || "34612345678";
    const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");
  };

  // Función para actualizar el estado de un pedido
  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Gestión de Pedidos
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Administra los pedidos de tus clientes
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <Download
                className="mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Exportar pedidos
            </button>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex space-x-2">
                <button
                  onClick={() => setStatusFilter("all")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    statusFilter === "all"
                      ? "bg-primary-100 text-primary-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setStatusFilter("pending")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    statusFilter === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Clock className="inline-block w-4 h-4 mr-1" />
                  Pendientes
                </button>
                <button
                  onClick={() => setStatusFilter("processing")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    statusFilter === "processing"
                      ? "bg-blue-100 text-blue-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <TruckIcon className="inline-block w-4 h-4 mr-1" />
                  En proceso
                </button>
                <button
                  onClick={() => setStatusFilter("completed")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    statusFilter === "completed"
                      ? "bg-green-100 text-green-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <CheckCircle className="inline-block w-4 h-4 mr-1" />
                  Completados
                </button>
                <button
                  onClick={() => setStatusFilter("cancelled")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    statusFilter === "cancelled"
                      ? "bg-red-100 text-red-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <XCircle className="inline-block w-4 h-4 mr-1" />
                  Cancelados
                </button>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  placeholder="Buscar pedido..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de pedidos */}
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        ID Pedido
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Cliente
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Fecha
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Total
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Estado
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Acciones</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {order.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="font-medium text-gray-900">
                            {order.customer.name}
                          </div>
                          <div className="text-gray-500">
                            {order.customer.email}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {formatDate(order.date)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                          {order.total.toFixed(2)}€
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              statusColors[order.status]
                            }`}
                          >
                            <StatusIcon status={order.status} />
                            {order.status === "pending" && "Pendiente"}
                            {order.status === "processing" && "En proceso"}
                            {order.status === "completed" && "Completado"}
                            {order.status === "cancelled" && "Cancelado"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setIsModalOpen(true);
                              }}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              <Eye className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                              onClick={() => resendOrderToWhatsApp(order)}
                              className="text-green-600 hover:text-green-900"
                            >
                              <Phone className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                              onClick={() => {
                                // Generar factura (simulado)
                                alert(
                                  `Generando factura para el pedido ${order.id}`
                                );
                              }}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              <FileText
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredOrders.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-sm text-gray-500">
                      No se encontraron pedidos que coincidan con los criterios
                      de búsqueda.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal de detalles del pedido */}
        {isModalOpen && selectedOrder && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-3xl w-full mx-auto p-6 shadow-xl overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Detalles del Pedido {selectedOrder.id}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 mb-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Fecha</h4>
                    <p className="mt-1 text-sm text-gray-900">
                      {formatDate(selectedOrder.date)}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Estado
                    </h4>
                    <div className="mt-1">
                      <select
                        value={selectedOrder.status}
                        onChange={(e) =>
                          updateOrderStatus(
                            selectedOrder.id,
                            e.target.value as Order["status"]
                          )
                        }
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                      >
                        <option value="pending">Pendiente</option>
                        <option value="processing">En proceso</option>
                        <option value="completed">Completado</option>
                        <option value="cancelled">Cancelado</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Datos del Cliente
                  </h4>
                  <div className="bg-gray-50 rounded-md p-4">
                    <p className="text-sm text-gray-900">
                      {selectedOrder.customer.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedOrder.customer.email}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedOrder.customer.phone}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedOrder.customer.address}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Productos
                  </h4>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Producto
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Cantidad
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Precio
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                            {item.name}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                            {item.quantity}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                            {item.price.toFixed(2)}€
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                            {(item.quantity * item.price).toFixed(2)}€
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Resumen
                  </h4>
                  <div className="bg-gray-50 rounded-md p-4">
                    <div className="flex justify-between py-1">
                      <span className="text-sm text-gray-500">Subtotal:</span>
                      <span className="text-sm text-gray-900">
                        {selectedOrder.subtotal.toFixed(2)}€
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-sm text-gray-500">Envío:</span>
                      <span className="text-sm text-gray-900">
                        {selectedOrder.shipping.toFixed(2)}€
                      </span>
                    </div>
                    {selectedOrder.discount > 0 && (
                      <div className="flex justify-between py-1">
                        <span className="text-sm text-gray-500">
                          Descuento:
                        </span>
                        <span className="text-sm text-gray-900">
                          -{selectedOrder.discount.toFixed(2)}€
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between py-1 border-t border-gray-200 mt-2 pt-2">
                      <span className="text-sm font-medium text-gray-900">
                        Total:
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedOrder.total.toFixed(2)}€
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Datos Adicionales
                  </h4>
                  <div className="bg-gray-50 rounded-md p-4">
                    <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2">
                      <div>
                        <span className="text-sm text-gray-500">
                          Método de pago:
                        </span>
                        <p className="text-sm text-gray-900">
                          {selectedOrder.paymentMethod}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">
                          Método de envío:
                        </span>
                        <p className="text-sm text-gray-900">
                          {selectedOrder.shippingMethod}
                        </p>
                      </div>
                      {selectedOrder.notes && (
                        <div className="sm:col-span-2 mt-2">
                          <span className="text-sm text-gray-500">Notas:</span>
                          <p className="text-sm text-gray-900">
                            {selectedOrder.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => resendOrderToWhatsApp(selectedOrder)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Enviar por WhatsApp
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
