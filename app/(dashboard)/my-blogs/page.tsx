"use client";

import { useEffect, useState } from "react";

type Blog = {
  id: number;
  title: string;
  description: string;
  published: boolean;
};

export default function MyBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

 

    useEffect(() => {
       const load = async () => {
         const res = await fetch("/api/my-blogs");
         const data = await res.json();
         setBlogs(data);
         setLoading(false);
       };
    load();
  }, []);

  if (loading) return <p className="text-purple-300">Loading...</p>;

  return (
    <div className="space-y-4">
      {blogs.map((b) => (
        <div
          key={b.id}
          className="p-4 rounded-xl bg-white/10 border border-purple-600"
        >
          <h3 className="text-lg font-semibold text-purple-200">{b.title}</h3>
          <p className="text-purple-300">{b.description}</p>
          <span className="text-xs text-purple-400">
            {b.published ? "Published" : "Draft"}
          </span>
        </div>
      ))}
    </div>
  );
}
