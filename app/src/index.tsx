import "./index.scss";
import ReactDOM from "react-dom";
import Router from "./Router";
import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./apollo-client";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
