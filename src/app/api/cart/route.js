import connect from "@/utils/db";
import CartItems from "@/models/CartItems";

export async function POST(req) {
  const { name, price, image, userEmail } = await req.json();
  await connect();
  const newItem = await CartItems.create({ name, price, image, userEmail });
  return new Response(JSON.stringify(newItem), { status: 201 });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get('userEmail');
  await connect();
  const items = await CartItems.find({ userEmail });
  return new Response(JSON.stringify(items), { status: 200 });
}
