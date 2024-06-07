import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
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

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Book ID is required.",
        },
        { status: 400 }
      );
    }

    // Ensure the book exists
    const existingBook = await prisma.book.findUnique({
      where: { id },
    });

    if (!existingBook) {
      return NextResponse.json(
        {
          success: false,
          message: "Book not found.",
        },
        { status: 404 }
      );
    }

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

    // Update book
    const book = await prisma.book.update({
      where: { id },
      data: {
        kind,
        slug,
        title,
        subtitle,
        aboutTheBook,
        authorId,
        ...otherData,
      },
    });

    // Update BookCategory relations
    // First, disconnect all existing relations
    await prisma.bookCategory.deleteMany({
      where: { bookId: id },
    });
    // Then, create new relations
    await Promise.all(
      categories.map(async (categoryId) => {
        await prisma.bookCategory.create({
          data: {
            bookId: id,
            categoryId: categoryId,
          },
        });
      })
    );

    // Update images
    // First, delete all existing images
    await prisma.image.deleteMany({
      where: { bookId: id },
    });
    // Then, create new images
    await Promise.all(
      images.map(async (img) => {
        await prisma.image.create({
          data: {
            bookId: id,
            original: img.original,
            small: img.small,
            medium: img.medium,
            large: img.large,
          },
        });
      })
    );

    // Update actions
    // First, delete all existing actions
    await prisma.bookAction.deleteMany({
      where: { bookId: id },
    });
    // Then, create new actions
    await Promise.all(
      actions.map(async (action) => {
        await prisma.bookAction.create({
          data: {
            bookId: id,
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
        message: "Book Updated Successfully!",
        data: book,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update book.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Book ID is required.",
        },
        { status: 400 }
      );
    }

    // Ensure the book exists
    const existingBook = await prisma.book.findUnique({
      where: { id },
      include: {
        categories: true,
        images: true,
        actions: true,
      },
    });

    if (!existingBook) {
      return NextResponse.json(
        {
          success: false,
          message: "Book not found.",
        },
        { status: 404 }
      );
    }

    // Delete related data
    await prisma.bookCategory.deleteMany({
      where: { bookId: id },
    });

    await prisma.image.deleteMany({
      where: { bookId: id },
    });

    await prisma.bookAction.deleteMany({
      where: { bookId: id },
    });

    // Delete the book
    await prisma.book.delete({
      where: { id },
    });

    // Return response JSON
    return NextResponse.json(
      {
        success: true,
        message: "Book deleted successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete book.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Book ID is required.",
        },
        { status: 400 }
      );
    }

    // Get book by ID
    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        author: true,
        categories: {
          select: {
            category: true,
          },
        },
        images: true,
        actions: true,
      },
    });

    if (!book) {
      return NextResponse.json(
        {
          success: false,
          message: "Book not found.",
        },
        { status: 404 }
      );
    }

    // Return response JSON
    return NextResponse.json(
      {
        success: true,
        data: book,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch book.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
