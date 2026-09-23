import { Navigate, Route, Routes } from "react-router-dom";

import AddProductPage from "../pages/AddProductPage";
import EditProductPage from "../pages/EditProductPage";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailsPage from "../pages/ProductDetailPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/add" element={<AddProductPage />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />
      <Route path="/products/:id/edit" element={<EditProductPage />} />
      <Route path="*" element={<Navigate to="/products" replace />} />
    </Routes>
  );
}

export default AppRoutes;
