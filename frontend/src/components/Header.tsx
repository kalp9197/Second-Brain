import React, { useState } from "react";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-opacity-80 backdrop-blur-lg z-50 flex justify-between items-center px-6 py-3 bg-transparent shadow-md">

      <h1 className="text-lg font-semibold text-white cursor-pointer hover:text-gray-300">
        Second Brain
      </h1>

      <div className="flex gap-3">
        {!isLoggedIn ? (
          <>
            <button
              className="px-4 py-1.5 bg-blue-500 text-white text-sm rounded-full shadow-lg hover:bg-blue-600 transition"
              onClick={() => setIsLoggedIn(true)}
            >
              Login
            </button>
            <button className="px-4 py-1.5 bg-green-500 text-white text-sm rounded-full shadow-lg hover:bg-green-600 transition">
              Signup
            </button>
          </>
        ) : (
          <button
            className="px-4 py-1.5 bg-red-500 text-white text-sm rounded-full shadow-lg hover:bg-red-600 transition"
            onClick={() => setIsLoggedIn(false)}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;