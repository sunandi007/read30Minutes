"use client"
import { get } from "@/app/lib/api"
import { useEffect, useState } from "react"
import { useRouter, useParams } from 'next/navigation'
import { ContentBook } from '@/app/lib/definitions';


export default function DetailBook() {
    const router = useRouter()

    const { id } = useParams();
    const [books, setBooks] = useState<ContentBook>();
      
    useEffect(() => {
       const fetchDetailBook = async () => {
        try {
            const detailBook = await get(`/api/books/${id}`)
            if(detailBook.success) {
                setBooks(detailBook.data ?? {});
            } else {
                console.error("Failed to Get detail book:", detailBook.message);
            }
        } catch(error) {
            console.error("Error fetching detail book data:", error);
        }
       }
       fetchDetailBook();
    }, [])

    return(
        <div className="min-h-screen ">
            <p>sunandi</p>
        {/* <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl">
          <h1 className="text-3xl font-bold mb-4">{books?.title}</h1>
          <h2 className="text-xl font-semibold mb-2">Author: {books?.author.name}</h2>
          <h3 className="text-lg font-semibold mb-2">Categories:</h3>
          <ul className="list-disc list-inside mb-4">
            {books?.categories.map((item, index) => (
              <li key={index}>{item.category.name}</li>
            ))}
          </ul>
          <button
            onClick={() => router.back()}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Go Back
          </button>
        </div> */}
      </div>
    )
}