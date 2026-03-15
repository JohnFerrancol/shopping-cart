import { useContext, useRef } from 'react';
import ShopContext from '../../context/ShopContext';

const ChangeQuantityButton = ({ productId, quantity }) => {
  const { updateQuantity } = useContext(ShopContext);
  const buttonRef = useRef(null);

  const handleMinus = () => {
    if (quantity === 1) {
      buttonRef.current.classList.add('animate-horizontal-vibration');
      setTimeout(() => buttonRef.current.classList.remove('animate-horizontal-vibration'), 400);
    }
    updateQuantity(productId, -1);
  };

  return (
    <div className="flex" ref={buttonRef}>
      <button onClick={handleMinus} className="rounded-l-md px-2 bg-green-500 text-white">
        -
      </button>
      <p className="px-10 border border-gray-300 shadow-lg">{quantity}</p>
      <button
        onClick={() => updateQuantity(productId, +1)}
        className="rounded-r-md px-2 bg-green-500 text-white"
      >
        +
      </button>
    </div>
  );
};

export default ChangeQuantityButton;
