"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

const Badge = ({ className = '', children, ...props }) => {
  return (
    <span
      className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default function CommunityPage() {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  const { data: session } = useSession();

  useEffect(() => {
    fetch("/api/post")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  const handleLike = async (id) => {
    const res = await fetch(`/api/post/${id}/like`, { method: "POST" });
    if (res.ok) {
      const updated = await fetch("/api/post").then((r) => r.json());
      setPosts(updated);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure?");
    if (!confirmed) return;
    await fetch(`/api/post/${id}`, { method: "DELETE" });
    setPosts(posts.filter((p) => p._id !== id));
  };

  const handleComment = async (postId) => {
    if (!commentText[postId]) return;
    const res = await fetch(`/api/post/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify({
        user: session?.user?.name || "Anonymous",
        comment: commentText[postId],
      }),
    });
    if (res.ok) {
      const updated = await fetch("/api/post").then((r) => r.json());
      setPosts(updated);
      setCommentText((prev) => ({ ...prev, [postId]: "" }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-6 text-deep-plum">Community Discussions</h1>
      <Link href="/community/createPost" className="text-hot-pink font-semibold border rounded-2xl p-2 border-peach-pink">+ Start a Discussion</Link>

      <div className="mt-10">
        <h2 className="text-2xl mb-4 text-peach-pink font-bold">All Discussions</h2>
        {posts.map((post) => (
          <div key={post._id} className="border border-peach-pink rounded-lg mb-6 p-4 bg-off-white">
            <div className="flex flex-wrap gap-2 my-2">
    {Array.isArray(post?.tags) && post.tags.map((tag, index) => (
      <Badge key={index} className="bg-peach-pink text-deep-plum">
        #{tag.trim()}
      </Badge>
    ))}
  </div>
              <h3 className="text-xl font-semibold text-deep-plum">{post.title}</h3>

            <p className="text-sm text-deep-plum/70">{post.content}</p>
            <p className="text-xs text-peach-pink mt-2">by {post.authorEmail || "anonymous"}</p>
            
            <div className="mt-2 flex gap-4">
              <button onClick={() => handleLike(post._id)} className="text-hot-pink">
                ❤️ {post.likes?.length || 0}
              </button>
              {post.authorEmail === session?.user?.email && (
                <button onClick={() => handleDelete(post._id)} className="text-red-500">
                  🗑️ Delete
                </button>
              )}
            </div>

            <div className="mt-4">
              <p className="text-md font-medium text-deep-plum">Comments:</p>
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((c, i) => (
                  <div key={i} className="pl-2 mt-1 text-sm text-deep-plum/80">
                    <strong>{c.user}:</strong> {c.comment}
                  </div>
                ))
              ) : (
                <p className="text-sm text-deep-plum/40 italic">No comments yet.</p>
              )}

              {session && (
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    className="w-full border border-peach-pink p-1 text-sm rounded-md"
                    value={commentText[post._id] || ""}
                    onChange={(e) =>
                      setCommentText((prev) => ({ ...prev, [post._id]: e.target.value }))
                    }
                  />
                  <button
                    className="bg-hot-pink text-white text-md px-5 rounded"
                    onClick={() => handleComment(post._id)}
                  >
                    Post
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {session && (
        <div className="mt-10">
          <h2 className="text-2xl mb-4 text-peach-pink font-bold">My Posts</h2>
          {posts.length === 0} <p className="text-deep-plum italic">You haven't created any posts yet...</p>
          {posts.filter((p) => p.authorEmail === session.user.email)
            .map((post) => (
              <div key={post._id} className="border rounded-lg mb-6 p-4 bg-hot-pink/10">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-sm text-deep-plum/70">{post.content}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
