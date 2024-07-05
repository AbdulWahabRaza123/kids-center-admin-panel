"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  user: any;
  setUser: (value: any) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export const AuthStatesContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "Airdrop Context must be used within a Airdrop Context Provider"
    );
  }
  return context;
};
