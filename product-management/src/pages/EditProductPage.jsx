import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorState from "../components/common/ErrorState";
import LoadingState from "../components/common/LoadingState";

import ProductForm from "../components/products/ProductForm";

import { useProducts } from "../hooks/useProducts";

function EditProductPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { products, loading, error, dispatch } = useProducts();

  const product = useMemo(() => {
    return products.find((item) => String(item.id) === String(id));
  }, [products, id]);

  // --------------------------------
  // Loading
  // --------------------------------

  if (loading) {
    return <LoadingState message="Loading product..." />;
  }

  // --------------------------------
  // Context Error
  // --------------------------------

  if (error) {
    return <ErrorState title="Unable to load product" message={error} />;
  }

  // --------------------------------
  // Product Not Found
  // --------------------------------

  if (!product) {
    return (
      <ErrorState
        title="Product not found"
        message="The product you are trying to edit does not exist."
        minHeight="min-h-[300px]"
      />
    );
  }

  // --------------------------------
  // Update
  // --------------------------------

  const handleSubmit = async (data) => {
    try {
      // Simulate API request.
      await new Promise((resolve) => setTimeout(resolve, 500));

      dispatch({
        type: "UPDATE_PRODUCT",
        payload: {
          ...data,
          id: product.id,
        },
      });

      navigate("/products", {
        replace: true,
      });
    } catch (error) {
      console.error("Failed to update product:", error);

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
          Edit Product
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Update the product information.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <ProductForm
          initialValues={product}
          onSubmit={handleSubmit}
          submitLabel="Update Product"
        />
      </div>
    </section>
  );
}

export default EditProductPage;
