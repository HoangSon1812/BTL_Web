import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { AuthProvider } from "./store/AuthContext";
import { AdminProvider } from "./store/AdminContext";
import { CartProvider } from "./store/CartContext";
import { OrderProvider } from "./store/OrderContext";
import { WishlistProvider } from "./store/WishlistContext";
import { ToastProvider } from "./store/ToastContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AdminProvider>
          <CartProvider>
            <OrderProvider>
              <WishlistProvider>
                <ToastProvider>
                  <App />
                </ToastProvider>
              </WishlistProvider>
            </OrderProvider>
          </CartProvider>
        </AdminProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
