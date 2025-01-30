import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";

// Define types for authentication state
interface AuthContextType {
  user: string | null;
  signin: (username: string, password: string) => Promise<void>;
  signout: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Load user from localStorage when app starts
  const [user, setUser] = useState<string | null>(() => {
    return localStorage.getItem("user");
  });

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", user);
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Signin function
  const signin = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/signin",
        { username, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setUser(username);
        localStorage.setItem("user", username); // Store user in localStorage
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
        //@ts-ignore
      console.error("Signin failed:", error.response?.data?.msg || "An error occurred");
      throw error;
    }
  };

  // Signout function
  const signout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Clear user from localStorage
  };

  return <AuthContext.Provider value={{ user, signin, signout }}>{children}</AuthContext.Provider>;
};

// Custom hook to use authentication
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
