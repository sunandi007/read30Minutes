"use client";
import { useState } from "react";
import { Button } from "flowbite-react";
import { post } from "@/app/lib/api";
import { handleError } from "@/app/lib/errorHandler";

export default function CreateAuthor() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    if (field === "name") {
      setName(e.target.value);
    } else if (field === "bio") {
      setBio(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // const response = await fetch("http://localhost:3000/api/authors", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({  }),
      // });

      const response =  await post('api/authors', {})

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || "Author created successfully.");
        setName(""); // Clear the input fields
        setBio("");
      } else {
        handleError(data.message as Error);
        // setErrorMessage(data.message || "Failed to create author.");
      }
    } catch (error) {
      console.error("Error submitting author:", error);
      setErrorMessage("Error submitting author.");
    }
  };

  return (
    <div className="w-[45%] mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Create New Author</h1>
      {/* {successMessage && (
        <div className="bg-green-200 text-green-800 p-3 mb-4">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-200 text-red-800 p-3 mb-4">{errorMessage}</div>
      )} */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Author Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => handleChange(e, "name")}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="bio" className="block mb-1">
            Bio:
          </label>
          <textarea
            id="bio"
            name="bio"
            value={bio}
            onChange={(e) => handleChange(e, "bio")}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <Button gradientMonochrome="info"
              type="submit"
              className="w-full"
            >
              Create Author
            </Button>
      </form>
    </div>
  );
}
