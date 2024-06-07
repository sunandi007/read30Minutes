"use client";
import { ContentBook } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import { HiTrash, HiOutlinePencil } from "react-icons/hi";
import { Button } from "flowbite-react";
import Link from "next/link";

export default function ListBooks() {
  const [books, setBooks] = useState<ContentBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch books.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = "/470.webp";
  };

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6 pb-2 border-b-2">
        <h1 className="text-3xl font-semibold dark:text-white">
          Book Management
        </h1>
        <Link href="/pages/dashboard/mgmt-books/create">
          <Button gradientMonochrome="info" type="button">
            Create Book
          </Button>
        </Link>
      </div>
      <div className="flex flex-col">
        {books.map((book) => (
          <div
            key={book.id}
            className="flex flex-row justify-between items-center bg-white dark:text-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 mb-2"
          >
            <div className="flex justify-start items-center">

            {book.images[0].small !== null ? (
              <img
                src={book.images[0].small}
                className="w-40"
                alt="image-list"
                onError={handleImageError}
              />
            ) : (
              <img
                className="w-40 p-2"
                src={"/470.webp"}
                alt="image-list"
                onError={handleImageError}
              />
            )}
            <div className="p-4 dark:bg-gray-800">
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">
                {book.subtitle}
              </p>
              <p className="mt-2">
                <span className="font-semibold">Author:</span>{" "}
                {book.author.name}
              </p>
              <p className="mt-2">
                <span className="font-semibold">Categories:</span>{" "}
                {book.categories.map((items) => items.category.name).join(", ")}
              </p>
              <p className="mt-2">
                <span className="font-semibold">Published At:</span>{" "}
                {new Date(book.publishedAt).toLocaleDateString()}
              </p>
            </div>
            </div>
            <div className=" p-4 flex flex-col space-y-2">
              <Button size="sm" color="light" type="button">
                <HiOutlinePencil />
              </Button>
              <Button size="sm" color="failure" type="button">
                <HiTrash />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
