import React from 'react'

const footer = () => {
  return (
    <div>
       <footer className="bg-gray-900 text-white">
  <div className="container mx-auto py-8 px-4 md:px-0">
    <div className="flex flex-wrap -mx-4">
      {/* <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
        <div className="mb-4">
          <img src="/sites/default/files/inline-images/logoscrd_1_0.png" alt="Secretaría de Cultura, Recreación y Deporte" className="w-3/4 md:w-full mx-auto" />
        </div>
        <div className="flex justify-center md:justify-start">
          <img src="/sites/default/files/2021-09/header_govco.png" alt="Marca co" className="w-1/2 md:w-auto" />
          <img src="/sites/default/files/inline-images/co-colombia_.png" alt="Marca co" className="w-1/2 md:w-auto" />
        </div>
      </div> */}
      <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
        <h2 className="text-xl font-bold mb-4">Bogotanitos</h2>
        <ul>
          <li>Dirección: Cra. 8 No. 9 - 83, Bogotá, D.C., - Colombia</li>
          <li>Horario de atención: Lunes a viernes de 7:00 a.m. a 4:30 p.m. jornada continua.</li>
        </ul>
        <div className="mt-4">
          <a href="https://www.facebook.com/CulturaenBogota/" className="mr-4" target="_blank" rel="noopener noreferrer">
            <img src="/sites/default/files/2021-09/facebook.svg" alt="Facebook" className="w-6" />
          </a>
          <a href="https://twitter.com/CulturaenBta" className="mr-4" target="_blank" rel="noopener noreferrer">
            <img src="/sites/default/files/2021-09/twitter.svg" alt="Twitter" className="w-6" />
          </a>
          <a href="https://www.instagram.com/culturaenbta/" target="_blank" rel="noopener noreferrer">
            <img src="/sites/default/files/2021-09/instagram.svg" alt="Instagram" className="w-6" />
          </a>
        </div>
      </div>
      <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
        <h2 className="text-xl font-bold mb-4">Contacto</h2>
        <ul>
          <li>Teléfono Conmutador: +57 (601) 327 48 50</li>
          <li>Línea gratuita: +57 (601) 327 48 50 Ext. 565 - 714</li>
          <li>Línea anticorrupción: 195 opción 2</li>
          <li>Correo de contacto: <a href="mailto:correspondencia.externa@scrd.gov.co">correspondencia.externa@scrd.gov.co</a></li>
          <li><a href="/sitemap" className="text-blue-500 hover:text-blue-700">Mapa del sitio</a></li>
          <li><a href="/politicas-de-privacidad-y-tratamiento-de-datos-personales" className="text-blue-500 hover:text-blue-700">Políticas</a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>

    </div>
  )
}

export default footer
