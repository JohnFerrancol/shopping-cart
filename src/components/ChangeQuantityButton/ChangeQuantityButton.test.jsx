import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';

import ChangeQuantityButton from './ChangeQuantityButton';

describe('ChangeQuantityButton component', () => {
  it('renders the correct buttons and quantity', () => {
    const mockUpdateQuantity = vi.fn();
    render(
      <MemoryRouter>
        <ChangeQuantityButton productId={1} updateQuantity={mockUpdateQuantity} quantity={2} />
      </MemoryRouter>
    );

    // Check that the buttons and the quantity is rendered correctly
    expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('calls the correct function for the + and - buttons', async () => {
    const mockUpdateQuantity = vi.fn();
    render(
      <MemoryRouter>
        <ChangeQuantityButton productId={1} updateQuantity={mockUpdateQuantity} quantity={2} />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const plusButton = screen.getByRole('button', { name: '+' });
    const minusButton = screen.getByRole('button', { name: '-' });

    // When the buttons are clicked, make sure that the function is only called once and the correct arguments as passed into the function
    await user.click(plusButton);
    expect(mockUpdateQuantity).toHaveBeenCalled(1);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, +1);

    await user.click(minusButton);
    expect(mockUpdateQuantity).toHaveBeenCalled(1);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, -1);
  });
});
