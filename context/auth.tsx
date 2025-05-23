"use client";
import { OptionTypes } from "@/interface/user-interface";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  user: any;
  setUser: (value: any) => void;
  token: string;
  setToken: (value: string) => void;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [selectedOption, setSelectedOption] = useState<string>("parent");
  useEffect(() => {
    const user = localStorage.getItem("kids-user");
    const token = localStorage.getItem("kids-token");
    if (user) {
      setUser(JSON.parse(user));
    }
    if (token) {
      setToken(token);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        selectedOption,
        setSelectedOption,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const AuthStatesContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Auth Context must be used within a Auth Context Provider");
  }
  return context;
};
