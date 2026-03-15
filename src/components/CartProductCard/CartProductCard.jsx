import { useContext, useRef } from 'react';
import ShopContext from '../../context/ShopContext';
import { ImCross } from 'react-icons/im';
import ChangeQuantityButton from '../ChangeQuantityButton/ChangeQuantityButton';

const CartProductCard = ({ id, title, category, image, price, quantity }) => {
  const { toggleAddToCart } = useContext(ShopContext);
  const cardRef = useRef(null);

  const handleRemove = () => {
    cardRef.current.classList.add('animate-fade-out-left');
    cardRef.current.addEventListener('animationend', () => toggleAddToCart(id));
  };

  return (
    <div
      ref={cardRef}
      data-testid={title}
      className="flex justify-between  px-4 py-5 border border-emerald-100  text-lg text-emerald-900 bg-white rounded-xl shadow-xl"
    >
      <div className="flex gap-4">
        <div className="p-2 w-150 flex justify-center">
          <img src={image} alt={title} className="h-50" />
        </div>
        <div>
          <h1 className="font-semibold mt-3 text-xl h-15">{title}</h1>
          <h2 className="mt-2 capitalize">{category}</h2>
        </div>
      </div>
      <div className="flex flex-col gap-3 items-end">
        <ImCross
          onClick={handleRemove}
          className="text-green-500"
          size={30}
          data-testid="delete-icon"
        />
        <div className="flex h-1/4 items-center">
          <ChangeQuantityButton
            productId={id}
            quantity={quantity}
            addedToCart={true}
            onRemove={handleRemove}
          />
        </div>
        <h3 className="text-lg font-semibold">
          <b>Price</b>: ${price.toFixed(2)}
        </h3>
      </div>
    </div>
  );
};

export default CartProductCard;
