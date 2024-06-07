import { NextResponse } from "next/server";

import prisma from "../../../../prisma/clinet";
import { toSlug } from "../../utils/utils";

export async function POST(request) {
  try {
    // Get request JSON
    const { name } = await request.json();
    const slug = toSlug(name);

    // Create data Category
    const categories = await prisma.category.create({
      data: {
        name,
        slug,
      },
    });

    // Return response JSON
    return NextResponse.json(
      {
        success: true,
        message: "Category Created Successfully!",
        data: categories,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to add category.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
    //get all category
    try {
      const categories = await prisma.category.findMany();
  
      //return response JSON
      return NextResponse.json(
        {
          sucess: true,
          message: "List Data Category",
          data: categories,
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      return NextResponse.json(
          {
            success: false,
            message: "Failed get list Category",
            error: error.message,
          },
          { status: 500 }
        );
    }
  }