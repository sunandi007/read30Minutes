import React, { useState } from "react";
import CreateAuthorForm from "./CreateAuthor";
import { Categories } from '../../../../lib/definitions';
interface Props {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    fieldName: string
  ) => void;
  authors: { id: string; name: string }[];
  categories: { id: string; name: string }[];
}

const BookDetailsForm: React.FC<Props> = ({
  formData,
  handleChange,
  authors,
  categories,
}) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCheckboxChange = (event: any) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== value)
      );
    }
  };

  return (
    <div className="space-y-2">
      <div>
        <label htmlFor="title" className="block mb-1">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={(e) => handleChange(e, "title")}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="subtitle" className="block mb-1">
          Subtitle:
        </label>
        <input
          type="text"
          id="subtitle"
          name="subtitle"
          value={formData.subtitle}
          onChange={(e) => handleChange(e, "subtitle")}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="aboutTheBook" className="block mb-1">
          About the Book:
        </label>
        <textarea
          id="aboutTheBook"
          name="aboutTheBook"
          value={formData.aboutTheBook}
          onChange={(e) => handleChange(e, "aboutTheBook")}
          className="w-full border rounded px-3 py-2"
        ></textarea>
      </div>
      {/* <div>
        <label htmlFor="categoryId" className="block mb-1">
          Category:
        </label>
        <select
          id="categoryId"
          name="categoryId"
          value={formData.categories || ""}
          onChange={(e) => handleChange(e, "categories")}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div> */}
      <div>
        <div className="flex justify-between items-center">
          <label htmlFor="authorId" className="block mb-1">
            Author:
          </label>
          <p
            className="font-normal text-green-700 cursor-pointer"
            onClick={handleToggle}
          >
            Create Author
          </p>
        </div>
        <select
          id="authorId"
          name="authorId"
          value={formData.authorId || ""}
          onChange={(e) => handleChange(e, "authorId")}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select Author</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="category" className="block mt-4 mb-3">
          Categories:
        </label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <label
              key={category.id}
              className="inline-flex items-center"
            >
              <input
              id="category"
              name="category"
                type="checkbox"
                value={category.id}
                onChange={(e) => handleChange(e, "categories")}
                className="form-checkbox h-5 w-5 text-green-700 rounded-md"
              />
              <span className="ml-2">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {isToggled && (
        <div className="border-2 border-gray-700 rounded-md p-4 mt-5">
          <CreateAuthorForm />
        </div>
      )}
    </div>
  );
};

export default BookDetailsForm;
