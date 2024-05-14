import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { Theme } from "@radix-ui/themes";

import { client } from "~/apollo/index.ts";
import { store } from "~/state/index.ts";

import App from "./App.tsx";
import "@radix-ui/themes/styles.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Theme accentColor="indigo" radius="large">
          <App />
        </Theme>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
