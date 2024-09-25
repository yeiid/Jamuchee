import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

const About: NextPage = () => {
  return (
    <div className="min-h-screen bg-green-50">
      <Head>
        <title>Sobre Jamuche - Conectando con la naturaleza</title>
        <meta name="description" content="Descubre la misión y los valores detrás de Jamuche, donde las plantas transmiten buenas vibras." />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">Sobre Jamuche</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Nuestra Misión</h2>
          <p className="text-lg text-gray-700">
            En Jamuche, nuestra misión es conectar a las personas con la naturaleza a través de plantas que transmiten buenas vibras. Creemos que cada planta tiene el poder de transformar espacios y elevar el estado de ánimo, creando ambientes llenos de energía positiva y bienestar.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Nuestros Valores</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
            <li>Conexión con la naturaleza</li>
            <li>Bienestar y energía positiva</li>
            <li>Sostenibilidad y respeto por el medio ambiente</li>
            <li>Autenticidad y pasión por las plantas</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Nuestro Equipo</h2>
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 rounded-full overflow-hidden mb-4">
              <Image src="/api/placeholder/200/200" alt="Fundador de Jamuche" width={200} height={200} className="object-cover" />
            </div>
            <h3 className="text-xl font-medium text-green-600">Fundador de Jamuche</h3>
            <p className="text-lg text-gray-700 text-center mt-2">
              Como único integrante y fundador de Jamuche, mi pasión es compartir la energía positiva de las plantas con el mundo. Creo firmemente en el poder de la naturaleza para transformar nuestras vidas y espacios.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Conecta con Nosotros</h2>
          <p className="text-lg text-gray-700">
            ¿Sientes la buena vibra? Únete a nuestra comunidad de amantes de las plantas y descubre cómo la naturaleza puede transformar tu vida. Síguenos en nuestras redes sociales y no dudes en contactarnos para cualquier consulta o colaboración.
          </p>
        </section>
      </main>
    </div>
  );
};

export default About;