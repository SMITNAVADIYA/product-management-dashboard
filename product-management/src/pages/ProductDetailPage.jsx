import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import ProductStatusBadge from "../components/products/ProductStatusBadge";

import { useProducts } from "../hooks/useProducts";

function ProductDetailsPage() {
  const { id } = useParams();

  const { products, loading } = useProducts();

  const product = useMemo(
    () => products.find((item) => item.id === Number(id)),
    [products, id],
  );

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Product not found
        </h2>

        <Link
          to="/products"
          className="mt-4 inline-block text-sm font-semibold text-gray-700 underline"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-5xl">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Inventory
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
            Product Details
          </h1>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex items-center justify-center bg-gray-50 p-8">
            <img
              src={product?.image ?? ""}
              alt={product.title}
              className="h-72 w-72 rounded-xl object-cover"
            />
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  {product.brand}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  {product.title}
                </h2>
              </div>

              <ProductStatusBadge product={product} />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Category</p>

                <p className="mt-1 font-semibold capitalize text-gray-900">
                  {product.category}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Price</p>

                <p className="mt-1 font-semibold text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Stock</p>

                <p className="mt-1 font-semibold text-gray-900">
                  {product.stock}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Product ID</p>

                <p className="mt-1 font-semibold text-gray-900">
                  #{product.id}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-900">
                Description
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsPage;
