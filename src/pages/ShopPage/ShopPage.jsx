import { useOutletContext } from 'react-router';
import ShopProductCard from '../../components/ShopProductCard/ShopProductCard';

const ShopPage = () => {
  const {
    categories,
    selectedCategory,
    handleSelectedCategory,
    filterCategoryItemsList,
    toggleAddToCart,
    updateQuantity,
  } = useOutletContext();

  return (
    <div className="flex-1 px-15">
      <div className="mt-5 flex justify-between items-center">
        <h1 className=" text-4xl font-bold text-green-500">Shop</h1>
        <div className="flex gap-4 items-center">
          {categories.map((category) => {
            return selectedCategory === category ? (
              <button
                key={category}
                onClick={() => handleSelectedCategory(category)}
                className="rounded-xl px-5 py-2 bg-green-500 text-white shadow-lg capitalize"
              >
                {category}
              </button>
            ) : (
              <button
                key={category}
                onClick={() => handleSelectedCategory(category)}
                className="rounded-xl px-5 py-2 bg-white text-green-500 border border-green-500 shadow-lg capitalize"
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className="py-5 grid grid-cols-4 grid-rows-5 gap-x-10 gap-y-5">
        {filterCategoryItemsList.map((shopItem) => (
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
