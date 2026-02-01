"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import PostBlogPanel from "@/components/PostBlogPanel";

interface DashboardLayoutProps {
  userId: number;
  children: (activeTab: "explore" | "your" | "favorite") => React.ReactNode;
}

export default function DashboardLayout({
  userId,
  children,
}: DashboardLayoutProps) {
  const [activeTab, setActiveTab] = useState<"explore" | "your" | "favorite">(
    "explore",
  );
  const [showPostPanel, setShowPostPanel] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0a0414] text-white relative overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onPostClick={() => setShowPostPanel(true)}
      />

      <main className="flex-1 ml-0 md:ml-64 p-6 transition-all">
        {children(activeTab)}
      </main>

      <PostBlogPanel
        open={showPostPanel}
        onClose={() => setShowPostPanel(false)}
        authorID={userId}
        onSuccess={() => {}}
      />
    </div>
  );
}
