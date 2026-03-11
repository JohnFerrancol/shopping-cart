import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HomePage from './HomePage';
import { MemoryRouter, createMemoryRouter, RouterProvider } from 'react-router';
import userEvent from '@testing-library/user-event';

import routes from '../../routes/routes';

describe('HomePage rendering', () => {
  it('renders the header and button', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Welcome to the Fake Store App!' }));
    expect(screen.getByRole('button', { name: 'Shop Now' }));
  });

  it('navigates to the shop route with the button', async () => {
    const memoryRouter = createMemoryRouter(routes);
    render(<RouterProvider router={memoryRouter} />);

    const user = userEvent.setup();

    const shopNowButton = screen.getByRole('button', { name: 'Shop Now' });
    await user.click(shopNowButton);
    expect(screen.getByRole('heading', { name: /shop/i })).toBeInTheDocument();
  });
});
