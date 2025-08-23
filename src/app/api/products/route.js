import connect from "@/utils/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
// import fs from "fs";
// import { writeFile } from "fs/promises";
// import path from "path";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const config = {
  api: {
    bodyParser: false, // Required for FormData
  },
};

//get products
export async function GET(req) {
  try {
    await connect();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let query = {};
    if (category && category !== "All") {
      query.category = category;
    }

    const products = await Product.find(query);
    return NextResponse.json({ success: true, data: products });
  } catch (err) {
    console.error("GET /api/products error:", err);
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 });
  }
}



// add product n cloudinary
export async function POST(req) {
  try {
    await connect();

    const formData = await req.formData();

    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");
    const size = formData.get("size");
    const category = formData.get("category");
    const userEmail = formData.get("userEmail");

    const file = formData.get("image");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No image uploaded." }, { status: 400 });
    }

    // Prepare uploads dir
    // const uploadDir = path.join(process.cwd(), "public", "uploads");
    // if (!fs.existsSync(uploadDir)) {
    //   fs.mkdirSync(uploadDir, { recursive: true });
    // }

    // const buffer = Buffer.from(await file.arrayBuffer());
    // const filename = Date.now() + "-" + file.name.replaceAll(" ", "_");
    // const filepath = path.join(uploadDir, filename);
    // await writeFile(filepath, buffer);

    // const imageUrl = `/uploads/${filename}`;


    // 📤 Upload to Cloudinary
    const buffer = Buffer.from(await file.arrayBuffer());
    const mime = file.type;
    const encoding = "base64";
    const base64Data = `data:${mime};${encoding},${buffer.toString("base64")}`;

    const uploadResult = await cloudinary.uploader.upload(base64Data, {
      folder: "thriftup-products", // optional folder in Cloudinary
    });

    const imageUrl = uploadResult.secure_url;

    //create new product
    const newProduct = await Product.create({
      name,
      price,
      description,
      size,
      category,
      userEmail,
      image: imageUrl,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (err) {
    console.error("POST /api/products error:", err);
    return NextResponse.json({ error: "Failed to upload product." }, { status: 500 });
  }
}

