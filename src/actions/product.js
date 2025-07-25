import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  errorRetryCount: 3,
  errorRetryInterval: 5000,
};

export function useGetProducts() {
  const url = endpoints.product.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR(url, fetcher, swrOptions);

  const mappedProducts = useMemo(() => {
    let productsArray = [];

    if (data?.products && Array.isArray(data.products)) {
      productsArray = data.products;
    } else if (data?.data?.products && Array.isArray(data.data.products)) {
      productsArray = data.data.products;
    } else if (data?.data && Array.isArray(data.data)) {
      productsArray = data.data;
    } else if (Array.isArray(data)) {
      productsArray = data;
    } else {
      return [];
    }

    return productsArray.map((product, index) => ({
      id: product.id || product._id || index,
      name: product.product_name || product.name || 'Unnamed Product',
      category: product.category || 'Uncategorized',
      inventoryType: product.stock || product.inventoryType || product.inventory_type || 'in stock',
      price: product.price || 0,
      publish:
        product.available !== undefined
          ? product.available
            ? 'published'
            : 'draft'
          : product.publish || 'draft',
      createdAt: product.created || product.createdAt || product.created_at || new Date().toISOString(),
      image: product.image || product.imageUrl || product.image_url || null,
      rating: product.rating || 0,
      reviews: product.reviews || product.review_count || 0,
      description: product.description || '',
      quantity: product.quantity || 0,
      available: product.available || product.in_stock || 0,
    }));
  }, [data]);

  return useMemo(
    () => ({
      products: mappedProducts,
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && !error && mappedProducts.length === 0,
      refetch: mutate,
    }),
    [mappedProducts, error, isLoading, isValidating, mutate]
  );
}

export function useGetProduct(productId) {
  const url = productId ? [endpoints.product.details, { params: { productId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const mappedProduct = useMemo(() => {
    if (!data) return null;

    const product = data.product || data.data?.product || data.data || data;

    if (!product) return null;

    return {
      id: product.id || product._id,
      name: product.product_name || product.name || 'Unnamed Product',
      category: product.category || 'Uncategorized',
      inventoryType: product.stock || product.inventoryType || 'in stock',
      price: product.price || 0,
      publish:
        product.available !== undefined
          ? product.available
            ? 'published'
            : 'draft'
          : product.publish || 'draft',
      createdAt: product.created || product.createdAt || new Date().toISOString(),
      image: product.image || product.imageUrl || null,
      rating: product.rating || 0,
      reviews: product.reviews || 0,
      description: product.description || '',
      quantity: product.quantity || 0,
      available: product.available || 0,
    };
  }, [data]);

  return useMemo(
    () => ({
      product: mappedProduct,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
    }),
    [mappedProduct, error, isLoading, isValidating]
  );
}

export function useSearchProducts(query) {
  const url = query ? [endpoints.product.search, { params: { query } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const mappedSearchResults = useMemo(() => {
    const results =
      data?.results ||
      data?.products ||
      data?.data?.results ||
      data?.data?.products ||
      data?.data ||
      [];

    if (!Array.isArray(results)) return [];

    return results.map((product, index) => ({
      id: product.id || product._id || index,
      name: product.product_name || product.name || 'Unnamed Product',
      category: product.category || 'Uncategorized',
      inventoryType: product.stock || product.inventoryType || 'in stock',
      price: product.price || 0,
      publish:
        product.available !== undefined
          ? product.available
            ? 'published'
            : 'draft'
          : product.publish || 'draft',
      createdAt: product.created || product.createdAt || new Date().toISOString(),
      image: product.image || product.imageUrl || null,
      rating: product.rating || 0,
      reviews: product.reviews || 0,
    }));
  }, [data]);

  return useMemo(
    () => ({
      searchResults: mappedSearchResults,
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && mappedSearchResults.length === 0,
    }),
    [mappedSearchResults, error, isLoading, isValidating]
  );
}
