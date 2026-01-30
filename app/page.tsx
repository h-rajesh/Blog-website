"use client";

import { motion } from "framer-motion";
import { BookOpen, Heart, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0414] overflow-hidden relative text-white">
      {/* Animated Lavender Background */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
        className="absolute w-72 h-72 bg-purple-300/30 rounded-full blur-3xl top-20 left-10"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ repeat: Infinity, duration: 14 }}
        className="absolute w-96 h-96 bg-fuchsia-300/30 rounded-full blur-3xl bottom-10 right-10"
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="flex justify-between items-center p-6 bg-white/5 backdrop-blur-xl border-b border-white/20"
      >
        <h1 className="text-2xl font-bold text-purple-300">Lavender Blog</h1>
        <div className="flex items-center gap-4">
          <a
            href="/admin/signin"
            className="px-4 py-2 rounded-lg font-medium bg-purple-500/20 hover:bg-purple-500/40 transition"
          >
            Login
          </a>
          <a
            href="/admin/signup"
            className="px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 transition"
          >
            Sign Up
          </a>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center text-center py-28 px-6"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-400 to-fuchsia-500 rounded-full mb-6 shadow-lg">
          <Sparkles className="text-white w-8 h-8" />
        </div>
        <h2 className="text-5xl font-bold text-purple-200 mb-4">
          Welcome to Lavender Blog
        </h2>
        <p className="text-purple-100 max-w-2xl mb-6">
          Share your thoughts, read amazing blogs from others, and mark your
          favorites. Your blogging journey starts here.
        </p>
        <a
          href="/admin/signup"
          className="bg-gradient-to-r from-purple-500 to-fuchsia-500 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition shadow-lg"
        >
          Get Started
        </a>
      </motion.section>

      {/* Feature Highlights */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-16"
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-[0_0_30px_rgba(185,131,255,0.2)] text-center">
          <BookOpen className="mx-auto mb-4 text-purple-300" size={28} />
          <h3 className="text-xl font-bold text-purple-200 mb-2">Read Blogs</h3>
          <p className="text-purple-100 text-sm">
            Explore stories and insights shared by the community.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-[0_0_30px_rgba(185,131,255,0.2)] text-center">
          <Sparkles className="mx-auto mb-4 text-pink-300" size={28} />
          <h3 className="text-xl font-bold text-purple-200 mb-2">
            Share Your Ideas
          </h3>
          <p className="text-purple-100 text-sm">
            Write your own blogs and reach readers who value your thoughts.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-[0_0_30px_rgba(185,131,255,0.2)] text-center">
          <Heart className="mx-auto mb-4 text-pink-400" size={28} />
          <h3 className="text-xl font-bold text-purple-200 mb-2">Favorites</h3>
          <p className="text-purple-100 text-sm">
            Mark blogs you love and revisit them anytime.
          </p>
        </div>
      </motion.section>
    </div>
  );
}
