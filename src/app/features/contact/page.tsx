"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Mail, Phone, Instagram, Facebook, Twitter } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let errors: Errors = {};
    if (!formData.name) errors.name = "El nombre es requerido";
    if (!formData.email) {
      errors.email = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "El correo electrónico no es válido";
    }
    if (!formData.message) errors.message = "El mensaje es requerido";
    return errors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        // Aquí iría la lógica para enviar el formulario
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSuccessMessage("Tu mensaje ha sido enviado con éxito.");
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
      } catch (error) {
        setErrorMessage(
          "Ocurrió un error al enviar tu mensaje. Por favor, inténtalo de nuevo."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-green-800 dark:text-green-400 mb-4">
              Contacto
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              ¿Tienes alguna pregunta o quieres colaborar con nosotros? No dudes
              en contactarnos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Información de contacto */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Email
                    </h3>
                    <a
                      href="mailto:contacto@jamuche.com"
                      className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                    >
                      contacto@jamuche.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Teléfono
                    </h3>
                    <a
                      href="tel:+1234567890"
                      className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                    >
                      +1 234 567 890
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Síguenos en redes sociales
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="https://instagram.com/jamuche"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors duration-300"
                  >
                    <Instagram className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </a>
                  <a
                    href="https://facebook.com/jamuche"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors duration-300"
                  >
                    <Facebook className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </a>
                  <a
                    href="https://twitter.com/jamuche"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors duration-300"
                  >
                    <Twitter className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </a>
                </div>
              </div>
            </div>

            {/* Formulario de contacto */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Envíanos un mensaje
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {successMessage && (
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 p-4 rounded-lg">
                    {successMessage}
                  </div>
                )}
                {errorMessage && (
                  <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-4 rounded-lg">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 dark:border-gray-600 focus:ring-green-500 focus:border-green-500"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 dark:border-gray-600 focus:ring-green-500 focus:border-green-500"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.message
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 dark:border-gray-600 focus:ring-green-500 focus:border-green-500"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 
                           focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
                           dark:focus:ring-offset-gray-800 transition-all duration-300 
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transform hover:scale-[1.02] active:scale-[0.98]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
