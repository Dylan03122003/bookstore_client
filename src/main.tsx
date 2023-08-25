import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { CLIENT_ID } from "./../secure-data.ts";
import App from "./App.tsx";
import "./assets/global.css";
import { AuthProvider } from "./context/Auth/AuthContext.tsx";
import { BookProvider } from "./context/Book/BookContext.tsx";
import { CartProvider } from "./context/Cart/CartContext.tsx";
import { OrderProvider } from "./context/Order/OrderContext.tsx";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BookProvider>
          <CartProvider>
            <OrderProvider>
              <BrowserRouter>
                <PayPalScriptProvider options={{ clientId: CLIENT_ID }}>
                  <App />
                </PayPalScriptProvider>
              </BrowserRouter>
            </OrderProvider>
          </CartProvider>
        </BookProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
