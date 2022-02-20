import { useApolloClient } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";

import WithChildren from "../types/WithChildren";

type AuthContextProps = {
  authToken?: string;
  setAuthToken: (data: string) => void;
  removeAuthToken: () => void;
};

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const AuthProvider = ({ children }: WithChildren) => {
  const client = useApolloClient();
  const [authToken, setAuthToken] = useState<string | undefined>(localStorage.getItem("JWT_AUTH") || undefined);

  const setToken = (token: string) => {
    localStorage.setItem("JWT_AUTH", token);
    setAuthToken(token);
  };

  const removeToken = () => {
    localStorage.removeItem("JWT_AUTH");
    setAuthToken(undefined);
    client.clearStore();
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        setAuthToken: setToken,
        removeAuthToken: removeToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
