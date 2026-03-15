import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import * as reactRouter from 'react-router';

import ShopContext from '../../context/ShopContext';
import HomePage from './HomePage';

describe('HomePage rendering', () => {
  const mockHandleSelectedCategoryFunction = vi.fn();

  const mockContext = {
    categories: ['all', "men's clothing", 'jewelery', 'electronics', "women's clothing"],
    handleSelectedCategory: mockHandleSelectedCategoryFunction,
  };

  it('renders the header and button', () => {
    vi.spyOn(reactRouter, 'useOutletContext').mockReturnValue(mockContext);
    render(
      <MemoryRouter>
        <ShopContext value={mockContext}>
          <HomePage />
        </ShopContext>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Welcome to the Fake Store App!' }));
    expect(screen.getByRole('button', { name: 'Shop Now' }));
    expect(screen.getByRole('heading', { name: 'Browse By Category' }));

    expect(screen.getByRole('button', { name: "men's clothing" }));
    expect(screen.getByRole('button', { name: 'jewelery' }));
    expect(screen.getByRole('button', { name: 'electronics' }));
    expect(screen.getByRole('button', { name: "women's clothing" }));
  });
});
