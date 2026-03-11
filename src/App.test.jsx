import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { describe, it, expect } from 'vitest';

import routes from './routes/routes';

describe('correct routing for navigation cluster', () => {
  it('homepage loads correctly with nav clusters', () => {
    const memoryRouter = createMemoryRouter(routes);
    render(<RouterProvider router={memoryRouter} />);

    // Checking that the application header is loaded
    expect(screen.getByRole('heading', { name: /shopping cart/i })).toBeInTheDocument();

    // Checking that links are rendered properly
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /shop/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /cart/i })).toBeInTheDocument();

    // Checking that the Homepage is rendered on load
    expect(screen.getByRole('heading', { name: /home page/i })).toBeInTheDocument();
  });

  it('correct page is rendered correctly when user clicks the nav cluster', async () => {
    const memoryRouter = createMemoryRouter(routes);
    render(<RouterProvider router={memoryRouter} />);

    const user = userEvent.setup();

    const homeLink = screen.getByRole('link', { name: /home/i });
    const shopLink = screen.getByRole('link', { name: /shop/i });
    const cartLink = screen.getByRole('link', { name: /cart/i });

    // Create user events where the user clicks the links in the nav cluster then ensure that the right elements are rendered
    await user.click(homeLink);
    expect(screen.getByRole('heading', { name: /home page/i })).toBeInTheDocument();

    await user.click(shopLink);
    expect(screen.getByRole('heading', { name: /shop page/i })).toBeInTheDocument();

    await user.click(cartLink);
    expect(screen.getByRole('heading', { name: /cart page/i })).toBeInTheDocument();
  });
});
