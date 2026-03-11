import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router';

import Navbar from './Navbar';

describe('NavBar Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Navbar noOfItems={4} />
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
        <Navbar noOfItems={0} />
      </MemoryRouter>
    );

    // Check that only cart is rendered
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });
});
