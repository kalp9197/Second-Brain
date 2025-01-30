import React, { useState } from "react";
import axios from "axios";

interface CardProps {
  id: string;
  title: string;
  description: string;
  link: string;
  onDelete: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ id, title, description, link, onDelete }) => {
  const [shareLink, setShareLink] = useState<string | null>(null);

  const handleShare = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/share",
        { contentId: id },
        { withCredentials: true }
      );

      if (res.status === 200) {
        const generatedLink = `${window.location.origin}/shared/${res.data.shareLink}`;
        setShareLink(generatedLink);
        navigator.clipboard.writeText(generatedLink);
        alert("Share link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error generating share link:", err);
      alert("Failed to generate share link.");
    }
  };

  // Function to convert YouTube URL to Embed URL
  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const embedUrl = getYouTubeEmbedUrl(link);

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg relative">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>

      {/* Embed YouTube Video */} 
      {embedUrl ? (
        <iframe
          width="100%"
          height="250"
          src={embedUrl}
          title="YouTube Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="mt-3"
        ></iframe>
      ) : (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block text-blue-500 hover:underline break-words"
        >
          {link}
        </a>
      )}

      {/* Share Button */}
      <button
        onClick={handleShare}
        className="mt-3 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        🔗 Share
      </button>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(id)}
        className="absolute top-2 right-2 text-red-500 text-sm hover:text-red-700"
      >
        ❌ Delete
      </button>

      {/* Show generated share link */}
      {shareLink && (
        <p className="text-sm text-gray-600 mt-2">
          Share this link:{" "}
          <a href={shareLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            {shareLink}
          </a>
        </p>
      )}
    </div>
  );
};

export default Card;
