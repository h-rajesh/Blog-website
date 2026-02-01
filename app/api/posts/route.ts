import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { createPost, getAllPosts } from "@/services/postService";

export async function GET() {
  const posts = await getAllPosts();
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session?.user?.id)
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });

  const { blogID, content, image } = await req.json();

  if (!blogID || !content) {
    return NextResponse.json({ msg: "Missing fields" }, { status: 400 });
  }

  const post = await createPost({
    blogID,
    content,
    image,
    authorID: Number(session.user.id),
  });

  return NextResponse.json(post, { status: 201 });
}
