import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import * as reactRouter from 'react-router';

import CartPage from './CartPage';

describe('CartPage rendering', () => {
  const mockUpdateQuantity = vi.fn();
  const mockToggleAddToCart = vi.fn();

  const mockContext = {
    cartItemsList: [
      { id: 1, title: 'Item 1', addedToCart: true, price: 1, quantity: 2 },
      { id: 2, title: 'Item 2', addedToCart: false, price: 1, quantity: 1 },
    ],
    updateQuantity: mockUpdateQuantity,
    toggleAddToCart: mockToggleAddToCart,
    totalCost: 10,
  };

  it('renders only items in cart', () => {
    // Spy on useOutletContext and return mockContext
    vi.spyOn(reactRouter, 'useOutletContext').mockReturnValue(mockContext);

    render(<CartPage />);

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
});
