import React from "react";
import Image from "next/image";
import Link from "next/link";


const HomePage = () => {
  return (
    <div className="container mx-auto">
      {/* Banner */}
      <div className="grid justify-center ">
        <Image src="/banner.jpg" alt="Banner" width={1000} height={500} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Bienvenido a Tu E-commerce de Cactus
          </h1>
        </div>
      </div>

      {/* Categorías */}
      <div className="categories flex justify-center gap-8 mt-8 bg-gray-100 py-16">
        <div className="category ">
          <Link href="/category/interior">
            <Image
              src="/1.jpg"
              alt="Cactus de Interior"
              width={300}
              height={200}
            />
            <h2 className="text-xl font-semibold text-center mt-2">
              Cactus de Interior
            </h2>
          </Link>
        </div>
        <div className="category">
          <Link href="/category/exterior">
            <Image
              src="/1.jpg"
              alt="Cactus de Exterior"
              width={300}
              height={200}
            />
            <h2 className="text-xl font-semibold text-center mt-2">
              Cactus de Exterior
            </h2>
          </Link>
        </div>
        {/* Otras categorías */}
      </div>

      {/* Información */}
      <div className="info mt-8">
        <h2 className="text-2xl font-bold mb-4">Nuestra Empresa</h2>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget
          fermentum lorem, nec ultrices magna.
        </p>
        <p className="text-lg">
          Integer convallis, nunc quis gravida finibus, urna odio luctus nisi,
          non mollis mi nisi vitae ante.
        </p>
      </div>

      {/* Testimonios */}
      <div className="testimonials mt-8">
        <div className="bg-gray-100 py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Testimonios de Clientes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Testimonio 1 */}
              <div className="bg-white p-6 rounded shadow-md">
                <p className="text-gray-800 mb-4">
                  ¡Los cactus que compré aquí son increíbles! No solo llegaron
                  en perfecto estado, sino que también me dieron algunos
                  consejos útiles para su cuidado.
                </p>
                <p className="text-gray-600 text-sm">
                  - María, Ciudad de México
                </p>
              </div>
              {/* Testimonio 2 */}
              <div className="bg-white p-6 rounded shadow-md">
                <p className="text-gray-800 mb-4">
                  ¡Mi experiencia de compra fue excelente! El proceso fue fácil
                  y rápido, y la calidad de los cactus superó mis expectativas.
                  Definitivamente volveré a comprar aquí.
                </p>
                <p className="text-gray-600 text-sm">- Juan, Madrid</p>
              </div>
              {/* Testimonio 3 */}
              <div className="bg-white p-6 rounded shadow-md">
                <p className="text-gray-800 mb-4">
                  Me encanta esta tienda de cactus. Tienen una gran selección de
                  plantas y el servicio al cliente es excepcional. Siempre estoy
                  feliz con mis compras aquí.
                </p>
                <p className="text-gray-600 text-sm">- Emily, Los Angeles</p>
              </div>
              {/* Agrega más testimonios según sea necesario */}
            </div>
          </div>
        </div>
      </div>

      {/* Ofertas */}
      <div className="offers mt-8">
        {/* Muestra ofertas especiales o promociones */}
        <div className="bg-gray-100 py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">¡Aprovecha Nuestras Ofertas Especiales!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Oferta 1: Descuento por Volumen de Compra */}
          <div className="offer bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-bold mb-2">Compra Más, Ahorra Más</h3>
            <p className="text-gray-800 mb-4">¡Obtén un 15% de descuento en compras de 3 o más cactus!</p>
          </div>
          {/* Oferta 2: Oferta por Tiempo Limitado */}
          <div className="offer bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-bold mb-2">Oferta Flash</h3>
            <p className="text-gray-800 mb-4">¡Solo por hoy! Todos los cactus con un 20% de descuento.</p>
          </div>
          {/* Oferta 3: Descuento para Clientes Nuevos */}
          <div className="offer bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-bold mb-2">Bienvenida Especial</h3>
            <p className="text-gray-800 mb-4">¡Bienvenido a nuestro e-commerce! Obtén un 10% de descuento en tu primera compra.</p>
          </div>
          {/* Oferta 4: Oferta por Suscripción */}
          <div className="offer bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-bold mb-2">Suscríbete y Ahorra</h3>
            <p className="text-gray-800 mb-4">¡Suscríbete a nuestro boletín y recibe un código de descuento del 15% en tu próxima compra!</p>
          </div>
          {/* Oferta 5: Oferta de Envío Gratis */}
          <div className="offer bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-bold mb-2">Envío Gratis</h3>
            <p className="text-gray-800 mb-4">¡Compra más de $50 y obtén envío gratis en tu pedido!</p>
          </div>
        </div>
      </div>
    </div>
      </div>

      {/* Redes Sociales */}
      <div className="social-media mt-8">
        {/* Agrega enlaces a perfiles de redes sociales */}
        <div className="bg-gray-100 py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Síguenos en Redes Sociales</h2>
        <div className="flex justify-center gap-4">
          <a href="https://www.facebook.com/jamuche" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
            <a className="text-4xl" />
          </a>
          <a href="https://www.instagram.com/jamuche/" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
            <a className="text-4xl" />
          </a>
          <a href="https://twitter.com/jamuche" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
            <h1 className="text-4xl" />
          </a>
        </div>
        <p className="text-lg mt-4 text-center">En Jamuche, nos esforzamos por brindarte contenido inspirador sobre cactus y suculentas. Síguenos en nuestras redes sociales para obtener las últimas noticias, consejos de cuidado y ofertas especiales.</p>
      </div>
    </div>
      </div>

      {/* Formulario de Suscripción */}
      <div className="subscription-form mt-8">
        {/* Agrega un formulario de suscripción */}
      </div>

      {/* Mapa de Ubicación */}
      <div className="location-map mt-8">
        {/* Agrega un mapa de ubicación */}
      </div>
    </div>
  );
};

export default HomePage;
