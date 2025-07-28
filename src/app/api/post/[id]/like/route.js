import connect from "@/utils/db";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req, { params }) {
  await connect();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const post = await Post.findById(params.id);
  if (post.likes.includes(userEmail)) {
    post.likes = post.likes.filter((email) => email !== userEmail);
  } else {
    post.likes.push(userEmail);
  }
  await post.save();

  return new Response(JSON.stringify({ message: "Updated" }), { status: 200 });
}
