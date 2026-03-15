import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import ShopContext from '../../context/ShopContext';
import ShopProductCard from './ShopProductCard';

describe('ShopProductCard Component', () => {
  const mockToggleAddToCart = vi.fn();

  const productProps = {
    id: 1,
    title: 'Test Product',
    category: 'electronics',
    image: 'http://example.com/product.png',
    price: 19.99,
    quantity: 2,
    addedToCart: false,
  };

  const mockContext = {
    toggleAddToCart: mockToggleAddToCart,
  };

  it('renders the product information correctly', () => {
    render(
      <ShopContext value={mockContext}>
        <ShopProductCard {...productProps} />
      </ShopContext>
    );

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
    render(
      <ShopContext value={mockContext}>
        <ShopProductCard {...productProps} addedToCart={true} />
      </ShopContext>
    );

    expect(screen.getByRole('button', { name: 'Remove from Cart' })).toBeInTheDocument();
  });

  it('calls toggleAddToCart and the button is clicked', async () => {
    render(
      <ShopContext value={mockContext}>
        <ShopProductCard {...productProps} />
      </ShopContext>
    );
    const user = userEvent.setup();

    const addToCartButton = screen.getByRole('button', { name: 'Add To Cart' });

    await user.click(addToCartButton);
    expect(mockToggleAddToCart).toHaveBeenCalledTimes(1);
    expect(mockToggleAddToCart).toHaveBeenCalledWith(productProps.id);
  });
});
