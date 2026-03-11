import { renderHook, waitFor, act } from '@testing-library/react';
import useShop from './useShop';
import { vi, describe, it, expect, afterEach } from 'vitest';

describe('useShop - Data Fetching', () => {
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

describe('useShop - functions and derived values', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'string1',
      price: 0,
      description: 'string',
      category: 'string',
      image: 'http://example.com',
      quantity: 1,
      addedToCart: false,
    },
    {
      id: 2,
      title: 'string1',
      price: 0,
      description: 'string',
      category: 'string',
      image: 'http://example.com',
      quantity: 2,
      addedToCart: true,
    },
    {
      id: 30,
      title: 'string3',
      price: 0,
      description: 'string',
      category: 'string',
      image: 'http://example.com',
      quantity: 4,
      addedToCart: true,
    },
    {
      id: 4,
      title: 'string4',
      price: 1,
      description: 'string',
      category: 'string',
      image: 'http://example.com',
      quantity: 1,
      addedToCart: false,
    },
    {
      id: 5,
      title: 'string5',
      price: 1,
      description: 'string',
      category: 'string',
      image: 'http://example.com',
      quantity: 1,
      addedToCart: true,
    },
  ];

  let fetchSpy;

  beforeEach(() => {
    // Spy on fetch and return mock data
    fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calculates cartItemsList, totalItems, totalCost correctly after fetching the shop items data', async () => {
    const { result } = renderHook(() => useShop());

    // Add the quantity and addedToCart information
    const expectedShopItemsList = mockProducts.map((product) => ({
      ...product,
      quantity: product.id % 10 === 0 ? 2 : 1,
      addedToCart: product.id % 10 === 0,
    }));

    // Calculate the derived values and make sure it matches
    await waitFor(() => {
      // Check shopItemsList
      expect(result.current.shopItemsList).toEqual(expectedShopItemsList);

      // Check cartItemsList
      expect(result.current.cartItemsList).toEqual(
        expectedShopItemsList.filter((item) => item.addedToCart)
      );

      // Check totalItems
      expect(result.current.totalItems).toEqual(
        expectedShopItemsList
          .filter((item) => item.addedToCart)
          .reduce((sum, item) => sum + item.quantity, 0)
      );

      // Check totalCost
      expect(result.current.totalCost).toEqual(
        expectedShopItemsList
          .filter((item) => item.addedToCart)
          .reduce((sum, item) => sum + item.quantity * item.price, 0)
      );
    });
  });

  it('toggle a product in/out of the cart correctly', async () => {
    const { result } = renderHook(() => useShop());

    // Wait for initial fetch
    await waitFor(() => result.current.shopItemsList.length > 0);

    act(() => {
      result.current.toggleAddToCart(1);
    });

    // After toggle, it should be added to cart
    const toggledProduct = result.current.shopItemsList.find((p) => p.id === 1);
    expect(toggledProduct.addedToCart).toBe(true);
  });

  it('add quantity correctly', async () => {
    const { result } = renderHook(() => useShop());

    // Wait for initial fetch
    await waitFor(() => result.current.shopItemsList.length > 0);

    act(() => {
      result.current.updateQuantity(2, +1);
    });

    // Check that the product with id 2's quantity increase to 2
    const newProduct2 = result.current.shopItemsList.find((p) => p.id === 2);
    expect(newProduct2.quantity).toBe(2);
  });

  it('subtracts quantity correctly', async () => {
    const { result } = renderHook(() => useShop());

    // Wait for initial fetch
    await waitFor(() => result.current.shopItemsList.length > 0);

    act(() => {
      result.current.updateQuantity(30, -1);
    });

    // Check that the product with id 30's quantity increase to 1
    const newProduct3 = result.current.shopItemsList.find((p) => p.id === 30);
    expect(newProduct3.quantity).toBe(1);
  });

  it('does not do anything when subtracting quantity of 1 and the item is not added in cart', async () => {
    const { result } = renderHook(() => useShop());

    // Wait for initial fetch
    await waitFor(() => result.current.shopItemsList.length > 0);

    act(() => {
      result.current.updateQuantity(4, -1);
    });

    // Check that the product with id 4's quantity remains at 1
    const newProduct4 = result.current.shopItemsList.find((p) => p.id === 4);
    expect(newProduct4.quantity).toBe(1);
  });

  it('removes items from cart when substracting quantity of 1', async () => {
    const { result } = renderHook(() => useShop());

    // Wait for initial fetch
    await waitFor(() => result.current.shopItemsList.length > 0);

    act(() => {
      result.current.updateQuantity(5, -1);
    });

    // Check that the product with id 5's quantity remains at 1 and the addToCart is now false
    const newProduct5 = result.current.shopItemsList.find((p) => p.id === 5);
    expect(newProduct5.addedToCart).toBe(false);
    expect(newProduct5.quantity).toBe(1);
  });
});
