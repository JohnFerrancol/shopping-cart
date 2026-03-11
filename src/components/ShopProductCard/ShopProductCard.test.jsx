import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import ShopProductCard from './ShopProductCard';

describe('ShopProductCard Component', () => {
  const mockToggleAddToCart = vi.fn();
  const mockUpdateQuantity = vi.fn();

  const productProps = {
    id: 1,
    title: 'Test Product',
    category: 'electronics',
    image: 'http://example.com/product.png',
    price: 19.99,
    quantity: 2,
    addedToCart: false,
    toggleAddToCart: mockToggleAddToCart,
    updateQuantity: mockUpdateQuantity,
  };

  it('renders the product information correctly', () => {
    render(<ShopProductCard {...productProps} />);

    // Checking that the content is rendered correctly based on the props passed
    expect(screen.getByText(productProps.title)).toBeInTheDocument();
    expect(screen.getByText(productProps.category)).toBeInTheDocument();
    expect(screen.getByText(`$${productProps.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(productProps.quantity.toString())).toBeInTheDocument();

    // Checking that the image is rendered correctly from the source
    const imgElement = screen.getByRole('img', { name: productProps.title });
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', productProps.image);
  });

  it('renders the button text correctly when item is already added to the cart', () => {
    // Render the component, where it assume the user has added the item to the cart
    render(<ShopProductCard {...productProps} addedToCart={true} />);

    expect(screen.getByRole('button', { name: 'Remove from Cart' })).toBeInTheDocument();
  });

  it('calls toggleAddToCart and the button is clicked', async () => {
    render(<ShopProductCard {...productProps} />);
    const user = userEvent.setup();

    const addToCartButton = screen.getByRole('button', { name: 'Add To Cart' });

    await user.click(addToCartButton);
    expect(mockToggleAddToCart).toHaveBeenCalledTimes(1);
    expect(mockToggleAddToCart).toHaveBeenCalledWith(productProps.id);
  });

  it('passes correct props to ChangeQuantityButton', async () => {
    render(<ShopProductCard {...productProps} />);

    // Simlulate user clicking buttons inside the ChangeQuantityButton and verify that the arguments passed are correct
    const minusButton = screen.getByRole('button', { name: '-' });
    const plusButton = screen.getByRole('button', { name: '+' });

    minusButton.click();
    expect(mockUpdateQuantity).toHaveBeenCalledWith(productProps.id, -1);

    plusButton.click();
    expect(mockUpdateQuantity).toHaveBeenCalledWith(productProps.id, +1);
  });
});
