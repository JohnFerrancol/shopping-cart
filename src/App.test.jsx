import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { describe, it, expect } from 'vitest';

import routes from './routes/routes';

describe('correct routing for navigation cluster', () => {
  it('homepage loads correctly with nav clusters', () => {
    const memoryRouter = createMemoryRouter(routes);
    render(<RouterProvider router={memoryRouter} />);

    // Checking that the Homepage is rendered on load
    expect(screen.getByRole('heading', { name: /welcome/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Shop Now' })).toBeInTheDocument();
  });

  it('correct page is rendered correctly when user clicks the nav cluster', async () => {
    const memoryRouter = createMemoryRouter(routes);
    render(<RouterProvider router={memoryRouter} />);

    const user = userEvent.setup();

    const homeLink = screen.getByTestId('app-logo');
    const shopLink = screen.getByTestId('shop');
    const cartLink = screen.getByTestId('cart');

    // Create user events where the user clicks the links in the nav cluster then ensure that the right elements are rendered
    await user.click(homeLink);
    expect(screen.getByRole('heading', { name: /welcome/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Shop Now' })).toBeInTheDocument();

    await user.click(shopLink);
    expect(screen.getByRole('heading', { name: /shop/i })).toBeInTheDocument();

    await user.click(cartLink);
    expect(screen.getByRole('heading', { name: /cart/i })).toBeInTheDocument();
  });
});
