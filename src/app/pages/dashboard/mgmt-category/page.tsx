"use client";
import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { Categories } from "@/app/lib/definitions";
import Link from "next/link";

export default function CreateCategory() {
  const [category, setCategory] = useState<Categories[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/categories")
      .then((response) => response.json())
      .then((data) => {
        console.log("category :", data);
        setCategory(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="w-[30%] mx-auto mt-8">
      <div className="flex justify-between items-center mb-6 pb-2 border-b-2">
        <div className="flex flex-col">
        <h1 className="text-3xl font-semibold dark:text-white">
          Categories
        </h1>
        <p className="text-gray-400 font-small">Explore all {category.length} categories</p>
        </div>
        <Link href="/pages/dashboard/mgmt-category/create">
          <Button gradientMonochrome="info" type="button" className="text-nowrap">
            Create Category
          </Button>
        </Link>
      </div>
      <div className="flex flex-wrap ">
        {category.map((category) => (
          <div className="bg-gray-200 w-fit m-2 hover:border-green-800 hover:border-2 cursor-pointer">
            <p className="text-gray-800 p-3 text-nowrap font-semibold">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
