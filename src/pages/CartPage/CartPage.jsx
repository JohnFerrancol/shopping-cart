import { useContext } from 'react';
import ShopContext from '../../context/ShopContext';
import CartProductCard from '../../components/CartProductCard/CartProductCard';

const CartPage = () => {
  const { totalCost, cartItemsList, toggleAddToCart, updateQuantity } = useContext(ShopContext);

  return (
    <div className="flex-1 px-15 flex flex-col">
      <h1 className="mt-5 text-4xl font-bold text-green-500">Cart</h1>
      <div className="py-5 grid grid-cols-1 gap-5 ">
        {cartItemsList.map((cartItem) => (
          <CartProductCard
            key={cartItem.id}
            {...cartItem}
            toggleAddToCart={toggleAddToCart}
            updateQuantity={updateQuantity}
          />
        ))}
      </div>
      <h2 className="mt-5 text-xl text-green-500 font-semibold self-end">
        Total Cost: ${totalCost.toFixed(2)}
      </h2>
    </div>
  );
};

export default CartPage;
