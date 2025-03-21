// app/admin/settings/page.tsx
"use client";

import { useState } from "react";
import { AdminLayout } from "../AdminLayout";
import {
  Save,
  Settings as SettingsIcon,
  Store,
  Mail,
  CreditCard,
  Lock,
  Smartphone,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Datos iniciales de configuración
const initialSettings = {
  store: {
    name: "Jamuche",
    description: "Tienda especializada en productos de alta calidad",
    email: "contacto@jamuche.com",
    phone: "+34 612 345 678",
    address: "Calle Principal 123, Madrid",
    logo: "/logo.png",
    currencySymbol: "€",
    allowGuestCheckout: true,
    showOutOfStock: true,
    productsPerPage: 12,
    enableReviews: true,
  },
  shipping: {
    freeShippingThreshold: 50,
    defaultShippingCost: 5,
    enableLocalPickup: true,
    localPickupDiscount: 3,
    shippingCountries: ["España", "Portugal", "Francia"],
  },
  payments: {
    enableCreditCard: true,
    enablePayPal: true,
    enableBankTransfer: true,
    allowPartialPayments: false,
    orderExpirationHours: 48,
  },
  emails: {
    orderConfirmation: true,
    shippingConfirmation: true,
    abandonedCart: false,
    welcomeEmail: true,
    marketingEmails: false,
    adminNewOrderNotification: true,
  },
  security: {
    twoFactorAuthentication: false,
    sessionTimeout: 60,
    passwordExpiration: 90,
    minPasswordLength: 8,
    requireSpecialCharacters: true,
  },
};

export default function SettingsPage() {
  const [settings, setSettings] = useState(initialSettings);
  const [activeTab, setActiveTab] = useState("store");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Función para manejar cambios en los campos de formulario
  const handleChange = (
    section: keyof typeof settings,
    field: string,
    value: any
  ) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value,
      },
    });
  };

  // Función para manejar guardado de configuración
  const handleSave = () => {
    setIsSaving(true);
    // Simulación de guardado
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage("Configuración guardada correctamente");
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setSaveMessage(""), 3000);
    }, 1000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Configuración
          </h2>
            <p className="mt-2 text-sm text-gray-600">
              Gestiona las preferencias y ajustes de la aplicación
            </p>
          </div>
          <div>
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save className="mr-1.5 h-5 w-5" aria-hidden="true" />
              {isSaving ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </div>

        {saveMessage && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  {saveMessage}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white shadow rounded-lg">
          <Tabs
            defaultValue="store"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <div className="px-4 sm:px-6 border-b border-gray-200">
              <TabsList className="flex space-x-8 -mb-px">
                <TabsTrigger
                  value="store"
                  className="py-4 px-1 border-b-2 font-medium text-sm"
                >
                  <Store className="mr-2 h-5 w-5" />
                  Tienda
                </TabsTrigger>
                <TabsTrigger
                  value="shipping"
                  className="py-4 px-1 border-b-2 font-medium text-sm"
                >
                  <Smartphone className="mr-2 h-5 w-5" />
                  Envíos
                </TabsTrigger>
                <TabsTrigger
                  value="payments"
                  className="py-4 px-1 border-b-2 font-medium text-sm"
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Pagos
                </TabsTrigger>
                <TabsTrigger
                  value="emails"
                  className="py-4 px-1 border-b-2 font-medium text-sm"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Emails
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="py-4 px-1 border-b-2 font-medium text-sm"
                >
                  <Lock className="mr-2 h-5 w-5" />
                  Seguridad
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              {/* Configuración de Tienda */}
              <TabsContent value="store">
          <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="store-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nombre de la Tienda
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="store-name"
                          id="store-name"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          value={settings.store.name}
                          onChange={(e) =>
                            handleChange("store", "name", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="store-email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email de Contacto
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          name="store-email"
                          id="store-email"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          value={settings.store.email}
                          onChange={(e) =>
                            handleChange("store", "email", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="store-phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Teléfono
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="store-phone"
                          id="store-phone"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          value={settings.store.phone}
                          onChange={(e) =>
                            handleChange("store", "phone", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="currency-symbol"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Símbolo de Moneda
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="currency-symbol"
                          id="currency-symbol"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          value={settings.store.currencySymbol}
                          onChange={(e) =>
                            handleChange(
                              "store",
                              "currencySymbol",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label
                        htmlFor="store-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Dirección
              </label>
                      <div className="mt-1">
              <input
                type="text"
                          name="store-address"
                          id="store-address"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          value={settings.store.address}
                          onChange={(e) =>
                            handleChange("store", "address", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label
                        htmlFor="store-description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Descripción
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="store-description"
                          name="store-description"
                          rows={3}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          value={settings.store.description}
                          onChange={(e) =>
                            handleChange("store", "description", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="products-per-page"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Productos por página
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="products-per-page"
                          id="products-per-page"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          value={settings.store.productsPerPage}
                          onChange={(e) =>
                            handleChange(
                              "store",
                              "productsPerPage",
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="relative flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="allow-guest-checkout"
                          name="allow-guest-checkout"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          checked={settings.store.allowGuestCheckout}
                          onChange={(e) =>
                            handleChange(
                              "store",
                              "allowGuestCheckout",
                              e.target.checked
                            )
                          }
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="allow-guest-checkout"
                          className="font-medium text-gray-700"
                        >
                          Permitir compras sin registro
                        </label>
                        <p className="text-gray-500">
                          Permitir a los usuarios comprar sin crear una cuenta.
                        </p>
                      </div>
                    </div>

                    <div className="relative flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="show-out-of-stock"
                          name="show-out-of-stock"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          checked={settings.store.showOutOfStock}
                          onChange={(e) =>
                            handleChange(
                              "store",
                              "showOutOfStock",
                              e.target.checked
                            )
                          }
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="show-out-of-stock"
                          className="font-medium text-gray-700"
                        >
                          Mostrar productos sin stock
                        </label>
                        <p className="text-gray-500">
                          Mostrar productos aunque no tengan existencias
                          disponibles.
                        </p>
                      </div>
                    </div>

                    <div className="relative flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="enable-reviews"
                          name="enable-reviews"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          checked={settings.store.enableReviews}
                          onChange={(e) =>
                            handleChange(
                              "store",
                              "enableReviews",
                              e.target.checked
                            )
                          }
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="enable-reviews"
                          className="font-medium text-gray-700"
                        >
                          Activar reseñas de productos
                        </label>
                        <p className="text-gray-500">
                          Permitir a los clientes dejar valoraciones y reseñas.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Otros tabs se implementarían de manera similar */}
              <TabsContent value="shipping">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="free-shipping-threshold"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Umbral de envío gratuito (€)
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="free-shipping-threshold"
                          id="free-shipping-threshold"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          value={settings.shipping.freeShippingThreshold}
                          onChange={(e) =>
                            handleChange(
                              "shipping",
                              "freeShippingThreshold",
                              parseFloat(e.target.value)
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="default-shipping-cost"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Coste de envío por defecto (€)
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="default-shipping-cost"
                          id="default-shipping-cost"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          value={settings.shipping.defaultShippingCost}
                          onChange={(e) =>
                            handleChange(
                              "shipping",
                              "defaultShippingCost",
                              parseFloat(e.target.value)
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="enable-local-pickup"
                        name="enable-local-pickup"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        checked={settings.shipping.enableLocalPickup}
                        onChange={(e) =>
                          handleChange(
                            "shipping",
                            "enableLocalPickup",
                            e.target.checked
                          )
                        }
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="enable-local-pickup"
                        className="font-medium text-gray-700"
                      >
                        Permitir recogida en tienda
                      </label>
                      <p className="text-gray-500">
                        Ofrecer la opción de recoger pedidos en la tienda
                        física.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="payments">
                <div className="space-y-6">
                  <div className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="enable-credit-card"
                        name="enable-credit-card"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        checked={settings.payments.enableCreditCard}
                        onChange={(e) =>
                          handleChange(
                            "payments",
                            "enableCreditCard",
                            e.target.checked
                          )
                        }
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="enable-credit-card"
                        className="font-medium text-gray-700"
                      >
                        Activar pago con tarjeta
                      </label>
                      <p className="text-gray-500">
                        Permitir pagos con tarjeta de crédito y débito.
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="enable-paypal"
                        name="enable-paypal"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        checked={settings.payments.enablePayPal}
                        onChange={(e) =>
                          handleChange(
                            "payments",
                            "enablePayPal",
                            e.target.checked
                          )
                        }
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="enable-paypal"
                        className="font-medium text-gray-700"
                      >
                        Activar pago con PayPal
                      </label>
                      <p className="text-gray-500">
                        Permitir pagos a través de PayPal.
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="enable-bank-transfer"
                        name="enable-bank-transfer"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        checked={settings.payments.enableBankTransfer}
                        onChange={(e) =>
                          handleChange(
                            "payments",
                            "enableBankTransfer",
                            e.target.checked
                          )
                        }
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="enable-bank-transfer"
                        className="font-medium text-gray-700"
                      >
                        Activar transferencia bancaria
                      </label>
                      <p className="text-gray-500">
                        Permitir pagos mediante transferencia bancaria.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="emails">
                <div className="space-y-6">
                  <div className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="order-confirmation"
                        name="order-confirmation"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        checked={settings.emails.orderConfirmation}
                        onChange={(e) =>
                          handleChange(
                            "emails",
                            "orderConfirmation",
                            e.target.checked
                          )
                        }
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="order-confirmation"
                        className="font-medium text-gray-700"
                      >
                        Confirmación de pedido
                      </label>
                      <p className="text-gray-500">
                        Enviar email de confirmación cuando se realiza un
                        pedido.
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="shipping-confirmation"
                        name="shipping-confirmation"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        checked={settings.emails.shippingConfirmation}
                        onChange={(e) =>
                          handleChange(
                            "emails",
                            "shippingConfirmation",
                            e.target.checked
                          )
                        }
              />
            </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="shipping-confirmation"
                        className="font-medium text-gray-700"
                      >
                        Confirmación de envío
                      </label>
                      <p className="text-gray-500">
                        Enviar email cuando un pedido ha sido enviado.
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div className="flex h-5 items-center">
              <input
                        id="abandoned-cart"
                        name="abandoned-cart"
                type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        checked={settings.emails.abandonedCart}
                        onChange={(e) =>
                          handleChange(
                            "emails",
                            "abandonedCart",
                            e.target.checked
                          )
                        }
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="abandoned-cart"
                        className="font-medium text-gray-700"
                      >
                        Carrito abandonado
              </label>
                      <p className="text-gray-500">
                        Enviar recordatorio de carrito abandonado a los
                        clientes.
                      </p>
                    </div>
                  </div>
            </div>
              </TabsContent>

              <TabsContent value="security">
                <div className="space-y-6">
                  <div className="relative flex items-start">
                    <div className="flex h-5 items-center">
              <input
                        id="two-factor-auth"
                        name="two-factor-auth"
                type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        checked={settings.security.twoFactorAuthentication}
                        onChange={(e) =>
                          handleChange(
                            "security",
                            "twoFactorAuthentication",
                            e.target.checked
                          )
                        }
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="two-factor-auth"
                        className="font-medium text-gray-700"
                      >
                        Autenticación de dos factores
                      </label>
                      <p className="text-gray-500">
                        Requerir segundo factor de autenticación para acceso
                        admin.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="session-timeout"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tiempo de expiración de sesión (minutos)
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="session-timeout"
                          id="session-timeout"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          value={settings.security.sessionTimeout}
                          onChange={(e) =>
                            handleChange(
                              "security",
                              "sessionTimeout",
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="password-expiration"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Caducidad de contraseña (días)
              </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="password-expiration"
                          id="password-expiration"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          value={settings.security.passwordExpiration}
                          onChange={(e) =>
                            handleChange(
                              "security",
                              "passwordExpiration",
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
}
