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

  const toggleAddToCart = (id) => {
    setShopItemsList((prevList) =>
      prevList.map((product) =>
        product.id === id ? { ...product, addedToCart: !product.addedToCart } : product
      )
    );
  };

  const updateQuantity = (id, delta) => {
    setShopItemsList((prevList) =>
      prevList.map((product) => {
        if (product.id !== id) {
          return product;
        }
        // Handling edge cases when the user wants to decrease the quantity of the item to less than 1
        if (product.quantity === 1 && delta === -1) {
          // If the product is already in the cart, remove from the cart. Else, ignore the eventhandler
          if (product.addedToCart) {
            return { ...product, addedToCart: false };
          } else {
            return product;
          }
        } else {
          return {
            ...product,
            quantity: product.quantity + delta,
          };
        }
      })
    );
  };

  const cartItemsList = shopItemsList.filter((item) => item.addedToCart);
  const totalItems = cartItemsList.reduce((acc, currentValue) => acc + currentValue.quantity, 0);
  const totalCost = cartItemsList.reduce(
    (acc, currentValue) => acc + currentValue.quantity * currentValue.price,
    0
  );

  return {
    shopItemsList,
    setShopItemsList,
    cartItemsList,
    totalItems,
    totalCost,
    toggleAddToCart,
    updateQuantity,
  };
};

export default useShop;
