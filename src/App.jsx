import { Outlet } from 'react-router';
import './styles/App.css';
import Navbar from './components/Navbar';
import useShop from './hooks/useShop';

const App = () => {
  const shop = useShop();

  const { shopItemsList } = shop;

  const cartItemsList = shopItemsList.filter((item) => item.addedToCart);
  const totalItems = cartItemsList.reduce((acc, currentValue) => acc + currentValue.quantity, 0);

  return (
    <div className="font-poppins px-5 py-2 bg-gray-50 min-h-screen flex flex-col">
      <Navbar noOfItems={totalItems} />
      <Outlet context={shop} />
    </div>
  );
};

export default App;
