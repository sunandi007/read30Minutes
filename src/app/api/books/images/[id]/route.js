import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import sharp from 'sharp';

import prisma from "../../../../../../prisma/clinet";


export async function PUT(request, { params }) {
  const formData = await request.formData();
    const {id} = params

    if (!id) {
      return NextResponse.json(
          {
              success: false,
              message: "Book ID is required."
          },
          { status: 400 }
      );
  }

  // Ensure the book exists
  const existingBook = await prisma.book.findUnique({
    where: { id }
});

if (!existingBook) {
    return NextResponse.json(
        {
            success: false,
            message: "Book not found."
        },
        { status: 404 }
    );
}
  
    const file = formData.get("file");
    if (!file) {
      return NextResponse.json({ error: "No files received." }, { status: 400 });
    }
  
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + file.name.replaceAll(" ", "_");
    const filePath = path.join(process.cwd(), "public/uploads/" + filename);
  
    try {  
      // Resize gambar
      const smallImageBuffer = await sharp(buffer)
        .resize({ width: 100 })
        .toBuffer();
      const mediumImageBuffer = await sharp(buffer)
        .resize({ width: 300 })
        .toBuffer();
      const largeImageBuffer = await sharp(buffer)
        .resize({ width: 800 })
        .toBuffer();
  
      // Simpan informasi gambar ke dalam database
      const image = await prisma.image.create({
        data: {
          original: `/uploads/${filename}`,
          small: `/uploads/small_${filename}`,
          medium: `/uploads/medium_${filename}`,
          large: `/uploads/large_${filename}`,
          bookId: id
        },
      });
  
      return NextResponse.json({ Message: "Success", status: 201 });
    } catch (error) {
      console.log("Error occured ", error);
      return NextResponse.json({ Message: "Failed", status: 500 });
    }
  };
  