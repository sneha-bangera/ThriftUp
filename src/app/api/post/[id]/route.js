import connect from "@/utils/db";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  await connect();
  await Post.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Post deleted" });
}
