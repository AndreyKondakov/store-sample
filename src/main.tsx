import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsListPage from "./pages/ProductsListPage.tsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<ProductsListPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
