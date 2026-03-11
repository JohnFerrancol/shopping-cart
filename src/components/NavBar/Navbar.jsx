import NavLink from '../NavLink/NavLink';
import { FaShoppingCart } from 'react-icons/fa';
import { PiBagFill } from 'react-icons/pi';

const Navbar = ({ noOfItems }) => {
  return (
    <nav className="flex justify-between px-8 py-6 bg-green-500 shadow-xl text-white rounded-2xl">
      <NavLink
        route="/"
        content={
          <button className="font-bold text-2xl hover:cursor-pointer flex items-center gap-2">
            <PiBagFill className="text-white" size={40} />
            Fake Store
          </button>
        }
        testId="app-logo"
      />
      <div className="flex gap-8 items-center">
        <NavLink route="/shop" content="Shop" testId="shop" />
        <NavLink
          testId="cart"
          route="/cart"
          content={
            <div className="flex gap-2 items-center">
              <p>Cart {noOfItems > 0 ? `(${noOfItems})` : ''}</p>
              <FaShoppingCart className="text-white" size={30} />
            </div>
          }
        />
      </div>
    </nav>
  );
};

export default Navbar;
