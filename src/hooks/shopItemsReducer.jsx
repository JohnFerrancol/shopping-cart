const shopItemsReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_list': {
      return action.newList;
    }
    case 'toggle-cart': {
      return state.map((product) =>
        product.id === action.toggledId
          ? { ...product, addedToCart: !product.addedToCart }
          : product
      );
    }
    case 'update-quantity': {
      return state.map((product) => {
        if (product.id !== action.updatedId) {
          return product;
        }
        // Handling edge cases when the user wants to decrease the quantity of the item to less than 1
        if (product.quantity === 1 && action.delta === -1) {
          // Do nothing and show the shaking animation to the user
          return product;
        } else {
          return {
            ...product,
            quantity: product.quantity + action.delta,
          };
        }
      });
    }
    default:
      throw Error('Unknown action: ' + action.type);
  }
};

export default shopItemsReducer;
