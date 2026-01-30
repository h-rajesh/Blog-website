"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    const session = await getSession();
    if (!session?.user) {
      setError("Something went wrong");
      setLoading(false);
      return;
    }

    router.push("/home");
    setLoading(false);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#0a0414] overflow-hidden">
      {/* LEFT PANEL */}
      <div className="relative hidden md:flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#b983ff] via-[#8f5cff] to-[#5b2cff] animate-pulse opacity-90" />

        {/* floating blobs */}
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 8 }}
          className="absolute w-72 h-72 bg-purple-300/30 rounded-full blur-3xl top-20 left-20"
        />
        <motion.div
          animate={{ y: [0, 40, 0] }}
          transition={{ repeat: Infinity, duration: 10 }}
          className="absolute w-96 h-96 bg-fuchsia-300/30 rounded-full blur-3xl bottom-20 right-10"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-10 text-white"
        >
          <h1 className="text-5xl font-extrabold tracking-wide mb-4">
            Welcome Back ✨
          </h1>
          <p className="text-lg text-purple-100 max-w-md mx-auto">
            Sign in to continue managing your system with elegance and control.
          </p>
        </motion.div>
      </div>

      {/* RIGHT SIGNIN CARD */}
      <div className="flex items-center justify-center p-6">
        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-10 shadow-[0_0_40px_rgba(185,131,255,0.35)]"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-fuchsia-500 rounded-full mb-4 shadow-lg">
              <Sparkles className="text-white w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-purple-200 text-sm">Sign in to your account</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500/40 text-red-200 p-3 rounded-lg mb-4 text-center text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Inputs */}
          {[
            {
              label: "Email",
              icon: <Mail size={16} />,
              type: "email",
              value: email,
              onChange: setEmail,
            },
          ].map((field, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="mb-4"
            >
              <label className="text-purple-200 text-sm flex items-center gap-2 mb-1">
                {field.icon}
                {field.label}
              </label>
              <input
                type={field.type}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                className="w-full bg-white/5 border border-white/20 text-white p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition"
                required
              />
            </motion.div>
          ))}

          {/* Password */}
          <div className="mb-6">
            <label className="text-purple-200 text-sm flex items-center gap-2 mb-1">
              <Lock size={16} />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/20 text-white p-3 pr-12 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-purple-500/40 transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
