"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="bg-green-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <Image
          src="/hero-image.jpg"
          alt="Jamuche Cactus y Suculentas"
          layout="fill"
          objectFit="cover"
          className="absolute z-0"
        />
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div className="relative z-20 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Jamuche</h1>
          <p className="text-xl md:text-2xl mb-8">Cactus, Suculentas y Materas</p>
          <Link href="/products" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300">
            Explorar Productos
          </Link>
        </div>
      </section>

      {/* Categorías */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestras Categorías</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Cactus', 'Suculentas', 'Materas'].map((category, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={`/category-${index + 1}.jpg`}
                  alt={category}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <h3 className="text-white text-2xl font-bold">{category}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="py-16 bg-green-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegir Jamuche?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Calidad Premium', description: 'Seleccionamos cuidadosamente cada planta para garantizar su salud y belleza.' },
              { title: 'Envío Seguro', description: 'Empacamos con amor para que tus plantas lleguen en perfectas condiciones.' },
              { title: 'Asesoría Experta', description: 'Te brindamos consejos personalizados para el cuidado de tus plantas.' }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: '¡Los cactus de Jamuche son increíbles! Llegaron en perfecto estado y recibí excelentes consejos de cuidado.', author: 'María, CDMX' },
              { text: 'Comprar en Jamuche fue una experiencia genial. El proceso fue fácil y la calidad superó mis expectativas.', author: 'Juan, Madrid' },
              { text: 'Me encanta Jamuche. Tienen una gran selección y el servicio al cliente es excepcional.', author: 'Emily, Los Ángeles' }
            ].map((testimonial, index) => (
              <div key={index} className="bg-green-50 p-6 rounded-lg shadow-md">
                <p className="italic mb-4">"{testimonial.text}"</p>
                <p className="font-bold">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Llamado a la acción */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para darle vida a tu espacio?</h2>
          <p className="mb-8 text-xl">Descubre nuestra colección de cactus, suculentas y materas únicas.</p>
          <Link href="/products" className="bg-white text-green-600 font-bold py-3 px-6 rounded-full hover:bg-green-100 transition duration-300">
            Ver Catálogo
          </Link>
        </div>
      </section>

      {/* Redes Sociales */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Síguenos en Redes Sociales</h2>
          <div className="flex justify-center gap-8">
            <Link href="https://www.facebook.com/jamuche" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              <Facebook size={32} />
            </Link>
            <Link href="https://www.instagram.com/jamuche/" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
              <Instagram size={32} />
            </Link>
            <Link href="https://twitter.com/jamuche" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
              <Twitter size={32} />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-green-100">
        <div className="container mx-auto px-4 max-w-xl">
          <h2 className="text-3xl font-bold text-center mb-8">Suscríbete a nuestro newsletter</h2>
          <form className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-grow px-4 py-2 rounded-full"
            />
            <button type="submit" className="bg-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-green-700 transition duration-300">
              Suscribirse
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;