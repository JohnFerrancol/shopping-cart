import { Link } from 'react-router';

const Navbar = () => {
  return (
    <nav className="flex justify-center gap-5">
      <h1>Shopping Cart</h1>
      <div className="flex gap-2">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
  );
};

export default Navbar;
