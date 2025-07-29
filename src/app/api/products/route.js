// import { connectToDB } from '@/lib/mongoose';
// import Product from '@/models/Product';
import connect from "@/utils/db";
import Product from "@/models/Product";

// export async function POST(req) {
//   const { name, price, image, userEmail } = await req.json();
//   await connect();
//   const newProduct = await Product.create({ name, price, image, userEmail });
//   return new Response(JSON.stringify(newProduct), { status: 201 });
// }

// export async function GET() {
//   await connect();
//   const products = await Product.find({});
//   return new Response(JSON.stringify(products), { status: 200 });
// }
import { NextResponse } from "next/server";

// GET /api/products – Get all products
export async function GET(req) {
  try {
    await connect();
    const products = await Product.find({});
    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST /api/products – Add a new product
export async function POST(req) {
  try {
    await connect();
    const body = await req.json();

    const { name, price, image, category, description, size, userEmail } = body;

    if (!name || !price || !image || !userEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newProduct = await Product.create({
      name,
      price,
      image,
      category,
      description,
      size,
      userEmail,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (err) {
    console.error("POST /api/products error:", err);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}

