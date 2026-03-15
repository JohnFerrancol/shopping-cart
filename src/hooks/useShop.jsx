import { useReducer, useState, useEffect, useMemo } from 'react';
import shopItemsReducer from './shopItemsReducer';

const useShop = () => {
  const [shopItemsList, dispatch] = useReducer(shopItemsReducer, []);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchShopItemsData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error(`HTTP error: Status ${response.status}`);

        const productsData = await response.json();

        dispatch({
          type: 'fetch_list',
          newList: productsData.map((product) => ({
            ...product,
            quantity: product.id % 10 === 0 ? 2 : 1,
            addedToCart: product.id % 10 === 0,
          })),
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchShopItemsData();
  }, []);

  const toggleAddToCart = (id) => {
    dispatch({ type: 'toggle-cart', toggledId: id });
  };

  const updateQuantity = (id, delta) => {
    dispatch({ type: 'update-quantity', updatedId: id, delta });
  };

  const cartItemsList = useMemo(
    () => shopItemsList.filter((item) => item.addedToCart),
    [shopItemsList]
  );

  const totalItems = useMemo(
    () => cartItemsList.reduce((acc, item) => acc + item.quantity, 0),
    [cartItemsList]
  );

  const totalCost = useMemo(
    () => cartItemsList.reduce((acc, item) => acc + item.quantity * item.price, 0),
    [cartItemsList]
  );

  const categories = ['all', "men's clothing", 'jewelery', 'electronics', "women's clothing"];

  const handleSelectedCategory = (categoryClick) => {
    setSelectedCategory(categoryClick);
  };

  const filterCategoryItemsList = useMemo(
    () =>
      selectedCategory === 'all'
        ? shopItemsList
        : shopItemsList.filter((item) => item.category === selectedCategory),
    [selectedCategory, shopItemsList]
  );

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
