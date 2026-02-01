import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { createBlog, getPublishedBlogs } from "@/services/blogService";

export async function GET() {
  const blogs = await getPublishedBlogs();
  return NextResponse.json(blogs);
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    
    if (!session?.user?.id) {
      console.log('Session check failed:', {
        hasSession: !!session,
        hasUser: !!session?.user,
        hasId: !!session?.user?.id,
      });
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

  const { title, description, published } = await req.json();

  if (!title) {
    return NextResponse.json({ msg: "Missing title" }, { status: 400 });
  }

  const blog = await createBlog({
    title,
    description,
    published: Boolean(published),
    authorID: Number(session.user.id),
  });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/blogs:', error);
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}
