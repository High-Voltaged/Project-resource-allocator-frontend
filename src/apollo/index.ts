import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const link = new HttpLink({
  uri: import.meta.env.VITE_SERVER_URL,
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
