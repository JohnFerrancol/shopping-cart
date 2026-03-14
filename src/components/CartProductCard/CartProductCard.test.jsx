import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import CartProductCard from './CartProductCard';

describe('CartProductCard Component', () => {
  const mockToggleAddToCart = vi.fn();
  const mockUpdateQuantity = vi.fn();

  const productProps = {
    id: 1,
    title: 'Test Product',
    category: 'electronics',
    image: 'http://example.com/product.png',
    price: 19.99,
    quantity: 2,
    toggleAddToCart: mockToggleAddToCart,
    updateQuantity: mockUpdateQuantity,
  };

  it('renders the product information correctly', () => {
    render(<CartProductCard {...productProps} />);

    // Checking that the content is rendered correctly based on the props passed
    expect(screen.getByText(productProps.title)).toBeInTheDocument();
    expect(screen.getByText(productProps.category)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toContainHTML(
      `<b>Price</b>: $${productProps.price.toFixed(2)}`
    );

    expect(screen.getByText(productProps.quantity.toString())).toBeInTheDocument();

    // Checking that the image is rendered correctly from the source
    const imgElement = screen.getByRole('img', { name: productProps.title });
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', productProps.image);
  });

  it('calls toggleAddToCart when the remove icon is clicked', async () => {
    render(<CartProductCard {...productProps} />);
    const user = userEvent.setup();

    const removeIcon = screen.getByTestId('delete-icon');
    await user.click(removeIcon);

    // Ensure that the function is only called once with the product id as the argument
    expect(mockToggleAddToCart).toHaveBeenCalledTimes(1);
    expect(mockToggleAddToCart).toHaveBeenCalledWith(productProps.id);
  });

  it('passes correct props to ChangeQuantityButton', async () => {
    render(<CartProductCard {...productProps} />);

    // Simlulate user clicking buttons inside the ChangeQuantityButton and verify that the arguments passed are correct
    const minusButton = screen.getByRole('button', { name: '-' });
    const plusButton = screen.getByRole('button', { name: '+' });

    minusButton.click();
    expect(mockUpdateQuantity).toHaveBeenCalledWith(productProps.id, -1);

    plusButton.click();
    expect(mockUpdateQuantity).toHaveBeenCalledWith(productProps.id, +1);
  });
});
