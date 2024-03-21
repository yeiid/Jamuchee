// components/ProductDetail.tsx

import Image from "next/image";

const ProductDetail = ({ product }) => {
  return (
    <div className="max-w-md rounded overflow-hidden shadow-lg">
      <Image src={product.image} alt={product.name} width={300} height={300} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-base">{product.description}</p>
        <p className="mt-2">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
