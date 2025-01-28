import React, { useState } from "react";
import { Button } from "../components/Button";
import Card from "../components/Card";
import Modal from "../components/Modal";

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const exampleData = [
    {
      title: "Project Ideas",
      description:
        "Future Projects:\n- Build a personal knowledge base\n- Create a habit tracker\n- Design a minimalist todo app",
      tags: ["productivity", "ideas"],
      addedOn: "10/03/2024",
    },
    {
      title: "How to Build a Second Brain",
      description:
        "Learn to organize your ideas effectively and make them easily accessible.",
      tags: ["productivity", "learning"],
      addedOn: "09/03/2024",
    },
    {
      title: "Productivity Tip",
      description:
        "The best way to learn is to build in public. Share your progress, get feedback, and help others along the way.",
      tags: ["productivity", "learning"],
      addedOn: "08/03/2024",
    },
  ];

  const onAddContent = () => {
    setIsModalOpen(true);
  };

  const onShareBrain = () => {
    alert("Share brain");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddContent = (title: string, link: string) => {
    alert(`Added Content:\nTitle: ${title}\nLink: ${link}`);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onAddContent={onAddContent} onShareBrain={onShareBrain} />

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleAddContent}
      />

      <div className="p-10 grid gap-6 pt-10 mx-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {exampleData.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            description={item.description}
            tags={item.tags}
            addedOn={item.addedOn}
          />
        ))}
      </div>
    </>
  );
};
export default Home;