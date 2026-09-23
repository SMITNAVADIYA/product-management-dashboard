import { useNavigate } from "react-router-dom";
import ProductForm from "../components/products/ProductForm";

import { useProducts } from "../hooks/useProducts";

import { generateProductId } from "../utils/productHelpers";

function AddProductPage() {
  const navigate = useNavigate();

  const { products, dispatch } = useProducts();

  const handleSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newProduct = {
        ...data,
        id: generateProductId(products),
      };

      dispatch({
        type: "ADD_PRODUCT",
        payload: newProduct,
      });

      navigate("/products", {
        replace: true,
      });
    } catch (error) {
      console.error("Failed to add product:", error);
      throw error;
    }
  };

  return (
    <section className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-7">
        <button
          type="button"
          onClick={() => navigate("/products")}
          className="mb-4 text-sm font-medium text-gray-500 transition hover:text-gray-900"
        >
          ← Back to Products
        </button>

        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-500">
          Inventory
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Add Product
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Create a new product for your inventory.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <ProductForm onSubmit={handleSubmit} submitLabel="Add Product" />
      </div>
    </section>
  );
}

export default AddProductPage;
