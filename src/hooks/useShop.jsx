import { useReducer, useState, useEffect } from 'react';
import shopItemsReducer from './shopItemsReducer';

const useShop = () => {
  // Define a shopItemsList state variable through a reducer
  const [shopItemsList, dispatch] = useReducer(shopItemsReducer, []);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchShopItemsData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');

        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }

        const productsData = await response.json();

        // Update the shopItems list by didpatching to the reducer with the data from the api
        dispatch({
          type: 'fetch_list',
          newList: productsData.map((product) => {
            return {
              ...product,
              quantity: product.id % 10 === 0 ? 2 : 1,
              addedToCart: product.id % 10 === 0 ? true : false,
            };
          }),
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchShopItemsData();
  }, []);

  // Dispatch the relevant reducer functions
  const toggleAddToCart = (id) => {
    dispatch({
      type: 'toggle-cart',
      toggledId: id,
    });
  };

  const updateQuantity = (id, delta) => {
    dispatch({
      type: 'update-quantity',
      updatedId: id,
      delta: delta,
    });
  };

  const cartItemsList = shopItemsList.filter((item) => item.addedToCart);
  const totalItems = cartItemsList.reduce((acc, currentValue) => acc + currentValue.quantity, 0);
  const totalCost = cartItemsList.reduce(
    (acc, currentValue) => acc + currentValue.quantity * currentValue.price,
    0
  );

  const categories = ['all', "men's clothing", 'jewelery', 'electronics', "women's clothing"];

  const handleSelectedCategory = (categoryClick) => {
    setSelectedCategory(categoryClick);
  };

  const filterCategoryItemsList =
    selectedCategory === 'all'
      ? shopItemsList
      : shopItemsList.filter((item) => item.category === selectedCategory);

  return {
    shopItemsList,
    cartItemsList,
    totalItems,
    totalCost,
    toggleAddToCart,
    updateQuantity,
    categories,
    selectedCategory,
    handleSelectedCategory,
    filterCategoryItemsList,
  };
};

export default useShop;
