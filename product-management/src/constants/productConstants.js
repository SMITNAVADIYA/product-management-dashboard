export const PRODUCT_CONFIG = {
  PAGE_SIZE: 10,
  DEFAULT_PAGE: 1,
  DEFAULT_SORT: "default",
  DEFAULT_CATEGORY: "all",
  DEFAULT_STATUS: "all",
  STORAGE_KEY: "product_management_products",
};

export const PRODUCT_SORT_OPTIONS = [
  {
    value: "default",
    label: "Default",
  },
  {
    value: "name-asc",
    label: "Name: A to Z",
  },
  {
    value: "name-desc",
    label: "Name: Z to A",
  },
  {
    value: "price-low",
    label: "Price: Low to High",
  },
  {
    value: "price-high",
    label: "Price: High to Low",
  },
  {
    value: "stock-low",
    label: "Stock: Low to High",
  },
  {
    value: "stock-high",
    label: "Stock: High to Low",
  },
];

export const PRODUCT_STATUS = {
  IN_STOCK: "In Stock",
  LOW_STOCK: "Low Stock",
  OUT_OF_STOCK: "Out of Stock",
};

export const PRODUCT_STATUS_OPTIONS = [
  {
    value: "all",
    label: "All Status",
  },
  {
    value: PRODUCT_STATUS.IN_STOCK,
    label: PRODUCT_STATUS.IN_STOCK,
  },
  {
    value: PRODUCT_STATUS.LOW_STOCK,
    label: PRODUCT_STATUS.LOW_STOCK,
  },
  {
    value: PRODUCT_STATUS.OUT_OF_STOCK,
    label: PRODUCT_STATUS.OUT_OF_STOCK,
  },
];

export const CATEGORY_OPTIONS = [
  "beauty",
  "groceries",
  "mens-shirts",
  "mens-pants",
  "mens-shoes",
  "mens-accessories",
  "smartphones",
  "laptops",
  "audio",
  "watches",
  "kitchen",
  "sports-accessories",
];
