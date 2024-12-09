import Image from "next/image";
const imageRoutes = [
  {
    category: "Cactus",
    imagePath: "/cactus1.jpg"
  },
  {
    category: "Suculentas",
    imagePath: "/suculenta.jpeg"
  },
  {
    category: "Materas", 
    imagePath: "/matera.jpeg"
  }
];
const CategorySection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Nuestras Categorías</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {imageRoutes.map((item, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
              <Image
                src={item.imagePath} // Usar la ruta del archivo importado
                alt={item.category}
                width={400}
                height={300}
                className="w-full h-64 object-cover transition duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <h3 className="text-white text-2xl font-bold">{item.category}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
