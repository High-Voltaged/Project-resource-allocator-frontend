import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LSKey } from "~/shared/types";
import { getLSValue } from "~/shared/utils";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_SERVER_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = getLSValue(LSKey.AccessToken);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
