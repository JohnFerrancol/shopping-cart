import NavLink from '../../components/NavLink/NavLink';

const HomePage = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold">Welcome to the Fake Store App!</h1>
      <NavLink
        route="/shop"
        content={
          <button className="hover:cursor-pointer font-bold px-5 py-3 bg-green-500 text-white text-3xl shadow-md rounded-xl">
            Shop Now
          </button>
        }
      />
    </div>
  );
};

export default HomePage;
