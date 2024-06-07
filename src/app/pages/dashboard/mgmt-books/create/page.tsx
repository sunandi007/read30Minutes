"use client";
import { Alert } from "flowbite-react";
import { useState, useEffect } from "react";
import BookDetailsForm from "../../mgmt-books/(components)/BookDetailForm";
import ImagesForm from "../../mgmt-books/(components)/ImageForm";
import ActionsForm from "../../mgmt-books/(components)/ActionForm";
import { toSlug } from "../../../../utils/utils";
import { get, post } from "@/app/lib/api";
import { Button } from "flowbite-react";
import {
  HiPlusCircle,
  HiOutlineArrowRight,
  HiOutlineArrowLeft,
} from "react-icons/hi";

interface Author {
  id: string;
  name: string;
  bio: string;
}

interface Category {
  id: string;
  name: string;
}

interface FormData {
  kind: string;
  slug: string;
  title: string;
  subtitle: string;
  aboutTheBook: string;
  authorId: string;
  categories: string[];
  images: { file: File; bookId: string }[];
  actions: {
    orderNo: number;
    actionTitle: string;
    content: string;
    quote: string;
  }[];
}

export default function CreateBook() {
  const [formData, setFormData] = useState<FormData>({
    kind: "book",
    slug: "",
    title: "",
    subtitle: "",
    aboutTheBook: "",
    authorId: "",
    categories: [],
    images: [],
    actions: [
      {
        orderNo: 1,
        actionTitle: "",
        content: "",
        quote: "",
      },
    ],
  });

  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [step, setStep] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const [authorsResult, categoriesResult] = await Promise.all([
        get("/api/authors"),
        get("/api/categories"),
      ]);

      setAuthors(authorsResult.data ?? []);
      setCategories(categoriesResult.data ?? []);
    };
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    fieldName: string
  ) => {
    const { value } = e.target;

    // Jika fieldName adalah 'categories', maka Anda perlu menangani kasus khusus ini
    if (fieldName === "categories") {
      const selectedCategory = value;
      const isCategorySelected = formData.categories.includes(selectedCategory);

      setFormData((prevData) => {
        const newCategories = isCategorySelected
          ? prevData.categories.filter((category) => category !== selectedCategory)
          : [...prevData.categories, selectedCategory];
        return {
          ...prevData,
          categories: newCategories,
        };
      });

      console.log('form detail book :', formData);
    } else {
      // Jika fieldName bukan 'categories', lanjutkan seperti biasa
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
    }
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newImages = [...prevData.images];
      newImages[index] = {
        ...newImages[index],
        [name]: value,
      };
      return {
        ...prevData,
        images: newImages,
      };
    });
  };

  const handleActionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any,
    index: number,
    nameField?: string
  ) => {
    console.log('form detail book :', formData)

    setFormData((prevData) => {
      const newActions = [...prevData.actions];
      if (nameField === "content") {
        newActions[index] = {
          ...newActions[index],
          content: e,
        };
      } else {
        const { name, value } = e.target;
        newActions[index] = {
          ...newActions[index],
          [name]: value,
        };
      }

      console.log("new action :", newActions);

      return {
        ...prevData,
        actions: newActions,
      };
    });
  };

  const addImageField = (file: File) => {
    const bookId = "";
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, { file, bookId }],
    }));
  };

  const addActionField = () => {
    setFormData((prevData) => ({
      ...prevData,
      actions: [
        ...prevData.actions,
        {
          orderNo: prevData.actions.length + 1,
          actionTitle: "",
          content: "",
          quote: "",
        },
      ],
    }));
  };

  const removeActionField = (index: number) => {
    setFormData((prevData) => {
      const newActions = [...prevData.actions];
      newActions.splice(index, 1);
      return {
        ...prevData,
        actions: newActions,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit :", formData);
    formData.slug = toSlug(formData.title);

    const data = await post("/api/books", formData);
    if (data.success) {
      setSuccessMessage(data.message);
      await handleImageUpload(data.data.id); // Assuming data.bookId is returned
    } else {
      setErrorMessage(data.message);
    }
  };

  const handleImageUpload = async (bookId: string) => {
    // const formData = new FormData();
    const formDataToSend = new FormData();
    // Asumsi hanya mengunggah file pertama dalam array images
    if (formData.images.length > 0) {
      formDataToSend.append("file", formData.images[0].file);
    }

    try {
      const response = await fetch(`/api/books/images/${bookId}`, {
        method: "PUT",
        body: formDataToSend,
      });
      const uploaded = await response.json();
      if (uploaded.success) {
        setSuccessMessage((prev) => `${prev} Images uploaded successfully.`);
      } else {
        setErrorMessage(uploaded.message);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="w-[45%] mx-auto mt-8 dark:text-white">
      <h1 className="text-2xl font-semibold mb-4 text-center dark:text-white">Create New Book</h1>
      {successMessage && (
        <Alert color="success">
          <span className="font-medium">{successMessage}</span>
        </Alert>
      )}
      {errorMessage && (
        <Alert color="failure">
          <span className="font-medium">{errorMessage}</span>
        </Alert>
      )}

      <div className="flex justify-between mb-4">
        <div className="flex justify-start">
            <Button disabled={step <= 1}  size="sm" gradientMonochrome="success" type="button" onClick={prevStep}>
              <HiOutlineArrowLeft className="h-6 w-6" />
            </Button>
        </div>
        <div className="flex justify-end">
            <Button disabled={step >= 3} size="sm" gradientMonochrome="success" type="button" onClick={nextStep}>
              <HiOutlineArrowRight className="h-6 w-6" />
            </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 && (
          <BookDetailsForm
            formData={formData}
            handleChange={handleChange}
            authors={authors}
            categories={categories}
          />
        )}
        {step === 2 && (
          <ImagesForm
            formData={formData}
            handleImageChange={handleImageChange}
            addImageField={addImageField}
          /> 
        )}
        {step === 3 && (
          <ActionsForm
            formData={formData}
            handleActionChange={handleActionChange}
            addActionField={addActionField}
            removeActionField={removeActionField}
          />
        )}

        <div>
          {step === 3 && (
            <Button
              color="gray"
              type="button"
              className="w-full mb-4"
              onClick={addActionField}
            >
              <HiPlusCircle className="mr-2 h-5 w-5" />
              Add Section
            </Button>
          )}
        </div>
        <div>
          {step === 3 && (
            <Button gradientMonochrome="info"
              type="submit"
              className="w-full"
            >
              Create Book
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
