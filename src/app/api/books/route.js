//import next request and response
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/clinet";

export async function GET() {
  try {
    // Get all books from the database
    const books = await prisma.book.findMany({
      select: {
        id: true,
        title: true,
        subtitle: true,
        author: true,
        images: true,
        readingDuration: true,
        averageRating: true, 
        categories: {
          select: {
            category: true
          }
        }
      },
    });

    // Format the response
    const response = {
      success: true,
      message: "List Data Books",
      data: books,
    };

    // Return the response JSON
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    // Handle any errors
    const response = {
      success: false,
      message: "Failed to fetch books",
      error: (error).message,
    };

    // Return the error response JSON
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const {
      kind,
      slug,
      title,
      subtitle,
      aboutTheBook,
      authorId,
      categories,
      images,
      actions,
      ...otherData
    } = await request.json();

    // Ensure categories exist
    await Promise.all(
      categories.map(async (categoryId) => {
        await prisma.category.upsert({
          where: { id: categoryId },
          create: {
            id: categoryId,
            name: `Category ${categoryId}`,
            slug: `category-slug-${categoryId}`,
          },
          update: {},
        });
      })
    );

    // Create the book
    const book = await prisma.book.create({
      data: {
        kind,
        title,
        subtitle,
        aboutTheBook,
        authorId,
        ...otherData,
      },
    });

    // Create BookCategory relations
    await Promise.all(
      categories.map(async (categoryId) => {
        await prisma.bookCategory.create({
          data: {
            bookId: book.id,
            categoryId: categoryId,
          },
        });
      })
    );

    // Create images
    await Promise.all(
      images.map(async (img) => {
        await prisma.image.create({
          data: {
            bookId: book.id,
            original: img.original,
            small: img.small,
            medium: img.medium,
            large: img.large,
          },
        });
      })
    );

    // Create actions
    await Promise.all(
      actions.map(async (action) => {
        await prisma.bookAction.create({
          data: {
            bookId: book.id,
            orderNo: parseInt(action.orderNo), // Ensure orderNo is an Int
            actionTitle: action.actionTitle,
            content: action.content,
            quote: action.quote,
          },
        });
      })
    );

    // Return response JSON
    return NextResponse.json(
      {
        success: true,
        message: "Book Created Successfully!",
        data: book,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create book.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}