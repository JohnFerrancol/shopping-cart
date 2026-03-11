import { useState, useEffect } from 'react';

const useShop = () => {
  const [shopItemsList, setShopItemsList] = useState([]);
  useEffect(() => {
    const fetchShopItemsData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');

        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }

        const productsData = await response.json();

        const newShopItemsList = productsData.map((product) => {
          return {
            ...product,
            quantity: product.id % 10 === 0 ? 2 : 1,
            addedToCart: product.id % 10 === 0 ? true : false,
          };
        });

        setShopItemsList(newShopItemsList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchShopItemsData();
  }, []);

  const cartItemsList = shopItemsList.filter((item) => item.addedToCart);
  const totalItems = cartItemsList.reduce((acc, currentValue) => acc + currentValue.quantity, 0);
  const totalCost = cartItemsList.reduce(
    (acc, currentValue) => acc + currentValue.quantity * currentValue.price,
    0
  );

  return { shopItemsList, setShopItemsList, cartItemsList, totalItems, totalCost };
};

export default useShop;
