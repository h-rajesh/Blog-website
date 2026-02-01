"use client";

import DashboardLayout from "@/layouts/DashboardLayout";
import PostBlogPanel from "@/components/PostBlogPanel"; // import the panel
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

export default function Home({ userId }: { userId: number }) {
  const [activeTab, setActiveTab] = useState<"explore" | "your" | "favorite">(
    "explore",
  );
  const [exploreBlogs, setExploreBlogs] = useState<Blog[]>([]);
  const [myBlogs, setMyBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0); // triggers reload
  const [panelOpen, setPanelOpen] = useState(false);
  const [editBlog, setEditBlog] = useState<Blog | undefined>(undefined); // blog to edit

  // Fetch Explore Blogs
  const loadExplore = async () => {
    try {
      const res = await fetch("/api/blogs", { cache: "no-store" });
      const data = await res.json();
      setExploreBlogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch My Blogs
  const loadMyBlogs = async () => {
    try {
      const res = await fetch("/api/my-blogs", { cache: "no-store" });
      const data = await res.json();
      setMyBlogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Load both
  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      await Promise.all([loadExplore(), loadMyBlogs()]);
      setLoading(false);
    };
    loadAll();
  }, [refreshKey]);

  // Decide which blogs to show
  const filteredBlogs =
    activeTab === "your"
      ? myBlogs
      : activeTab === "favorite"
        ? exploreBlogs.filter((b) => b.isFavorite)
        : exploreBlogs;

  return (
    <>
      <DashboardLayout userId={userId}>
        {(activeTabFromLayout: "explore" | "your" | "favorite") => {
          // Use activeTab from layout if available
          const tab = activeTabFromLayout || activeTab;

          return (
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-purple-200">
                  {tab === "explore"
                    ? "Explore Blogs"
                    : tab === "your"
                      ? "Your Blogs"
                      : "Favorite Blogs"}
                </h1>

                {/* Create New Blog */}
                {tab !== "favorite" && (
                  <button
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                    onClick={() => {
                      setEditBlog(undefined);
                      setPanelOpen(true);
                    }}
                  >
                    + New Blog
                  </button>
                )}
              </div>

              {/* Loading / Empty */}
              {loading && <p className="text-purple-300">Loading...</p>}
              {!loading && filteredBlogs.length === 0 && (
                <p className="text-purple-300">No blogs to display.</p>
              )}

              {/* Blog List */}
              <div className="flex flex-col gap-6">
                {filteredBlogs.map((blog) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-[0_0_20px_rgba(185,131,255,0.15)]"
                  >
                    {/* Author */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-purple-500/40 rounded-full flex items-center justify-center text-white font-bold">
                        {blog.author.name[0]}
                      </div>
                      <span className="font-semibold text-purple-200">
                        {blog.author.name}
                      </span>
                    </div>

                    {/* Blog */}
                    <h3 className="text-purple-100 font-semibold mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-purple-200 mb-4">{blog.description}</p>

                    {/* Actions */}
                    <div className="flex gap-6 text-purple-300 text-sm">
                      <button className="hover:text-white transition">
                        Like
                      </button>
                      <button className="hover:text-white transition">
                        Comment
                      </button>
                      <button className="hover:text-white transition">
                        Favorite
                      </button>

                      {/* Edit button for your blogs */}
                      {tab === "your" && (
                        <button
                          className="hover:text-white transition"
                          onClick={() => {
                            setEditBlog(blog);
                            setPanelOpen(true);
                          }}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        }}
      </DashboardLayout>

      {/* PostBlogPanel */}
      <PostBlogPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        blog={editBlog}
        onSuccess={() => setRefreshKey((prev) => prev + 1)} // Refresh dashboard after create/edit/delete
      />
    </>
  );
}
