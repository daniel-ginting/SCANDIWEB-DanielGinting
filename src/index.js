import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { CurrenciesProvider } from "./contexts/currencies.context";
import { CartItemsProvider } from "./contexts/cart-items.context";

import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

export const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <CurrenciesProvider>
          <CartItemsProvider>
            <App />
          </CartItemsProvider>
        </CurrenciesProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
