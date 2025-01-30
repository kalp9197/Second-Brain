import React from "react";

interface ButtonProps {
  onAddContent: () => void;
}

export const Button: React.FC<ButtonProps> = ({ onAddContent }) => {
  return (
    <div className="flex justify-between items-center">
      <button
        className="mt-5 ml-10 text-white bg-purple-500 hover:bg-purple-400 font-bold py-2 px-4 rounded-xl flex items-center hover:cursor-pointer"
        onClick={onAddContent}
      >
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h14m-7 7V5"
          />
        </svg>
        Add Content
      </button>
    </div>
  );
};
