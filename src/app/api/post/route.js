import connect from "@/utils/db";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET() {
  await connect();
  const posts = await Post.find().sort({ createdAt: -1 });
  return NextResponse.json(posts);
}

export async function POST(req) {
  await connect();
  const body = await req.json();
  const post = new Post(body);
  await post.save();
  return NextResponse.json({ message: "Post created successfully" }, { status: 201 });
}
