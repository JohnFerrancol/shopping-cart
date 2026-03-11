import App from '../App';
import HomePage from '../pages/HomePage';
import ShopLayout from '../pages/ShopLayout';
import CartPage from '../pages/CartPage';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop', element: <ShopLayout /> },
      { path: 'cart', element: <CartPage /> },
    ],
  },
];

export default routes;
