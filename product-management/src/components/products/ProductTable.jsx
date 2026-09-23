import ProductRow from "./ProductRow";
import ProductCard from "./ProduuctCard";

function ProductTable({ products, onDelete }) {
  if (!products.length) {
    return (
      <div className="flex min-h-[250px] items-center justify-center px-4 text-center">
        <div>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl">
            📦
          </div>

          <h3 className="mt-4 text-sm font-semibold text-gray-900">
            No products found
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Try changing your search or filter criteria.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop / Large Tablet */}
      <div className="hidden lg:block">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Product
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Category
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Price
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Stock
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile / Tablet */}
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:hidden">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onDelete={onDelete} />
        ))}
      </div>
    </>
  );
}

export default ProductTable;
