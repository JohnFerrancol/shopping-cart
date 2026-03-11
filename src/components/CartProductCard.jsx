import { ImCross } from 'react-icons/im';

const CartProductCard = ({ title, category, image, price, quantity }) => {
  return (
    <div className="flex justify-between  px-4 py-5 border border-emerald-100  text-lg text-emerald-900 bg-white rounded-xl shadow-xl">
      <div className="flex gap-4">
        <div className="p-2 w-150 flex justify-center">
          <img src={image} alt={title} className="h-50" />
        </div>
        <div>
          <h1 className="font-semibold mt-3 text-xl h-15">{title}</h1>
          <h2 className="mt-2 capitalize">{category}</h2>
          <h1>${price.toFixed(2)}</h1>
        </div>
      </div>
      <div className="flex flex-col gap-3 items-end">
        <ImCross className="text-green-500" size={30} />
        <div className="flex h-1/4 items-center">
          <button className="rounded-l-md px-2 bg-green-500 text-white">-</button>
          <p className="px-10 border border-gray-300 shadow-lg">{quantity}</p>
          <button className="rounded-r-md px-2 bg-green-500 text-white">+</button>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
