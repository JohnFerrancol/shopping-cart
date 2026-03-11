import { useOutletContext } from 'react-router';

const ShopPage = () => {
  const { shopItemsList, setShopItemsList } = useOutletContext();

  console.log(shopItemsList);
  return <h1>Shop Page</h1>;
};

export default ShopPage;
