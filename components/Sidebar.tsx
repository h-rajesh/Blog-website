"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, User, Star, Plus } from "lucide-react";
interface SidebarProps {
  activeTab: "explore" | "your" | "favorite";
  setActiveTab: (tab: "explore" | "your" | "favorite") => void;
  onPostClick: () => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  onPostClick,
}: SidebarProps) {
  const [open, setOpen] = useState(true);


  return (
    <>
      <motion.div
        animate={{ x: open ? 0 : -250 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-full w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-[0_0_40px_rgba(185,131,255,0.2)] z-20"
      >
        <div className="flex flex-col h-full p-6">
          <h2 className="text-2xl font-bold text-purple-300 mb-8">
            Lavender Blog
          </h2>
          <nav className="flex flex-col gap-4">
            <button
              className={`flex items-center gap-3 p-3 rounded-lg transition ${
                activeTab === "explore" ? "bg-white/20" : "hover:bg-white/10"
              }`}
              onClick={() => setActiveTab("explore")}
            >
              <BookOpen /> Explore Blogs
            </button>
            <button
              className={`flex items-center gap-3 p-3 rounded-lg transition ${activeTab === "your" ? "bg-white/20" : "hover:bg-white/10"
                }`}
              onClick={() => setActiveTab("your")}
            >
              <User /> Your Blogs
            </button>
            <button
              className={`flex items-center gap-3 p-3 rounded-lg transition ${
                activeTab === "favorite" ? "bg-white/20" : "hover:bg-white/10"
              }`}
              onClick={() => setActiveTab("favorite")}
            >
              <Star /> Favorites
            </button>
            <button
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition"
              onClick={onPostClick}
            >
              <Plus /> Post a Blog
            </button>
          </nav>
        </div>
      </motion.div>

      {/* Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="absolute top-6 left-6 md:left-72 z-30 bg-purple-500/20 hover:bg-purple-500/40 px-3 py-2 rounded-lg transition"
      >
        {open ? "<" : ">"}
      </button>
    </>
  );
}
