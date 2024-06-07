import { post } from "@/app/lib/api";
import { Author } from "@/app/lib/definitions";
import { Button } from "flowbite-react";
import { useState } from "react";

interface Props {
  formData: Author;
  handleSubmit: () => void;
}

const CreateAuthorForm = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    if (field === "name") {
      setName(e.target.value);
    } else if (field === "bio") {
      setBio(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Form submission prevented"); // Debugging

    try {
      const response = await post("/api/authors", { name, bio })
      const data = await response.json();

      if (response.ok) {
        console.log("Author created successfully"); // Debugging
        // setSuccessMessage(data.message || "Author created successfully.");
        setName(""); // Clear the input fields
        setBio("");
      } else {
        // setErrorMessage(data.message || "Failed to create author.");
      }
    } catch (error) {
      console.error("Error submitting author:", error);
      // setErrorMessage("Error submitting author.");
    }
  };

  return (
    <div className="space-y-4">
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
      <Button gradientMonochrome="info" type="button" onClick={handleSubmit} className="w-full">
        Create Author
      </Button>
    </div>
  );
};

export default CreateAuthorForm;
