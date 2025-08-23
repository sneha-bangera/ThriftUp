import { NextResponse } from 'next/server';
import Order from '@/models/Order';
import connect from '@/utils/db';
import CartItem from '@/models/CartItem';

export async function POST(req) {
  try {
    await connect();
    const { items, userEmail } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0 || !userEmail) {
      return NextResponse.json({ success: false, error: "Invalid input data." }, { status: 400 });
    }

    const totalAmount = items
      .reduce((sum, item) => sum + parseFloat(item.price), 0)
      .toFixed(2);

    const newOrder = new Order({
      userEmail,
      items,
      totalAmount,
    });

    await newOrder.save();

    await CartItem.deleteMany({ userEmail });

    return NextResponse.json({ success: true, message: "Order saved." });

  } catch (error) {
    console.error("Order Save Error:", error);
    return NextResponse.json({ success: false, error: "Failed to save order." }, { status: 500 });
  }
}
