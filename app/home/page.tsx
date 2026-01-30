"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, User, Star, Plus, Heart, MessageCircle } from "lucide-react";

interface Post {
  id: number;
  author: string;
  content: string;
  likes: number;
  comments: number;
  isFavorite: boolean;
}

const dummyPosts: Post[] = [
  {
    id: 1,
    author: "Alice",
    content: "AI is transforming the way we work and live in 2026...",
    likes: 12,
    comments: 4,
    isFavorite: true,
  },
  {
    id: 2,
    author: "Rajesh",
    content: "Just finished building a Web3 dApp! It's amazing...",
    likes: 24,
    comments: 8,
    isFavorite: false,
  },
  {
    id: 3,
    author: "Bob",
    content: "Next.js tips & tricks for building fast and SEO-friendly apps.",
    likes: 15,
    comments: 3,
    isFavorite: true,
  },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [posts, setPosts] = useState<Post[]>(dummyPosts);

  const toggleFavorite = (postId: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, isFavorite: !p.isFavorite } : p,
      ),
    );
  };

  const likePost = (postId: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p)),
    );
  };

  return (
    <div className="flex min-h-screen bg-[#0a0414] text-white relative overflow-hidden">
      {/* Sidebar */}
      <motion.div
        animate={{ x: sidebarOpen ? 0 : -250 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-full w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-[0_0_40px_rgba(185,131,255,0.2)] z-20"
      >
        <div className="flex flex-col h-full p-6">
          <h2 className="text-2xl font-bold text-purple-300 mb-8">
            Lavender Blog
          </h2>
          <nav className="flex flex-col gap-4">
            <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition">
              <BookOpen /> Explore Blogs
            </button>
            <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition">
              <User /> Your Blogs
            </button>
            <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition">
              <Star /> Favorite Blogs
            </button>
            <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition">
              <Plus /> Post a Blog
            </button>
          </nav>
        </div>
      </motion.div>

      {/* Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-6 left-6 md:left-72 z-30 bg-purple-500/20 hover:bg-purple-500/40 px-3 py-2 rounded-lg transition"
      >
        {sidebarOpen ? "<" : ">"}
      </button>

      {/* Main Content */}
      <main className={`flex-1 ml-0 md:ml-64 p-6 transition-all`}>
        <h1 className="text-3xl font-bold text-purple-200 mb-6">Feed</h1>

        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-[0_0_30px_rgba(185,131,255,0.2)]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/40 rounded-full flex items-center justify-center text-white font-bold">
                    {post.author[0]}
                  </div>
                  <span className="font-semibold text-purple-200">
                    {post.author}
                  </span>
                </div>
                <button
                  onClick={() => toggleFavorite(post.id)}
                  className={`transition text-pink-400 ${post.isFavorite ? "text-pink-500" : ""}`}
                >
                  <Heart />
                </button>
              </div>
              <p className="text-purple-100 mb-4">{post.content}</p>
              <div className="flex items-center gap-6 text-purple-300">
                <button
                  onClick={() => likePost(post.id)}
                  className="flex items-center gap-1 hover:text-pink-400 transition"
                >
                  <Heart size={18} /> {post.likes}
                </button>
                <button className="flex items-center gap-1 hover:text-purple-100 transition">
                  <MessageCircle size={18} /> {post.comments}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
