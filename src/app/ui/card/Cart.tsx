"use client";
import { useCart } from "@/context/Contex"; // Import the useCart hook
import { CartProps } from "@/app/lib/types";

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cart, dispatch } = useCart(); // Use the useCart hook

  const handleAddToCart = (productId: string) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { id: productId },
    });
  };
  const DECREASE_QUANTITY = (productId: string) => {
    dispatch({
      type: "DECREASE_QUANTITY",
      payload: productId,
    });

  };
  const handleRemoveFromCart = (productId: string) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: productId,
    });

  };

  const productCount = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );
  const getTotalPrice = () => {
    return cart.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    );
  };

  const handleBuy = () => {
    // Verificar si el carrito está vacío
    if (cart.length === 0) {
      alert("El carrito está vacío");
      // Puedes mostrar un mensaje al usuario indicando que el carrito está vacío
      return;
    }
  
    // Construir el mensaje con los detalles del carrito
    const cartDetails = cart.map(
      (item) =>
        `${item.quantity} x ${item.name} - $${item.price * item.quantity}`
    );
    const message = `¡Hola! Estoy interesado en comprar:\n${cartDetails.join(
      "\n"
    )}\nTotal: $${getTotalPrice()}`;
  
    // Reemplazar '123456789' con tu número de WhatsApp
    const phoneNumber = "3160457939";
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
  
    // Redirigir a WhatsApp
    window.location.href = whatsappLink;
  };


  return (
    <div
      className={`fixed top-0 right-0 h-full w-1.5/4 bg-gray-100 shadow-lg transform transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 bg-gray-800 text-white">
        <h2 className="text-2xl font-bold">Carrito de Compras</h2>
        <button
          className="absolute top-2 right-2 text-xl cursor-pointer"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
      <div className="p-4">
        <p className="mb-4">Cantidad de productos: {productCount}</p>

        {cart.map((product) => (
          <div
            key={product.id}
            className="grid  md:flex-row items-center border-b-2 py-4"
          >
            <div className="flex items-center mb-2 md:mb-0">
              <p className="mr-2 md:mr-4">Cantidad: {product.quantity}</p>
              <p>{product.name}</p>
            </div>
            <div className="flex items-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-1"
                onClick={() => handleAddToCart(product.id)}
              >
                +
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-1"
                onClick={() => DECREASE_QUANTITY(product.id)}
              >
                -
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-1"
                onClick={() => handleRemoveFromCart(product.id)}
              >
                delete
              </button>
              <p className="text-lg">${product.price}</p>
            </div>
          </div>
        ))}
        <div className="grid">
          <p className="text-lg">Total: ${getTotalPrice()}</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-1"
            onClick={() => handleBuy()}>comprar</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
