import { NextResponse } from "next/server";

import prisma from "../../../../../prisma/clinet";

export async function GET(request, { params }) {
  try {
    // get params id
    const { id } = params;

    // get detail author
    const author = await prisma.author.findUnique({
      where: {
        id: id,
      },
    });

    if (!author) {
      return NextResponse.json(
        {
          success: false,
          message: "Detail Data Author Not Found!",
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
        message: "Detail Data Author",
        data: author,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve author details.",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

// update data author
export async function PATCH(request, { params }) {
  try {
    //get params id
    const { id } = params;

    //get request data
    const { name, bio } = await request.json();
    
    const author = await prisma.author.findUnique({
        where: {
          id: id,
        },
      });
  
      if (!author) {
        return NextResponse.json(
          {
            success: false,
            message: "Data Author Not Found!",
            data: null,
          },
          {
            status: 404,
          }
        );
      }


    //update data
    const authorUpdated = await prisma.author.update({
      where: {
        id,
      },
      data: {
        name: name,
        bio: bio,
      },
    });

    //return response JSON
    return NextResponse.json(
      {
        sucess: true,
        message: "Data Author Updated!",
        data: authorUpdated,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update author details.",
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

    const author = await prisma.author.findUnique({
        where: {
          id: id,
        },
      });
  
      if (!author) {
        return NextResponse.json(
          {
            success: false,
            message: "Data Author Not Found!",
            data: null,
          },
          {
            status: 404,
          }
        );
      }

    //delete data
    await prisma.author.delete({
      where: {
        id,
      },
    });

    //return response JSON
    return NextResponse.json(
      {
        sucess: true,
        message: "Data Author Deleted!",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update author details.",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
