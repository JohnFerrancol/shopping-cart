const ShopProductCard = ({ title, category, image, price, quantity, addedToCart }) => {
  return (
    <div className="flex flex-col items-center px-4 py-5 border border-emerald-100  text-lg  bg-white rounded-xl shadow-xl">
      <div className="p-5 w-full flex justify-center">
        <img src={image} alt={title} className="h-50" />
      </div>
      <h1 className="font-semibold mt-3 text-xl h-20">{title}</h1>
      <h2 className="mt-2 capitalize">{category}</h2>
      <hr className="my-3 border-emerald-900 w-full" />
      <h1>${price.toFixed(2)}</h1>
      <div className="mt-3 px-15 w-full flex justify-center gap-5 items-center">
        <div className="flex">
          <button className="rounded-l-md px-2 bg-green-500 text-white">-</button>
          <p className="px-10 border border-gray-300 shadow-lg">{quantity}</p>
          <button className="rounded-r-md px-2 bg-green-500 text-white">+</button>
        </div>

        {addedToCart ? (
          <button className="rounded-xl px-5 py-2 bg-white text-green-500 border border-green-500 shadow-lg">
            Remove from Cart
          </button>
        ) : (
          <button className="rounded-xl px-5 py-2 bg-green-500 text-white shadow-lg">
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ShopProductCard;
