import React from "react";

interface CardProps {
  title: string;
  description: string;
  tags: string[];
  addedOn: string;
}

const Card: React.FC<CardProps> = ({ title, description, tags, addedOn }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
      <div className="flex flex-wrap mt-4 gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs font-medium bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-400 mt-4">Added on {addedOn}</p>
    </div>
  );
};

export default Card;