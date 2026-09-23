import Input from "../common/Input";
import Select from "../common/Select";
import {
  PRODUCT_SORT_OPTIONS,
  PRODUCT_STATUS_OPTIONS,
} from "../../constants/productConstants";
import Button from "../common/Button";

function ProductToolbar({
  search,
  category,
  status,
  sort,
  categories,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onSortChange,
  onClearFilters,
}) {
  const categoryOptions = [
    { value: "all", label: "All Categories" },
    ...categories.map((item) => ({
      value: item,
      label: item,
    })),
  ];

  const hasActiveFilters =
    search.trim() !== "" ||
    category !== "all" ||
    status !== "all" ||
    sort !== "default";

  return (
    <div className="border-b border-gray-200 p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {/* Search */}
        <div className="sm:col-span-2 lg:col-span-2">
          <Input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search products..."
            className="w-full"
          />
        </div>

        {/* Category */}
        <Select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          options={categoryOptions}
          className="w-full"
        />

        {/* Status */}
        <Select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          options={PRODUCT_STATUS_OPTIONS}
          className="w-full"
        />

        {/* Sort */}
        <Select
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
          options={PRODUCT_SORT_OPTIONS}
          className="w-full"
        />
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="mt-3 flex justify-end">
          <Button type="button" onClick={onClearFilters}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProductToolbar;
