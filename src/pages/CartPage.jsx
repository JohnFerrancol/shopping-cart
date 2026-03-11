import { useOutletContext } from 'react-router';
import CartProductCard from '../components/CartProductCard';

const CartPage = () => {
  const { totalCost, cartItemsList } = useOutletContext();

  return (
    <div className="flex-1 px-15 flex flex-col">
      <h1 className="mt-5 text-4xl font-bold text-green-500">Cart</h1>
      <div className="py-5 grid grid-cols-1 gap-5 ">
        {cartItemsList.map((cartItem) => (
          <CartProductCard key={cartItem.id} {...cartItem} />
        ))}
      </div>
      <h2 className="mt-5 text-xl text-green-500 font-semibold self-end">
        Total Cost: ${totalCost.toFixed(2)}
      </h2>
    </div>
  );
};

export default CartPage;
