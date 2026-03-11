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

        setShopItemsList(productsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchShopItemsData();
  }, []);

  return { shopItemsList, setShopItemsList };
};

export default useShop;
