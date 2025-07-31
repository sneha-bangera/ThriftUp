import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Product from "@/models/Product";

export async function GET(req) {
  try {
    await connect();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    const listings = await Product.find({ userEmail: email });

    return NextResponse.json({ success: true, data: listings }, { status: 200 });
  } catch (err) {
    console.error("Error fetching user listings:", err);
    return NextResponse.json({ success: false, error: "Failed to fetch listings" }, { status: 500 });
  }
}
