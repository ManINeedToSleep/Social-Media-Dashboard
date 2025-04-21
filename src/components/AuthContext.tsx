"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if the user is authenticated on initial load
  useEffect(() => {
    const checkAuth = () => {
      // Check both localStorage and cookies
      const isAuthLS = localStorage.getItem("isAuthenticated") === "true";
      const isAuthCookie = Cookies.get('isAuthenticated') === 'true';
      const isAuth = isAuthLS || isAuthCookie;
      
      if (isAuth) {
        const userData = localStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      }
      setIsLoading(false);
    };

    // Check auth on component mount
    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Demo authentication for MVP
    // In a real app, this would be an API call
    if (email === "user@example.com" && password === "password123") {
      const userData = {
        id: "1",
        name: "Demo User",
        email: "user@example.com",
      };
      
      // Set both localStorage and cookies
      localStorage.setItem("isAuthenticated", "true");
      Cookies.set('isAuthenticated', 'true', { expires: 7 });
      localStorage.setItem("user", JSON.stringify(userData));
      
      setUser(userData);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  // Logout function
  const logout = () => {
    // Clear both localStorage and cookies
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    Cookies.remove('isAuthenticated');
    
    setUser(null);
    router.push("/auth/custom-signin");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 