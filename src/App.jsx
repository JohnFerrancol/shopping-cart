import { Outlet } from 'react-router';
import './styles/App.css';
import Navbar from './components/Navbar';
import useShop from './hooks/useShop';

const App = () => {
  const shop = useShop();

  return (
    <div className="font-poppins px-5 py-2 bg-gray-50 min-h-screen flex flex-col">
      <Navbar noOfItems={shop.totalItems} />
      <Outlet context={shop} />
    </div>
  );
};

export default App;
