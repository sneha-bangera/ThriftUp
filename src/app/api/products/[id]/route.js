
import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function GET(req, { params }) {
  try {
    await connect();
    const product = await Product.findById(params.id);

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.error("GET /api/products/:id error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}


export async function DELETE(req, { params }) {
  try {
    await connect();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const productId = params.id;

    const product = await Product.findById(productId);
    if (!product || product.userEmail !== session.user.email) {
      return NextResponse.json({ success: false, message: "Unauthorized to delete this product" }, { status: 403 });
    }

    await Product.findByIdAndDelete(productId);

    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (err) {
    console.error("DELETE /api/products/:id error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
