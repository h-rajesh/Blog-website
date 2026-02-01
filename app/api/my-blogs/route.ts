import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getBlogsByAuthor } from "@/services/blogService";

export async function GET() {
  try {
    // Get the current session/user
    const session = await getSession();
    
    // Check if user is authenticated
    if (!session?.user?.id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    // Get only blogs created by the current logged-in user
    const userId = Number(session.user.id);
    const blogs = await getBlogsByAuthor(userId);
    
    // Return only the current user's blogs
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    return NextResponse.json(
      { msg: "Internal server error" },
      { status: 500 }
    );
  }
}
