// import { useState } from 'react';
import { Outlet } from 'react-router';
import './styles/App.css';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className="">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
