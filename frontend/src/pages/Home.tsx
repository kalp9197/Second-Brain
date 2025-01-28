import React, { useState } from "react";
import { Button } from "../components/Button";
import Card from "../components/Card";

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

  const handleAddContent = () => {
    alert("Content added!");
    setIsModalOpen(false); // Close the modal after submitting
  };

  const onAddContent = () => {
    setIsModalOpen(true);
  };

  const onShareBrain = () => {
    alert("Share brain");
  };

  return (
    <>
      {/* Buttons */}
      <Button onAddContent={onAddContent} onShareBrain={onShareBrain} />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add Content</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddContent();
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter content title"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="link"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Link
                </label>
                <input
                  type="text"
                  id="link"
                  placeholder="Enter content link"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Card Grid */}
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