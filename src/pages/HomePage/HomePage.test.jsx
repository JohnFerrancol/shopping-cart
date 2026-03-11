import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, createMemoryRouter, RouterProvider } from 'react-router';
import userEvent from '@testing-library/user-event';
import * as reactRouter from 'react-router';

import HomePage from './HomePage';

describe('HomePage rendering', () => {
  const mockHandleSelectedCategoryFunction = vi.fn();

  const mockContext = {
    categories: ['all', "men's clothing", 'jewelery', 'electronics', "women's clothing"],
    selectedCategory: 'all',
    handleSelectedCategory: mockHandleSelectedCategoryFunction,
  };

  it('renders the header and button', () => {
    vi.spyOn(reactRouter, 'useOutletContext').mockReturnValue(mockContext);
    render(
      <MemoryRouter>
        <HomePage />
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
