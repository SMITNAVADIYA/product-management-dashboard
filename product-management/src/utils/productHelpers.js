import { PRODUCT_STATUS } from "../constants/productConstants";

export const getProductStatus = (product) => {
  if (product.stock <= 0) {
    return PRODUCT_STATUS.OUT_OF_STOCK;
  }

  if (product.stock <= 10) {
    return PRODUCT_STATUS.LOW_STOCK;
  }

  return PRODUCT_STATUS.IN_STOCK;
};

export const generateProductId = (products) => {
  if (!products.length) {
    return 1;
  }

  return Math.max(...products.map((product) => product.id)) + 1;
};
