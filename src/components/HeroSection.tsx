import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <Image
        src="/banner.jpg"
        alt="Jamuche Cactus y Suculentas"
        layout="fill"
        objectFit="cover"
        className="absolute z-0"
      />
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <div className="relative z-20 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Jamuche</h1>
        <p className="text-xl md:text-2xl mb-8">Cactus, Suculentas y Materas</p>
        <Link href="/ui/products"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300"
          > Explorar Productos
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
