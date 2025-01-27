const features = [
    { title: 'Calidad Premium', description: 'Seleccionamos cuidadosamente cada planta para garantizar su salud y belleza.' },
    { title: 'Envío Seguro', description: 'Empacamos con amor para que tus plantas lleguen en perfectas condiciones.' },
    { title: 'Asesoría Experta', description: 'Te brindamos consejos personalizados para el cuidado de tus plantas.' },
  ];
  
  const FeatureSection = () => {
    return (
      <section className="py-16 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegir Jamuche?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default FeatureSection;
  