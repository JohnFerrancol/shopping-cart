import { Link } from 'react-router';

const NavLink = ({ route, content, testId }) => {
  return (
    <Link className="hover:font-bold over:text-emerald-800 text-xl" to={route} data-testid={testId}>
      {content}
    </Link>
  );
};

export default NavLink;
