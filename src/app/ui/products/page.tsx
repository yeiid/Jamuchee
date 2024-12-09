import Productcard from "@/components/ProductCard";

const Product: React.FC = () => {
  return (
    <div >
      <section className="mb-12 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          Nuestra Misión
        </h2>
        <p className="text-lg text-gray-700">
          En Jamuche, nuestra misión es conectar a las personas con la
          naturaleza a través de plantas que transmiten buenas vibras. Creemos
          que cada planta tiene el poder de transformar espacios y elevar el
          estado de ánimo, creando ambientes llenos de energía positiva y
          bienestar.
        </p>
      </section>
      <Productcard />
    </div>
  );
};

export default Product;
