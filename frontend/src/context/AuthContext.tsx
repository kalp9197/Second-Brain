import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";

interface AuthContextType {
  user: string | null;
  signin: (username: string, password: string) => Promise<void>;
  signout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(() => {
    return localStorage.getItem("user");
  });

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
        localStorage.setItem("user", username); 
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
    localStorage.removeItem("user");
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
