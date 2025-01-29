import React from "react";

interface ButtonProps {
  onAddContent: () => void;
  onShareBrain: () => void;
}

export const Button: React.FC<ButtonProps> = ({ onAddContent, onShareBrain }) => {
  return (
    <div className="flex justify-between items-center gap-1.5">
      <h1 className="text-4xl font-bold text-blue-800 dark:text-white">
        ALL NOTES
      </h1>
      <div className="flex gap-1.5">
        <button
          className="text-white bg-purple-500 hover:bg-purple-400 font-bold py-2 px-4 rounded-xl hover:cursor-pointer flex items-center"
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
        <button
          className="text-white bg-blue-400 hover:bg-blue-500 font-bold py-2 px-4 rounded-xl flex hover:cursor-pointer items-center"
          onClick={onShareBrain}
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
              strokeWidth="2"
              d="M7.926 10.898 15 7.727m-7.074 5.39L15 16.29M8 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm12 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm0-11a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
            />
          </svg>
          Share Brain
        </button>
      </div>
    </div>
  );
};