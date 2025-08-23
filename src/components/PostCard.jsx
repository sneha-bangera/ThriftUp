'use client';

import { useState, useEffect } from 'react';
import { Heart, Trash2, MessageSquare } from 'lucide-react';

export default function PostCard({ post, currentUserEmail, onDelete }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || []);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState('');

  const userLiked = likes.includes(currentUserEmail);

  useEffect(() => {
    setLiked(userLiked);
  }, [userLiked]);

  const handleLike = async () => {
    const res = await fetch(`/api/post/${post._id}/like`, {
      method: 'POST',
    });

    if (res.ok) {
      const updated = await res.json();
      setLikes(updated.likes);
      setLiked(!liked);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    const res = await fetch(`/api/post/${post._id}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: commentText }),
    });

    if (res.ok) {
      const updated = await res.json();
      setComments(updated.comments);
      setCommentText('');
    }
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this post?')) {
      onDelete(post._id);
    }
  };

  return (
    <div className="border rounded-xl p-5 shadow-md bg-white text-deep-plum">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-hot-pink">{post.title}</h3>
          
          <p className="mt-2 text-sm text-deep-plum">{post.content}</p>
          <p className="text-xs text-gray-500 mt-1">By {post.username}</p>
        </div>
        {post.userId === currentUserEmail && (
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-6 mt-4">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 ${
            liked ? 'text-hot-pink' : 'text-gray-500'
          }`}
        >
          <Heart size={20} fill={liked ? 'hotpink' : 'none'} />
          <span>{likes.length}</span>
        </button>

        <div className="flex items-center gap-1 text-gray-500">
          <MessageSquare size={20} />
          <span>{comments.length}</span>
        </div>
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="border rounded w-full px-3 py-2 mb-2 text-sm"
        />
        <button
          onClick={handleAddComment}
          className="bg-hot-pink text-white px-3 py-1 rounded hover:bg-deep-plum text-sm"
        >
          Post
        </button>
      </div>

      {comments.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Comments:</h4>
          <ul className="space-y-2 text-sm">
            {comments.map((c, i) => (
              <li key={i} className="border-b pb-2">
                <p className="text-deep-plum">{c.text}</p>
                <p className="text-xs text-gray-400">By {c.username}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
