const testimonials = [
  {
    text: "Los cactus de Jamuche son increíbles! Llegaron en perfecto estado y recibí excelentes consejos de cuidado.",
    author: "María, CDMX",
  },
  {
    text: "Comprar en Jamuche fue una experiencia genial. El proceso fue fácil y la calidad superó mis expectativas.",
    author: "Juan, Madrid",
  },
  {
    text: "Me encanta Jamuche. Tienen una gran selección y el servicio al cliente es excepcional.",
    author: "Emily, Los Ángeles",
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Lo que dicen nuestros clientes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg shadow-md dark:shadow-gray-700"
            >
              <p className="italic mb-4 text-gray-700 dark:text-gray-300">
                {testimonial.text}
              </p>
              <p className="font-bold text-gray-900 dark:text-white">
                - {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
