import { NextResponse } from "next/server";

import prisma from "../../../../prisma/clinet";

export async function GET() {
  //get all boks
  try {
    const books = await prisma.author.findMany();

    //return response JSON
    return NextResponse.json(
      {
        sucess: true,
        message: "List Data Author",
        data: books,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
        {
          success: false,
          message: "Failed get list author",
          error: error.message,
        },
        { status: 500 }
      );
  }
}

export async function POST(request) {
  try {
    // Get request JSON
    const { name, bio } = await request.json();
    // Create data post
    const author = await prisma.author.create({
      data: {
        name,
        bio,
      },
    });

    // Return response JSON
    return NextResponse.json(
      {
        success: true,
        message: "Author Created Successfully!",
        data: author,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to add author.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
