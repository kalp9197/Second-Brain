import React from "react";

interface CardProps {
  id: string;
  title: string;
  description: string;
  link: string;
  onDelete: (id: string) => void;
}

// Function to extract YouTube Video ID
const getYouTubeEmbedUrl = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes("youtube.com")) {
      const videoId = urlObj.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    } else if (urlObj.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed${urlObj.pathname}`;
    }
  } catch {
    return null;
  }
  return null;
};

const Card: React.FC<CardProps> = ({ id, title, description, link, onDelete }) => {
  const embedUrl = getYouTubeEmbedUrl(link); // Check if the link is a YouTube URL

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg relative">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>

      {/* Render YouTube Video if it's a YouTube Link */}
      {embedUrl ? (
        <iframe
          width="100%"
          height="200"
          src={embedUrl}
          title="YouTube Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="mt-3 rounded-lg"
        ></iframe>
      ) : (
        // Otherwise, show link normally
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block text-blue-500 hover:underline break-words"
        >
          {link}
        </a>
      )}

      {/* Delete Button */}
      <button
        onClick={() => onDelete(id)}
        className="absolute top-2 right-2 text-red-500 text-sm hover:text-red-700"
      >
        ❌ Delete
      </button>
    </div>
  );
};

export default Card;
