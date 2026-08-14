import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LocaleProvider } from "./context/LocaleContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { QuickViewProvider } from "./context/QuickViewContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LocaleProvider>
        <CartProvider>
          <WishlistProvider>
            <QuickViewProvider>
              <App />
            </QuickViewProvider>
          </WishlistProvider>
        </CartProvider>
      </LocaleProvider>
    </BrowserRouter>
  </React.StrictMode>
);
