"use client";

import { useState, useEffect } from "react";
import { dummyDataBookList } from "../../utils/book-list-dummy";
import Card from "../../ui/cards";
import { get } from "../../lib/api";
import { ContentBook } from "../../lib/definitions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [books, setBooks] = useState<ContentBook[]>([]);

  useEffect(() => {
    const fetchDataBook = async () => {
      try {
        const dataBook = await get("/api/books");
        if (dataBook.success) {
          // setSuccessMessage(dataBook.message);
          setBooks(dataBook.data ?? []);
        } else {
          // setErrorMessage(dataBook.message);
          console.error("Failed to Get book:", dataBook.message);
        }
      } catch (error) {
        // setErrorMessage((error as Error).message);
        console.error("Error fetching book data:", error);
      }
    };

    fetchDataBook();
  }, []);

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % dummyDataBookList.content_items.length
    );
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + dummyDataBookList.content_items.length) %
        dummyDataBookList.content_items.length
    );
  };
  return (
    <main>
      <div className="container mx-auto py-8">
        <div className="w-full overflow-hidden flex dark:text-white">
          <div
            className="grid transition-transform ease-out duration-500 gap-4 grid-cols-6"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {books?.map((item: ContentBook, index) => (
              <Link href={`/pages/book/${item.id}`}>
              <Card
                key={index}
                cardKey={item.id}
                image={item?.images[0]?.medium}
                title={item?.title}
                subtitle={item?.subtitle}
                author={item.author.name}
                duration={item?.readingDuration}
                rating={item?.averageRating}
              />
              </Link>
            ))}
          </div>
          {/* <button onClick={handlePrev} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
          &lt;
        </button>
        <button onClick={handleNext} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
          &gt;
        </button> */}
        </div>
      </div>

      {/* <div className="pb-8 -mb-8 relative overflow-x-auto flex flex-row gap-8 snap-x snap-mandatory !gap-4 m:mx-2">
        {dummyDataBookList.content_items.map(item => (
          <Card url={item?.readUrl} image={item?.image?.default?.src} title={item?.title} subtitle={item?.subtitle} author={item.author} duration={item?.readingDuration} rating={item?.averageRating}/>
        ))}
      </div> */}
    </main>
  );
}
