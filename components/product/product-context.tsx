'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { createContext, useContext, useMemo, useOptimistic } from 'react';
import { Product } from 'lib/shopify/types';

type ProductState = {
  [key: string]: string;
} & {
  image?: string;
};

type ProductContextType = {
  state: ProductState;
  updateOption: (name: string, value: string) => ProductState;
  updateImage: (index: string) => ProductState;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({
  children,
  product
}: {
  children: React.ReactNode;
  product?: Product;
}) {
  const searchParams = useSearchParams();

  const getInitialState = () => {
    const params: ProductState = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }

    if (product) {
      const lowercaseParamKeys = Object.keys(params);

      product.options.forEach((option) => {
        const optionKey = option.name.toLowerCase();

        if (!lowercaseParamKeys.includes(optionKey) && option.values.length === 1) {
          params[optionKey] = option.values[0];
        }
      });

      const fallbackVariant =
        product.variants.find((variant) => variant.availableForSale) || product.variants[0];

      fallbackVariant?.selectedOptions.forEach((selectedOption) => {
        const optionKey = selectedOption.name.toLowerCase();

        if (!lowercaseParamKeys.includes(optionKey)) {
          params[optionKey] = selectedOption.value;
        }
      });
    }
    return params;
  };

  const [state, setOptimisticState] = useOptimistic(
    getInitialState(),
    (prevState: ProductState, update: ProductState) => ({
      ...prevState,
      ...update
    })
  );

  const updateOption = (name: string, value: string) => {
    const newState = { [name]: value };
    setOptimisticState(newState);
    return { ...state, ...newState };
  };

  const updateImage = (index: string) => {
    const newState = { image: index };
    setOptimisticState(newState);
    return { ...state, ...newState };
  };

  const value = useMemo(
    () => ({
      state,
      updateOption,
      updateImage
    }),
    [state]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
}

export function useUpdateURL() {
  const router = useRouter();

  return (state: ProductState) => {
    const newParams = new URLSearchParams(window.location.search);
    Object.entries(state).forEach(([key, value]) => {
      newParams.set(key, value);
    });
    router.push(`?${newParams.toString()}`, { scroll: false });
  };
}
