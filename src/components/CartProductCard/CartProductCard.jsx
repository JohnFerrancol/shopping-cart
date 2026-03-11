import { ImCross } from 'react-icons/im';
import ChangeQuantityButton from '../ChangeQuantityButton/ChangeQuantityButton';

const CartProductCard = ({
  id,
  title,
  category,
  image,
  price,
  quantity,
  toggleAddToCart,
  updateQuantity,
}) => {
  return (
    <div className="flex justify-between  px-4 py-5 border border-emerald-100  text-lg text-emerald-900 bg-white rounded-xl shadow-xl">
      <div className="flex gap-4">
        <div className="p-2 w-150 flex justify-center">
          <img src={image} alt={title} className="h-50" />
        </div>
        <div>
          <h1 className="font-semibold mt-3 text-xl h-15">{title}</h1>
          <h2 className="mt-2 capitalize">{category}</h2>
          <h1>${price.toFixed(2)}</h1>
        </div>
      </div>
      <div className="flex flex-col gap-3 items-end">
        <ImCross
          onClick={() => toggleAddToCart(id)}
          className="text-green-500"
          size={30}
          data-testid="delete-icon"
        />
        <div className="flex h-1/4 items-center">
          <ChangeQuantityButton
            productId={id}
            updateQuantity={updateQuantity}
            quantity={quantity}
          />
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
