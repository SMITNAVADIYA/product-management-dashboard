import { useNavigate } from "react-router-dom";

import Button from "../common/Button";
import ProductStatusBadge from "./ProductStatusBadge";

function ProductRow({ product, onDelete }) {
  const navigate = useNavigate();

  return (
    <tr className="transition hover:bg-gray-50">
      {/* Product */}
      <td className="px-5 py-4">
        <div className="flex min-w-[220px] items-center gap-3">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">
                📦
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">
              {product.title}
            </p>

            <p className="mt-1 truncate text-xs text-gray-500">
              {product.brand || "No brand"}
            </p>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="px-5 py-4">
        <span className="inline-flex rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
          {product.category}
        </span>
      </td>

      {/* Price */}
      <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-900">
        ${Number(product.price).toFixed(2)}
      </td>

      {/* Stock */}
      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-700">
        {product.stock}
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        <ProductStatusBadge product={product} />
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            className="px-3 py-1.5 text-xs"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            View
          </Button>

          <Button
            type="button"
            className="px-3 py-1.5 text-xs"
            onClick={() => navigate(`/products/${product.id}/edit`)}
          >
            Edit
          </Button>

          <Button
            type="button"
            className="px-3 py-1.5 text-xs"
            onClick={() => onDelete(product)}
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default ProductRow;
