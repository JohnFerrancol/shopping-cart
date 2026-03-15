import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router';

import ShopContext from '../../context/ShopContext';
import Navbar from './Navbar';

describe('NavBar Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ShopContext value={{ totalItems: 4 }}>
          <Navbar />
        </ShopContext>
      </MemoryRouter>
    );
  });

  it('renders the links and the logo', () => {
    // Checking that Application logo is rendered properly
    expect(screen.getByTestId('app-logo')).toBeInTheDocument();

    // Checking that links are rendered properly
    expect(screen.getByTestId('shop')).toBeInTheDocument();
    expect(screen.getByTestId('cart')).toBeInTheDocument();
  });

  it('shows the cart count when there is items in the cart', () => {
    // Check that the cart count is rendered properly
    expect(screen.getByText('Cart (4)')).toBeInTheDocument();
  });

  it('does not show the cart count when there is no items in the cart', () => {
    render(
      <MemoryRouter>
        <ShopContext value={{ totalItems: 0 }}>
          <Navbar />
        </ShopContext>
      </MemoryRouter>
    );

    // Check that only cart is rendered
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });
});
