import { renderHook, waitFor } from '@testing-library/react';
import useShop from './useShop';
import { vi, describe, it, expect, afterEach } from 'vitest';

describe('api data fetching', () => {
  it('data fetched successfully', async () => {
    // Create mock response
    const mockResponse = [
      {
        id: 1,
        title: 'string',
        price: 0.1,
        description: 'string',
        category: 'string',
        image: 'http://example.com',
        quantity: 1,
        addedToCart: false,
      },
    ];

    global.fetch = vi.fn(() =>
      Promise.resolve({
        // Must add ok to be true to resolve the promise
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    // Render the hook and wait for the shopItemsList state to match the mockResponse
    const { result } = renderHook(() => useShop());

    await waitFor(() => {
      expect(result.current.shopItemsList).toEqual(mockResponse);
    });

    // Check that the api is called once and the url is correct
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products');
  });

  it('fails when there is an api error', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    );

    // Render the hook and wait for the shopItemsList state to match the mockResponse
    const { result } = renderHook(() => useShop());

    await waitFor(() => {
      expect(result.current.shopItemsList).toEqual([]);
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('fails when there is an network error', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')));

    // Render the hook and wait for the shopItemsList state to match the mockResponse
    const { result } = renderHook(() => useShop());

    await waitFor(() => {
      expect(result.current.shopItemsList).toEqual([]);
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });
});
