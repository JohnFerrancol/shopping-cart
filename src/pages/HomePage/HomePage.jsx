import NavLink from '../../components/NavLink/NavLink';
import { useOutletContext } from 'react-router';

const HomePage = () => {
  const { categories, selectedCategory, handleSelectedCategory } = useOutletContext();

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-8">
      <h1 className="text-5xl font-bold">Welcome to the Fake Store App!</h1>
      <NavLink
        route="/shop"
        content={
          <button
            onClick={() => {
              handleSelectedCategory('all');
            }}
            className="hover:cursor-pointer font-bold px-5 py-3 bg-green-500 text-white text-3xl shadow-md rounded-xl"
          >
            Shop Now
          </button>
        }
      />
      <h3 className="mt-40 text-2xl font-semibold">Browse By Category</h3>
      <div className="flex gap-4 items-center">
        {categories.map(
          (category) =>
            category !== 'all' && (
              <NavLink
                key={category}
                route="/shop"
                content={
                  <button
                    key={category}
                    onClick={() => handleSelectedCategory(category)}
                    className="rounded-xl px-5 py-2 bg-white border border-gray-100 shadow-lg capitalize"
                  >
                    {category}
                  </button>
                }
              />
            )
        )}
      </div>
    </div>
  );
};

export default HomePage;
