import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router';

import NavLink from './NavLink';

describe('NavLink component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <NavLink route="/shop" content={<button>Shop</button>} testId="shop" />
      </MemoryRouter>
    );
  });

  it('renders the content', () => {
    // Render the correct content
    expect(screen.getByText('Shop')).toBeInTheDocument();
  });

  it('has the correct href and test id', () => {
    // Ensures that the link element has the correct attributes
    const linkElement = screen.getByTestId('shop');
    expect(linkElement).toHaveAttribute('href', '/shop');
  });
});
