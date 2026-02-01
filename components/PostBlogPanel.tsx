"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash } from "lucide-react";
import { useState } from "react";

type Blog = {
  id?: number;
  title: string;
  description: string;
  published: boolean;
};

export default function PostBlogPanel({
  open,
  onClose,
  blog,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  blog?: Blog;
  onSuccess?: () => void; // callback to refresh dashboard
}) {
  const isEdit = Boolean(blog?.id);
  const [title, setTitle] = useState(blog?.title ?? "");
  const [description, setDescription] = useState(blog?.description ?? "");
  const [published, setPublished] = useState(blog?.published ?? false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);
      const payload = { title, description, published };

      if (isEdit) {
        await fetch(`/api/blogs/${blog!.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
      } else {
        await fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload), // authorID is handled by backend
        });
      }

      setSuccess(true);
      onSuccess?.(); // trigger dashboard refresh

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1200);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async () => {
    if (!blog?.id) return;
    try {
      await fetch(`/api/blogs/${blog.id}`, { 
        method: "DELETE",
        credentials: "include",
      });
      onSuccess?.(); // refresh dashboard
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/40 z-30"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full md:w-[420px] bg-white/10 backdrop-blur-xl border-l border-white/20 shadow-[-10px_0_40px_rgba(185,131,255,0.25)] z-40 p-6 text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-purple-200">
                {isEdit ? "Edit Blog" : "Create Blog"}
              </h2>
              <div className="flex gap-3">
                {isEdit && (
                  <button
                    onClick={deleteBlog}
                    className="text-red-400 hover:text-red-500 transition"
                  >
                    <Trash />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="text-purple-300 hover:text-white transition"
                >
                  <X />
                </button>
              </div>
            </div>

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-400 text-green-200 rounded-lg text-center">
                Blog {isEdit ? "updated" : "created"} successfully!
              </div>
            )}

            {/* Form */}
            <input
              className="w-full mb-4 p-3 rounded-lg bg-[#1f1433] border border-purple-700 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              placeholder="Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              rows={4}
              className="w-full mb-4 p-3 rounded-lg bg-[#1f1433] border border-purple-700 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              placeholder="Blog Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label className="flex items-center gap-2 mb-6 text-purple-200">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="accent-purple-400"
              />
              Publish immediately
            </label>

            <button
              onClick={submit}
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {loading
                ? isEdit
                  ? "Updating..."
                  : "Posting..."
                : isEdit
                  ? "Update Blog"
                  : "Create Blog"}
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
