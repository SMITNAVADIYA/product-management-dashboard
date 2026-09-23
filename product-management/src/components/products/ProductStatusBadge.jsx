import { getProductStatus } from "../../utils/productHelpers";

const STATUS_STYLES = {
  "In Stock": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",

  "Low Stock": "bg-amber-50 text-amber-700 ring-amber-600/20",

  "Out of Stock": "bg-red-50 text-red-700 ring-red-600/20",
};

function ProductStatusBadge({ product }) {
  const status = getProductStatus(product);

  const statusStyle =
    STATUS_STYLES[status] || "bg-gray-50 text-gray-600 ring-gray-500/20";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyle}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />

      {status}
    </span>
  );
}

export default ProductStatusBadge;
