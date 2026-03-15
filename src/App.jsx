import { Outlet } from 'react-router';

import './styles/App.css';
import Navbar from './components/NavBar/Navbar';
import useShop from './hooks/useShop';
import ShopContext from './context/ShopContext';

const App = () => {
  const shop = useShop();

  return (
    <ShopContext value={shop}>
      <div className="font-poppins px-5 py-2 bg-gray-50 min-h-screen flex flex-col">
        <Navbar />
        <Outlet />
      </div>
    </ShopContext>
  );
};

export default App;
