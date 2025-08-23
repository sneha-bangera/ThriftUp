import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import connect from '@/utils/db';
import Order from '@/models/Order';
import CartItem from '@/models/CartItem';

export async function POST(req) {
  try {
    await connect();
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const userEmail = session.user.email;
    const userCart = await CartItem.find({ userEmail });

    if (userCart.length === 0) {
      return NextResponse.json({ success: false, message: 'Cart is empty' }, { status: 400 });
    }

    const total = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);

    const order = new Order({
      userEmail,
      items: cartItems.map(({ name, price, image }) => ({ name, price, image })),
      totalAmount: total,
    });
    await order.save();

    
    await CartItem.deleteMany({ userEmail });

    return NextResponse.json({ success: true, message: 'Checkout complete and cart cleared!' });
  } catch (err) {
    console.error('Checkout Error:', err);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
