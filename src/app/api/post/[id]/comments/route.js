import connect from "@/utils/db";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  await connect();
  const { user, comment } = await req.json();
  const post = await Post.findById(params.id);
  post.comments.push({ user, comment });
  await post.save();
  return NextResponse.json({ message: "Comment added" });
}
