import Productcard from "@/components/product/ProductCard";

const Product: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <section className="mb-12 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-4">
            Nuestra Misión
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            En Jamuche, nuestra misión es conectar a las personas con la
            naturaleza a través de plantas que transmiten buenas vibras. Creemos
            que cada planta tiene el poder de transformar espacios y elevar el
            estado de ánimo, creando ambientes llenos de energía positiva y
            bienestar.
          </p>
        </section>
        <Productcard />
      </div>
    </div>
  );
};

export default Product;
