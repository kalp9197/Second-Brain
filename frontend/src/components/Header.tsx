import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(true);

  const logoutHandler = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/user/logout", { withCredentials: true });

      if (response.data.success) {

        setIsSignedIn(false); 
        navigate("/signin"); 
      } else {
        
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <div className="mb-16">
        <header className="fixed top-0 left-0 w-full bg-opacity-80 backdrop-blur-lg z-50 flex justify-between items-center px-6 py-3 bg-transparent shadow-md">
          <h1 className="text-lg font-semibold text-white cursor-pointer hover:text-gray-300">
            Second Brain
          </h1>
          <div className="flex gap-3">
            {isSignedIn && (
              <Button onClick={logoutHandler} className="px-4 py-1.5 bg-red-500 text-white text-sm rounded-full shadow-lg hover:bg-red-600 transition">
                Logout
              </Button>
            )}
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
