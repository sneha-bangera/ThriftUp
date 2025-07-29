// 'use client'
// import { useState } from "react";
// import Link from "next/link";
// // import { Navbar } from "@/components/Navbar";
// // import { Footer } from "@/components/Footer";
// import { MessageSquare, Heart, Share2, Users, TrendingUp, Search } from "lucide-react";

// const discussionPosts = [
//   {
//     id: 1,
//     author: "Sophie",
//     avatar: "https://placehold.co/150",
//     authorInitials: "SK",
//     title: "Sustainable Fashion Trends 2025",
//     content: "I've been seeing a lot of upcycled denim in thrift stores lately...",
//     tags: ["Trends", "Sustainable"],
//     likes: 42,
//     comments: 18,
//     time: "2 hours ago"
//   },
//   {
//     id: 2,
//     author: "Maya",
//     avatar: "https://placehold.co/150",
//     authorInitials: "MJ",
//     title: "My Thrift Store Haul This Weekend",
//     content: "Just scored an amazing vintage leather jacket for only $25!...",
//     tags: ["Haul", "Vintage"],
//     likes: 38,
//     comments: 24,
//     time: "5 hours ago"
//   }
// ];

// const trendingTopics = [
//   { name: "Vintage Denim", posts: 234 },
//   { name: "Y2K Fashion", posts: 189 },
//   { name: "Sustainable Styling", posts: 156 }
// ];

// export default function Community() {
//   const [activeTab, setActiveTab] = useState("discussions");

//   return (
//     <div className="min-h-screen bg-off-white">

//       <div className="pt-20 pb-16 bg-gradient-to-b from-butter-yellow/20 to-peach-pink/30">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
//           <h1 className="text-3xl md:text-4xl font-bold text-deep-plum">ThriftUp Community</h1>
//           <p className="mt-4 text-lg text-deep-plum/80">Join conversations about sustainable fashion</p>
//           {/* <div className="relative flex items-center max-w-3xl mx-auto mt-8">
//             <Search className="absolute left-3 text-deep-plum/60" size={20} />
//             <input className="pl-10 py-3 w-full border border-peach-pink rounded bg-off-white text-deep-plum placeholder:text-deep-plum/60 focus:outline-none focus:ring-2 focus:ring-hot-pink" placeholder="Search discussions..." />
//             <button className="ml-2 bg-hot-pink text-white px-4 py-2 rounded">Search</button>
//           </div> */}
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
//         <div className="flex flex-col lg:flex-row gap-8">
//           <div className="lg:w-3/4">
//             <div className="flex space-x-4 mb-6 border-b border-peach-pink">
//               {['discussions', 'trending', 'myPosts'].map(tab => (
//                 <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-t-md font-medium ${activeTab === tab ? 'bg-hot-pink text-white' : 'bg-peach-pink/20 text-deep-plum'}`}>
//                   {tab === 'discussions' && <span className="flex items-center gap-1"><MessageSquare size={16}/> Discussions</span>}
//                   {tab === 'trending' && <span className="flex items-center gap-1"><TrendingUp size={16}/> Trending</span>}
//                   {tab === 'myPosts' && <span className="flex items-center gap-1"><Users size={16}/> My Posts</span>}
//                 </button>
//               ))}
//             </div>

//             {activeTab === "discussions" && (
//               <div>
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-xl font-semibold text-deep-plum">Recent Discussions</h2>
//                   <Link href='community/createPost'>
//                   <button className="bg-hot-pink hover:opacity-90 text-white px-4 py-2 rounded">Start New Discussion</button>
//                   </Link>
//                 </div>
//                 {discussionPosts.map(post => (
//                   <div key={post.id} className="bg-white border border-peach-pink rounded-lg shadow-sm p-4 mb-6">
//                     <div className="flex justify-between items-start mb-3">
//                       <div className="flex items-center gap-3">
//                         <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
//                         <div>
//                           <div className="font-medium text-deep-plum">{post.author}</div>
//                           <div className="text-sm text-deep-plum/60">{post.time}</div>
//                         </div>
//                       </div>
//                       <div className="flex gap-2">
//                         {post.tags.map((tag, index) => (
//                           <span key={index} className="inline-block px-3 py-1 text-xs rounded-full bg-peach-pink text-deep-plum">{tag}</span>
//                         ))}
//                       </div>
//                     </div>
//                     <h3 className="text-lg md:text-xl mt-2 text-deep-plum font-semibold">{post.title}</h3>
//                     <p className="text-base text-deep-plum/80 mt-2">{post.content}</p>
//                     <div className="mt-4 flex justify-between border-t pt-3">
//                       <div className="flex gap-6">
//                         <button className="flex items-center gap-2 text-deep-plum hover:text-hot-pink">
//                           <Heart size={16} /> <span>{post.likes}</span>
//                         </button>
//                         <button className="flex items-center gap-2 text-deep-plum hover:text-hot-pink">
//                           <MessageSquare size={16} /> <span>{post.comments}</span>
//                         </button>
//                       </div>
//                       <button className="flex items-center gap-2 text-deep-plum hover:text-hot-pink">
//                         <Share2 size={16} /> <span>Share</span>
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {activeTab === "trending" && (
//               <div>
//                 <h2 className="text-xl font-semibold mb-6 text-deep-plum">Trending Topics</h2>
//                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                   {trendingTopics.map((topic, index) => (
//                     <div key={index} className="bg-white border border-peach-pink rounded-lg p-4 hover:bg-peach-pink/30 cursor-pointer">
//                       <h3 className="flex items-center gap-2 text-deep-plum font-semibold">
//                         <TrendingUp className="h-5 w-5 text-hot-pink" /> {topic.name}
//                       </h3>
//                       <p className="text-deep-plum/70">{topic.posts} posts this week</p>
//                       <button className="mt-3 w-full border border-hot-pink text-hot-pink px-4 py-2 rounded hover:bg-peach-pink">View Discussions</button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {activeTab === "myPosts" && (
//               <div className="text-center py-10">
//                 <Users className="h-12 w-12 mx-auto text-deep-plum/40" />
//                 <h3 className="mt-4 text-xl font-medium text-deep-plum">No Posts Yet</h3>
//                 <p className="mt-2 text-deep-plum/70">Start participating in discussions to see your posts here</p>
//                 <Link href='community/createPost'>
//                 <button className="btn-primary mt-5">Start a Discussion</button>
//                 </Link>
//               </div>
//             )}
//           </div>

//           <div className="lg:w-1/4">
//             <div className="bg-white border border-peach-pink rounded-lg p-4">
//               <h3 className="text-lg font-semibold text-deep-plum mb-2">Join the Community</h3>
//               <p className="text-sm text-deep-plum/70 mb-4">Connect with over 5,000 women passionate about sustainable fashion</p>
//               <div className="flex gap-2 mb-4">
//                 <span className="bg-peach-pink text-deep-plum px-3 py-1 rounded-full text-xs flex items-center">
//                   <Users className="h-3 w-3 mr-1" /> 5.2k members
//                 </span>
//                 <span className="bg-peach-pink text-deep-plum px-3 py-1 rounded-full text-xs flex items-center">
//                   <MessageSquare className="h-3 w-3 mr-1" /> Active
//                 </span>
//               </div>
//               <button className="w-full bg-hot-pink hover:opacity-90 text-white px-4 py-2 rounded">Invite Friends</button>
//             </div>

//             <div className="mt-6">
//               <h3 className="font-semibold mb-4 text-deep-plum">Popular Hashtags</h3>
//               <div className="flex flex-wrap gap-2">
//                 {["#SustainableFashion", "#ThriftFinds", "#VintageLook", "#UpcycledFashion"].map((tag, idx) => (
//                   <span key={idx} className="border border-hot-pink text-deep-plum px-3 py-1 rounded-full text-xs cursor-pointer hover:bg-peach-pink">{tag}</span>
//                 ))}
//               </div>
//             </div>

//             <div className="mt-6">
//               <h3 className="font-semibold mb-4 text-deep-plum">Community Guidelines</h3>
//               <ul className="text-sm text-deep-plum/70 space-y-2">
//                 <li>Be respectful and kind to all members</li>
//                 <li>Share authentic and helpful content</li>
//                 <li>Give credit when sharing others' work</li>
//                 <li>Report inappropriate content</li>
//                 <li>Have fun and be supportive!</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }

"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

// ===== Badge Component =====
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
      // Refresh posts
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
      <Link href="/community/createPost" className="text-hot-pink font-semibold underline">+ Start a Discussion</Link>

      <div className="mt-10">
        <h2 className="text-2xl mb-4 text-peach-pink font-bold">All Discussions</h2>
        {posts.map((post) => (
          <div key={post._id} className="border rounded-lg mb-6 p-4 bg-off-white">
            <div className="flex flex-wrap gap-2 my-2">
    {Array.isArray(post?.tags) && post.tags.map((tag, index) => (
      <Badge key={index} className="bg-peach-pink text-deep-plum">
        #{tag.trim()}
      </Badge>
    ))}
  </div>
              <h3 className="text-xl font-semibold text-deep-plum">{post.title}</h3>

            <p className="text-sm text-deep-plum/70">{post.content}</p>
            <p className="text-xs text-peach-pink mt-2">by {post.authorEmail}</p>
            
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

            {/* Comments Section */}
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

              {/* Add Comment */}
              {session && (
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    className="w-full border p-1 text-sm rounded-md"
                    value={commentText[post._id] || ""}
                    onChange={(e) =>
                      setCommentText((prev) => ({ ...prev, [post._id]: e.target.value }))
                    }
                  />
                  <button
                    className="text-xs bg-hot-pink text-white px-2 rounded"
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
          <h2 className="text-2xl mb-4 text-deep-plum">My Posts</h2>
          {posts
            .filter((p) => p.authorEmail === session.user.email)
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
