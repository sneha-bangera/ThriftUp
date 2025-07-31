import { NextResponse } from "next/server";
import Order from "@/models/Order";
import connect from "@/utils/db";

export async function GET(req) {
  try {
    await connect();
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("userEmail");

    if (!userEmail) {
      return NextResponse.json({ success: false, error: "User email missing" }, { status: 400 });
    }

    const orders = await Order.find({ userEmail }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: orders });
  } catch (err) {
    console.error("Fetch orders error:", err);
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 });
  }
}
