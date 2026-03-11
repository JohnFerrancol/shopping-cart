import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import * as reactRouter from 'react-router';

import ShopPage from './ShopPage';

describe('TestPage rendering', () => {
  const mockUpdateQuantity = vi.fn();
  const mockToggleAddToCart = vi.fn();

  const mockContext = {
    shopItemsList: [
      { id: 1, title: 'Item 1', addedToCart: true, price: 1, quantity: 2 },
      { id: 2, title: 'Item 2', addedToCart: false, price: 1, quantity: 1 },
    ],
    updateQuantity: mockUpdateQuantity,
    toggleAddToCart: mockToggleAddToCart,
  };

  it('renders items in the shop page', () => {
    // Spy on useOutletContext and return mockContext
    vi.spyOn(reactRouter, 'useOutletContext').mockReturnValue(mockContext);

    render(<ShopPage />);

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
});
