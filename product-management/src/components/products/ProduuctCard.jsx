import { useNavigate } from "react-router-dom";

import Button from "../common/Button";
import ProductStatusBadge from "./ProductStatusBadge";

function ProductCard({ product, onDelete }) {
  const navigate = useNavigate();

  return (
    <article className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      {/* Product Header */}
      <div className="flex gap-4">
        {/* Image */}
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xl text-gray-400">
              📦
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-gray-900">
            {product.title}
          </h3>

          <p className="mt-1 truncate text-sm text-gray-500">
            {product.brand || "No brand"}
          </p>

          <span className="mt-2 inline-flex max-w-full truncate rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
            {product.category}
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-gray-50 p-3">
        <div>
          <p className="text-xs font-medium text-gray-500">Price</p>

          <p className="mt-1 text-sm font-semibold text-gray-900">
            ${Number(product.price).toFixed(2)}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-gray-500">Stock</p>

          <p className="mt-1 text-sm font-semibold text-gray-900">
            {product.stock}
          </p>
        </div>

        <div className="col-span-2 flex items-center justify-between border-t border-gray-200 pt-3">
          <p className="text-xs font-medium text-gray-500">Status</p>

          <ProductStatusBadge product={product} />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Button
          type="button"
          className="w-full px-2 text-xs sm:text-sm"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          View
        </Button>

        <Button
          type="button"
          className="w-full px-2 text-xs sm:text-sm"
          onClick={() => navigate(`/products/${product.id}/edit`)}
        >
          Edit
        </Button>

        <Button
          type="button"
          className="w-full px-2 text-xs sm:text-sm"
          onClick={() => onDelete(product)}
        >
          Delete
        </Button>
      </div>
    </article>
  );
}

export default ProductCard;
