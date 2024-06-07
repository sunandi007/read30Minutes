"use client";
import { useState } from "react";
import { Button } from "flowbite-react";

export default function CreateCategory() {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || "Category created successfully.");
        setName(""); // Clear the input field
      } else {
        setErrorMessage(data.message || "Failed to create category.");
      }
    } catch (error) {
      console.error("Error submitting category:", error);
      setErrorMessage("Error submitting category.");
    }
  };

  return (
    <div className="w-[30%] mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Create New Category</h1>
      {successMessage && (
        <div className="bg-green-200 text-green-800 p-3 mb-4">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-200 text-red-800 p-3 mb-4">{errorMessage}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Category Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <Button gradientMonochrome="info"
              type="submit"
              className="w-full"
            >
              Create Book
            </Button>
        {/* <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Create Category
        </button> */}
      </form>
    </div>
  );
}
