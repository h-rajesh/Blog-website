"use client";

import DashboardLayout from "@/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Blog = {
  id: number;
  title: string;
  description: string;
  published: boolean;
  author: { id: number; name: string };
  isFavorite?: boolean;
};

export default function YourBlogs({ userId }: { userId: number }) {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        setBlogs(data.filter((b: Blog) => b.author.id === userId));
      } catch (err) {
        console.error(err);
      }
    })();
  }, [userId]);

  return (
    <DashboardLayout userId={userId}>
      {() => (
        <>
          <h1 className="text-3xl font-bold text-purple-200 mb-6">
            Your Blogs
          </h1>

          <div className="flex flex-col gap-6">
            {blogs.length === 0 && (
              <p className="text-purple-300">
                You have not posted any blogs yet.
              </p>
            )}

            {blogs.map((blog) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 10px 25px rgba(185,131,255,0.3)",
                }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-[0_0_20px_rgba(185,131,255,0.15)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-500/40 rounded-full flex items-center justify-center text-white font-bold">
                    {blog.author.name[0]}
                  </div>
                  <span className="font-semibold text-purple-200">
                    {blog.author.name}
                  </span>
                </div>

                <h3 className="text-purple-100 font-semibold mb-2">
                  {blog.title}
                </h3>
                <p className="text-purple-100 mb-4">{blog.description}</p>

                <div className="flex gap-4 text-purple-300">
                  <button className="hover:text-white transition">Like</button>
                  <button className="hover:text-white transition">
                    Comment
                  </button>
                  <button className="hover:text-white transition">
                    Favorite
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
