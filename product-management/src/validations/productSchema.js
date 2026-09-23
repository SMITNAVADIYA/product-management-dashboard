import * as yup from "yup";

export const productSchema = (existingImage = "") =>
  yup.object({
    title: yup
      .string()
      .trim()
      .required("Product name is required.")
      .min(3, "Product name must be at least 3 characters."),
    category: yup.string().required("Category is required."),
    price: yup
      .number()
      .typeError("Price must be a number.")
      .required("Price is required.")
      .positive("Price must be greater than 0."),
    stock: yup
      .number()
      .typeError("Stock must be a number.")
      .required("Stock is required.")
      .integer("Stock must be a whole number.")
      .min(0, "Stock cannot be negative."),
    brand: yup.string().trim().required("Brand is required."),
    description: yup
      .string()
      .trim()
      .required("Description is required.")
      .min(10, "Description must be at least 10 characters."),
    image: yup
      .mixed()
      .test("required-image", "Product image is required.", (value) => {
        const hasNewImage = value && value.length > 0;
        const hasExistingImage = Boolean(existingImage);
        return hasNewImage || hasExistingImage;
      }),
  });
