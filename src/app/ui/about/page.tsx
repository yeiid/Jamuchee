import Image from "next/image";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-10">About Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <Image
              src="/1.jpg"
              alt="About Us"
              width={300}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-lg mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              vel justo eu sem tempor commodo vel sed sapien. Cras tempus ex
              et lacus vehicula, quis pulvinar justo aliquam. Vestibulum
              varius lorem eget arcu scelerisque, ut tincidunt eros porta.
            </p>
            <p className="text-lg mb-6">
              Quisque quis elit non leo posuere accumsan. Vivamus fermentum
              lorem et purus malesuada fringilla. Donec sed sapien lectus.
              Aliquam tempus lectus eget nisi hendrerit, sed aliquet tortor
              luctus.
            </p>
            <p className="text-lg">
              Sed nec est et felis ultricies consequat id eget tortor. Sed vel
              efficitur ex, sit amet consequat arcu. Integer ac arcu id arcu
              facilisis tristique.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
