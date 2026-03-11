import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import './styles/App.css';
import Navbar from './components/Navbar';
import useShop from './hooks/useShop';

const App = () => {
  const shop = useShop();

  return (
    <div className="">
      <Navbar />
      <Outlet context={shop} />
    </div>
  );
};

export default App;
