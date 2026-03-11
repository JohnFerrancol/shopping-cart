import { useOutletContext } from 'react-router';
import ShopProductCard from '../../components/ShopProductCard/ShopProductCard';

const ShopPage = () => {
  const { shopItemsList, toggleAddToCart, updateQuantity } = useOutletContext();

  return (
    <div className="flex-1 px-15">
      <h1 className="mt-5 text-4xl font-bold text-green-500">Shop</h1>
      <div className="py-5 grid grid-cols-4 grid-rows-5 gap-x-10 gap-y-5">
        {shopItemsList.map((shopItem) => (
          <ShopProductCard
            key={shopItem.id}
            {...shopItem}
            toggleAddToCart={toggleAddToCart}
            updateQuantity={updateQuantity}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
