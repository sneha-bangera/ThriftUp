// app/api/cart/route.js
import { NextResponse } from 'next/server';
import connect from '@/utils/db';
import CartItem from '@/models/CartItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req) {
  try {
    await connect();
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { productId, name, price, image, category, size } = body;

    // Check if item already exists in cart for this user
    const existingItem = await CartItem.findOne({
      productId,
      userEmail: session.user.email,
    });

    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();
      return NextResponse.json({ success: true, message: 'Quantity updated' });
    }

    const newItem = new CartItem({
      productId,
      name,
      price,
      image,
      category,
      size,
      userEmail: session.user.email,
    });

    await newItem.save();
    return NextResponse.json({ success: true, message: 'Item added to cart' });

  } catch (err) {
    console.error('POST /cart error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connect();
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const items = await CartItem.find({ userEmail: session.user.email });
    return NextResponse.json({ success: true, data: items });
  } catch (err) {
    console.error('GET /cart error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connect();
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const { id } = await req.json();
    await CartItem.deleteOne({ _id: id, userEmail: session.user.email });
    return NextResponse.json({ success: true, message: 'Item deleted' });
  } catch (err) {
    console.error('DELETE /cart error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
