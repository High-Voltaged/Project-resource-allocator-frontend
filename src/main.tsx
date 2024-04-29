import React from "react";
import ReactDOM from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";

import { client } from "~/apollo/index.ts";
import { store } from "~/state/index.ts";

import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <PrimeReactProvider>
          <App />
        </PrimeReactProvider>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
