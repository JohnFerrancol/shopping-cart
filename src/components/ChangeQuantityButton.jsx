const ChangeQuantityButton = ({ productId, updateQuantity, quantity }) => {
  return (
    <>
      <button
        onClick={() => updateQuantity(productId, -1)}
        className="rounded-l-md px-2 bg-green-500 text-white"
      >
        -
      </button>
      <p className="px-10 border border-gray-300 shadow-lg">{quantity}</p>
      <button
        onClick={() => updateQuantity(productId, +1)}
        className="rounded-r-md px-2 bg-green-500 text-white"
      >
        +
      </button>
    </>
  );
};

export default ChangeQuantityButton;
