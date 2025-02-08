"use client";

import { createContext, useState, useContext } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children, userData }) => {
  const [currentUser, setCurrentUser] = useState(userData);

  return (
    <AuthContext.Provider
      value={{ userData: currentUser, setUserData: setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
