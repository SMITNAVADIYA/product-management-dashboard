import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorState from "../components/common/ErrorState";
import LoadingState from "../components/common/LoadingState";
import Pagination from "../components/common/Pagination";
import StatCard from "../components/common/StatCard";
import ProductTable from "../components/products/ProductTable";
import ProductToolbar from "../components/products/ProductToolbar";
import { PRODUCT_CONFIG } from "../constants/productConstants";
import { useProducts } from "../hooks/useProducts";
import DeleteProductModal from "./DeleteProductModel";
import { getProductStatus } from "../utils/productHelpers";
import Header from "../components/common/Header";
import toast from "react-hot-toast";

function ProductsPage() {
  const { products, total, loading, error, dispatch, retryLoadProducts } =
    useProducts();
  const [currentPage, setCurrentPage] = useState(PRODUCT_CONFIG.DEFAULT_PAGE);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(PRODUCT_CONFIG.DEFAULT_CATEGORY);
  const [status, setStatus] = useState(PRODUCT_CONFIG.DEFAULT_STATUS);
  const [sort, setSort] = useState(PRODUCT_CONFIG.DEFAULT_SORT);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  // --------------------------------
  // Categories
  // --------------------------------

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))].sort();
  }, [products]);

  // --------------------------------
  // Global Filtering + Sorting
  // --------------------------------

  const processedProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    let result = products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(normalizedSearch);

      const matchesCategory =
        category === "all" || product.category === category;

      const productStatus = getProductStatus(product);

      const matchesStatus = status === "all" || productStatus === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });

    result = [...result].sort((a, b) => {
      switch (sort) {
        case "name-asc":
          return a.title.localeCompare(b.title);

        case "name-desc":
          return b.title.localeCompare(a.title);

        case "price-low":
          return a.price - b.price;

        case "price-high":
          return b.price - a.price;

        case "stock-low":
          return a.stock - b.stock;

        case "stock-high":
          return b.stock - a.stock;

        default:
          return 0;
      }
    });

    return result;
  }, [products, search, category, status, sort]);

  // --------------------------------
  // Pagination
  // --------------------------------

  const totalPages = Math.ceil(
    processedProducts.length / PRODUCT_CONFIG.PAGE_SIZE,
  );

  // Prevent invalid page after delete/filter.
  const safeCurrentPage =
    totalPages > 0 ? Math.min(currentPage, totalPages) : 1;
  const paginatedProducts = useMemo(() => {
    const start = (safeCurrentPage - 1) * PRODUCT_CONFIG.PAGE_SIZE;
    const end = start + PRODUCT_CONFIG.PAGE_SIZE;
    return processedProducts.slice(start, end);
  }, [processedProducts, safeCurrentPage]);

  // --------------------------------
  // Filter handlers
  // --------------------------------

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSort(value);
    setCurrentPage(1);
  };

  // --------------------------------
  // Pagination handler
  // --------------------------------

  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // --------------------------------
  // Delete
  // --------------------------------

  const handleDelete = async () => {
    if (!deleteProduct) {
      return;
    }

    setDeleting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      dispatch({
        type: "DELETE_PRODUCT",
        payload: deleteProduct.id,
      });

      toast.success("Product deleted successfully!");

      setDeleteProduct(null);
    } catch (error) {
      console.error("Failed to delete product:", error);
    } finally {
      setDeleting(false);
    }
  };

  // --------------------------------
  // Loading
  // --------------------------------

  if (loading) {
    return <LoadingState message="Loading products..." />;
  }

  const handleClearFilters = () => {
    setSearch("");
    setCategory(PRODUCT_CONFIG.DEFAULT_CATEGORY);
    setStatus(PRODUCT_CONFIG.DEFAULT_STATUS);
    setSort(PRODUCT_CONFIG.DEFAULT_SORT);
    setCurrentPage(PRODUCT_CONFIG.DEFAULT_PAGE);
  };

  // --------------------------------
  // Error
  // --------------------------------

  if (error) {
    return (
      <ErrorState
        title="Unable to load products"
        message={error}
        onRetry={retryLoadProducts}
      />
    );
  }

  // --------------------------------
  // UI
  // --------------------------------

  return (
    <section className="w-full">
      {/* Header */}
      <Header
        title={"Inventory"}
        subTitle={"Products"}
        description={"Manage your products, inventory and availability."}
        onClick={() => navigate("/products/add")}
      />

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Total Products" value={total} />
        <StatCard
          label="Matching Products"
          value={processedProducts.length}
          description="After filters"
        />
        <StatCard label="Categories" value={categories.length} />
      </div>

      {/* Main */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <ProductToolbar
          search={search}
          category={category}
          status={status}
          sort={sort}
          categories={categories}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onStatusChange={handleStatusChange}
          onSortChange={handleSortChange}
          onClearFilters={handleClearFilters}
        />

        <ProductTable
          products={paginatedProducts}
          onDelete={setDeleteProduct}
        />

        <Pagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Delete Modal */}
      <DeleteProductModal
        product={deleteProduct}
        deleting={deleting}
        onCancel={() => setDeleteProduct(null)}
        onConfirm={handleDelete}
      />
    </section>
  );
}

export default ProductsPage;
