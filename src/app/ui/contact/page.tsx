"use client"


import React, { useState, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

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

const ContactPage: NextPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let errors: Errors = {};
    if (!formData.name) errors.name = 'El nombre es requerido';
    if (!formData.email) {
      errors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'El correo electrónico no es válido';
    }
    if (!formData.message) errors.message = 'El mensaje es requerido';
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
        // Por ahora, simularemos un envío exitoso
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSuccessMessage('Tu mensaje ha sido enviado con éxito.');
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
      } catch (error) {
        setErrorMessage('Ocurrió un error al enviar tu mensaje. Por favor, inténtalo de nuevo.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Head>
        <title>Contacto - Jamuche</title>
        <meta name="description" content="Contáctanos para cualquier consulta o colaboración. Estamos aquí para ayudarte." />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">Contacto</h1>

        <section className="mb-12 text-center">
          <p className="text-lg text-gray-700 mb-6">
            ¿Tienes alguna pregunta o quieres colaborar con nosotros? No dudes en contactarnos.
          </p>
          <div className="flex justify-center space-x-8">
            <div className="flex items-center">
              <EnvelopeIcon className="h-6 w-6 text-green-600 mr-2" />
              <a href="mailto:contacto@jamuche.com" className="text-green-600 hover:text-green-800">
                contacto@jamuche.com
              </a>
            </div>
            <div className="flex items-center">
              <PhoneIcon className="h-6 w-6 text-green-600 mr-2" />
              <span className="text-gray-700">+1 234 567 890</span>
            </div>
          </div>
        </section>

        <section className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Envíanos un mensaje</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {successMessage && <p className="text-green-600">{successMessage}</p>}
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 ${
                  errors.name ? 'border-red-500' : ''
                }`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 ${
                  errors.email ? 'border-red-500' : ''
                }`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 ${
                  errors.message ? 'border-red-500' : ''
                }`}
              />
              {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
              </button>
            </div>
          </form>
        </section>

        <section className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Síguenos en redes sociales</h2>
          <div className="flex justify-center space-x-4">
            <a href="https://instagram.com/jamuche" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
              Instagram
            </a>
            <a href="https://facebook.com/jamuche" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
              Facebook
            </a>
            <a href="https://twitter.com/jamuche" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
              Twitter
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactPage;