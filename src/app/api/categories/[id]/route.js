import { NextResponse } from "next/server";

import prisma from "../../../../../prisma/clinet";

export async function GET(request, { params }) {
  try {
    // get params id
    const { id } = params;

    // get detail categories
    const categories = await prisma.category.findUnique({
      where: {
        id: id,
      },
    });

    if (!categories) {
      return NextResponse.json(
        {
          success: false,
          message: "Detail Data Categories Not Found!",
          data: null,
        },
        {
          status: 404,
        }
      );
    }

    //return response JSON
    return NextResponse.json(
      {
        sucess: true,
        message: "Detail Data Categories",
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
        message: "Failed to retrieve categories details.",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request, { params }) {
  //get params id
  try {
    const { id } = params;

    const categories = await prisma.category.findUnique({
        where: {
          id: id,
        },
      });
  
      if (!categories) {
        return NextResponse.json(
          {
            success: false,
            message: "Data Categories Not Found!",
            data: null,
          },
          {
            status: 404,
          }
        );
      }

    //delete data
    await prisma.category.delete({
      where: {
        id,
      },
    });

    //return response JSON
    return NextResponse.json(
      {
        sucess: true,
        message: "Data Categories Deleted!",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update categories details.",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
