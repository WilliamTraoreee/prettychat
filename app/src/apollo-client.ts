import { ApolloClient, InMemoryCache, from, split, FieldMergeFunction } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";

import Routes from "./Router";
// import generatedIntrospection from "./graphql/introspection-result";

const wsLink = new WebSocketLink({
  uri: import.meta.env.WS_APP_API_URL || "ws://localhost:4000/graphql",
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: () => {
      const tokenWS = `Bearer ${localStorage.getItem("JWT_AUTH")}`;
      return { Authorization: tokenWS };
    },
  },
});

// const uploadLink = createUploadLink({
//   uri: process.env.REACT_APP_GRAPHQL_API_URL || "http://localhost:4000/graphql",
// });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("JWT_AUTH");

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

type PaginatedType = { items: any[]; total?: number; hasMore?: boolean };

const mergeStrategyPaginate: FieldMergeFunction<PaginatedType, PaginatedType> = (existing, incoming, { args }) => {
  if (!incoming && existing) return existing;
  if (!existing && incoming) return incoming;

  return {
    ...incoming,
    items: [...(existing?.items || []), ...(incoming?.items || [])],
  };
};

const logoutLink = onError(({ graphQLErrors, operation, forward }) => {
  const unauthenticatedError = graphQLErrors?.find((e) => e.extensions?.code === "UNAUTHENTICATED");
  if (unauthenticatedError) {
    localStorage.removeItem("JWT_AUTH");
    apolloClient.clearStore();
    window.location.assign("/");
  }
  return forward(operation);
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  from([authLink, logoutLink]),
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    // possibleTypes: generatedIntrospection.possibleTypes,
    typePolicies: {
      Slide: {
        fields: {
          data: {
            merge: (existing, incoming, { mergeObjects }) => mergeObjects(existing, incoming),
          },
        },
      },
      Query: {
        fields: {
          mediaLibrary: {
            keyArgs: ["filters", "searchFilters"],
            merge: mergeStrategyPaginate,
          },
        },
      },
    },
  }),
});
