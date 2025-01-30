import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../components/Button";
import Card from "../components/Card";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthContext";

interface Content {
  _id: string;
  title: string;
  description: string;
  link: string;
}

const Home: React.FC = () => {
  const { user } = useAuth(); // Get logged-in user
  const [contentList, setContentList] = useState<Content[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch content from backend
  useEffect(() => {
    if (!user) return; // Ensure user is logged in

    const fetchContent = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/user/content", {
          withCredentials: true,
        });

        // ✅ Ensure recent content appears first
        setContentList(res.data.content.reverse());
      } catch (err) {
        console.error("Error fetching content:", err);
      }
    };

    fetchContent();
  }, [user]);

  // Add new content
  const handleAddContent = async (title: string, description: string, link: string) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/content",
        { title, description, link },
        { withCredentials: true }
      );

      if (res.status === 201) {
        const newContent: Content = {
          _id: res.data.content._id, // Ensure correct structure
          title,
          description,
          link,
        };

        // ✅ Prepend new content to show it at the top
        setContentList((prev) => [newContent, ...prev]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error adding content:", err);
    }
  };

  // Delete content
  const handleDeleteContent = async (id: string) => {
    try {
      await axios.delete("http://localhost:8000/api/v1/user/content", {
        data: { id },
        withCredentials: true,
      });

      // ✅ Remove deleted content from state
      setContentList((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting content:", err);
    }
  };

  return (
    <>
      {/* ✅ Fixed Button by passing correct props */}
      <Button
        onAddContent={() => setIsModalOpen(true)}
        onShareBrain={() => alert("Share Brain Feature Coming Soon!")}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddContent} />

      <div className="p-10 grid gap-6 pt-10 mx-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {contentList.map((item) => (
          <Card
            key={item._id}
            id={item._id}
            title={item.title}
            description={item.description}
            link={item.link}
            onDelete={handleDeleteContent}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
