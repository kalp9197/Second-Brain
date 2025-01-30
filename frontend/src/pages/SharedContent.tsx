import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Content {
  title: string;
  description: string;
  link: string;
}

const SharedContent: React.FC = () => {
  const { shareLink } = useParams();
  const [content, setContent] = useState<Content | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/share/${shareLink}`);
        setContent(res.data.content);
      } catch (err) {
        setError("Content not found or link expired.");
      }
    };

    if (shareLink) fetchSharedContent();
  }, [shareLink]);

  return (
    <div className="p-6">
      {error && <p className="text-red-500">{error}</p>}
      {content && (
        <div className="p-4 bg-slate-200 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-black">{content.title}</h3>
          <p className="text-black">{content.description}</p>
          <a
            href={content.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {content.link}
          </a>
        </div>
      )}
    </div>
  );
};

export default SharedContent;
