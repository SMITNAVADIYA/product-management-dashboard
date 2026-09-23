import { useEffect, useReducer } from "react";

import { PRODUCT_CONFIG } from "../constants/productConstants";

import mockProducts from "../data/products.json";
import { ProductContext } from "./ProductContext";

const initialState = {
  products: [],
  total: 0,
  loading: true,
  error: null,
};

const getInitialProducts = () => {
  const storedProducts = localStorage.getItem(PRODUCT_CONFIG.STORAGE_KEY);

  if (!storedProducts) {
    return mockProducts;
  }
  try {
    return JSON.parse(storedProducts);
  } catch (error) {
    console.error("Failed to parse products from localStorage:", error);
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload,
        total: action.payload.length,
        loading: false,
        error: null,
      };

    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "ADD_PRODUCT": {
      const updatedProducts = [action.payload, ...state.products];

      return {
        ...state,
        products: updatedProducts,
        total: updatedProducts.length,
        error: null,
      };
    }

    case "UPDATE_PRODUCT": {
      const updatedProducts = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product,
      );

      return {
        ...state,
        products: updatedProducts,
        total: updatedProducts.length,
        error: null,
      };
    }

    case "DELETE_PRODUCT": {
      const updatedProducts = state.products.filter(
        (product) => product.id !== action.payload,
      );

      return {
        ...state,
        products: updatedProducts,
        total: updatedProducts.length,
        error: null,
      };
    }

    default:
      return state;
  }
};

const loadProducts = async (dispatch) => {
  try {
    dispatch({
      type: "FETCH_START",
    });

    // Simulate API/network delay.
    await new Promise((resolve) => setTimeout(resolve, 400));

    const products = getInitialProducts();

    if (!Array.isArray(products)) {
      throw new Error("Invalid product data.");
    }

    dispatch({
      type: "FETCH_SUCCESS",
      payload: products,
    });
  } catch (error) {
    console.error("Failed to load products:", error);

    dispatch({
      type: "FETCH_ERROR",
      payload: error?.message || "Failed to load products.",
    });
  }
};

export function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    loadProducts(dispatch);
  }, []);

  useEffect(() => {
    if (state.loading) {
      return;
    }

    try {
      localStorage.setItem(
        PRODUCT_CONFIG.STORAGE_KEY,
        JSON.stringify(state.products),
      );
    } catch (error) {
      console.error("Failed to save products to localStorage:", error);
    }
  }, [state.products, state.loading]);

  const retryLoadProducts = () => {
    loadProducts(dispatch);
  };

  return (
    <ProductContext.Provider
      value={{
        ...state,
        dispatch,
        retryLoadProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
