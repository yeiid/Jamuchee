"use client"
import { useCart } from '@/context/Contex'; // Import the useCart hook
import { CartProps } from '@/app/lib/types';

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cart, dispatch } = useCart(); // Use the useCart hook

  const handleAddToCart = (productId: string) => {
    dispatch({ type: 'ADD_TO_CART', payload: { id: productId,} });
    console.log('Producto agregado al carrito');
  };

   const productCount = cart.reduce((total, product) => total + product.quantity, 0);

  return (
    <div className={`fixed top-0 right-0 h-full w-1/4 bg-gray-100 shadow-lg transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-4 bg-gray-800 text-white">
        <h2 className="text-2xl font-bold">Carrito de Compras</h2>
        <button className="absolute top-2 right-2 text-xl cursor-pointer" onClick={onClose}>&times;</button>
      </div>
      <div className="p-4">
        <p className="mb-4">Cantidad de productos: {productCount}</p>
        {/* Other cart elements */}
        {cart.map((product) => (
          <div key={product.id}>
            {/* <p>{product.}</p> */}
            <p>Quantity: {product.quantity}</p>
            <button onClick={() => handleAddToCart(product.id)}>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
