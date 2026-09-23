import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ProductProvider } from "./context/ProductProvider.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ProductProvider>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
      }}
    />
  </ProductProvider>,

  // </StrictMode>,
);
